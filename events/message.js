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

  if (!main.talkedRecently.has(user.id)) {
    const time = '1 minute';
    main.talkedRecently.add(user.id);
    setTimeout(() => {
      main.talkedRecently.delete(user.id);
    }, ms(time));
    main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
      if (err) return console.log(err);
      var row = res;
      if (row) {
        main.scores.update({ userId: user.id }, { $set: { exp: (row['exp'] + 1) } }).catch(error => console.log(error));
      } else {
        main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null, lewd: '', cards: new Map()}, function (error, res) {
          if (error) return console.log(error);
          main.scores.update({ userId: user.id }, { $set: { exp: (res['exp'] + 1) } }).catch(error => console.log(error));
        });
      }
    });
  }

  // if a message does not start with the bot prefix, the bot will ignore it
  if (!message.content.startsWith(settings.prefix) &&
    !message.content.startsWith(settings.prefix2) &&
    !(message.content.startsWith('@'))) {
    if (ping) {
      if (!(ping.tag === `${settings.bottag}`)) {
        return;
      }
    } else {
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
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      lvUp(row, message, user);
    } else {
      main.scores.insertOne({userId: user.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: new Map()}, function (error) {
        if (error) return console.log(error);
        lvUp(row, message, user);
      });
    }
  });
}

// Helper method
function lvUp(row, message, user) {
  const expNextLv = row['level'] * 5 + 10;
  const curLv = row['level'];
  const bonus = row['level'] + 10;

  if (row['exp'] >= expNextLv) {
    main.scores.update({ userId: user.id }, { $set: { exp: 0, level: (row['level'] + 1), credits: (row['credits'] + (row['level'] + 10)) } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Level up!~')
      .setThumbnail(reactions.wink1)
      .setDescription(`${user.username} is now **lv. ${curLv + 1}**! 🎉\n\n**\$${bonus}** has been awarded as a bonus reward`)
      .addField('Level:', `lv. ${curLv + 1}`, true)
      .addField('Balance:', `\$${row['credits'] + row['level'] + 10}`, true);
    message.channel.send({embed});
  }
}
