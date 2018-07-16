const settings = require('../settings.json');
const main = require('../app.js');
const ms = require('ms');

// message event handler
module.exports = message => {
  const ping = message.mentions.users.first();
  //ignores its own messages
  if (message.author.bot) return;

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

  main.scores.findOne({ userId : { $gte: message.author.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      expUp(row, message);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        expUp(row, message);
      });
    }
  });

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
    if (perms < cmd.conf.permLevel) return message.channed.send(`Ah, it seems you don\'t have the required permissions to use this command, ${message.author.username}`);
    cmd.run(client, message, args, perms).then(() => {checkLevel(message);});
  } else {
    checkLevel(message);
  }
};


// Helper method
function expUp(row, message) {
  if (!main.talkedRecently.has(message.author.id)) {
    const time = '1 minute';
    main.talkedRecently.add(message.author.id);
    setTimeout(() => {
      main.talkedRecently.delete(message.author.id);
    }, ms(time));
    main.scores.update({ userId: message.author.id }, { $set: { exp: (row['exp'] + 1) } }).catch(error => console.log(error));
  }
}

// Helper method
function checkLevel(message) {
  main.scores.findOne({ userId : { $gte: message.author.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      lvUp(row, message);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        lvUp(row, message);
      });
    }
  });
}

// Helper method
function lvUp(row, message) {
  const expNextLv = row['level'] * 5 + 10;
  const curLv = row['level'];

  if (row['exp'] >= expNextLv) {
    main.scores.update({ userId: message.author.id }, { $set: { exp: 0, level: (row['level'] + 1) } }).catch(error => console.log(error));
    message.channel.send(`**Level up!** ${message.author.username} is now **lv.${curLv + 1}**! Yay 🎉`);
  }
}
