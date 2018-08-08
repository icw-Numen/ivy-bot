const settings = require('../settings.json');
const main = require('../app.js');
const ms = require('ms');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

// message event handler
module.exports = message => {
  const user = message.author;
  const ping = message.mentions.users.first();

  //ignores its own messages
  if (user.bot) return;

  //the bot == client
  const client = message.client;

  //turn message into command and parameters
  let command;
  let args;

  //prefix checks
  if (ping) {
    if ((message.content.startsWith(`\<@${ping.id}\>`) || message.content.startsWith(`\<@!${ping.id}\>`)) && ping.tag === `${settings.bottag}`) {
      command = message.content.split(' ')[1];
      args = message.content.split(' ').slice(2);
    } else
    if (message.content.startsWith(settings.prefix2)) {
      command = message.content.split(' ')[1];
      args = message.content.split(' ').slice(2);
    } else
    if (message.content.startsWith(settings.prefix)) {
      command = message.content.split(' ')[0].slice(settings.prefix.length);
      args = message.content.split(' ').slice(1);
    }
  } else
  if (message.content.startsWith(settings.prefix2)) {
    command = message.content.split(' ')[1];
    args = message.content.split(' ').slice(2);
  } else
  if (message.content.startsWith(settings.prefix)) {
    command = message.content.split(' ')[0].slice(settings.prefix.length);
    args = message.content.split(' ').slice(1);
  }

  //futureproofing this just in case
  if (command !== 'onepoker') {
    // Ignore DM channels.
    if (message.channel.type === 'dm') return;
  }

  // if a message does not start with the bot prefix, the bot will ignore it
  if (!message.content.startsWith(settings.prefix) &&
    !message.content.startsWith(settings.prefix2) &&
    !(message.content.startsWith('@'))) {
    if (ping) {
      if (!(ping.tag === `${settings.bottag}`)) {
        checkLevel(message, user);
        return;
      }
    } else {
      checkLevel(message, user);
      return;
    }
  }

  const perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.channed.send(`Ah, it seems you don\'t have the required permissions to use this command, ${user.username}`);
    cmd.run(client, message, args, perms);
  }

  checkLevel(message, user);
};

// Helper method
function checkLevel(message, user) {
  if (!main.talkedRecently.has(user.id)) {
    const time = '1 minute';
    main.talkedRecently.add(user.id);
    setTimeout(() => {
      main.talkedRecently.delete(user.id);
    }, ms(time));
    main.scores.findOneAndUpdate({ userId : { $eq: user.id }}, {$inc: {exp: 1}}, {upsert: true}, function (err) {
      if (err) return console.log(err);
    });
  }

  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      lvUp(row, message, user);
    }
  });
}

// Helper method
function lvUp(row, message, user) {
  const guild = message.guild;
  const expNextLv = row['level'] * 5 + 10;
  const curLv = row['level'];
  const bonus = row['level'] + 10;

  if (row['exp'] >= expNextLv) {
    main.scores.update({ userId: message.author.id }, { $set: { exp: 0 }, $inc: {level: 1, credits: (curLv + 10)} }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Level up!~')
      .setThumbnail(reactions.wink1)
      .setDescription(`${user.username} is now **lv. ${curLv + 1}**! 🎉\n\n**\$${bonus}** has been awarded as a bonus reward`)
      .addField('Level:', `lv. ${curLv + 1}`, true)
      .addField('Balance:', `\$${row['credits'] + row['level'] + 10}`, true);

    main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
      if (err) return console.log(err);
      var row = res;
      if (row) {
        if (row['lvnotifs'] === 'on') message.channel.send({embed});
      } else {
        main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [], lvnotifs: '' }, function () {
        });
      }
    });
  }
}
