const settings = require('../settings.json');
const sql = require('sqlite');
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

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
    }
    if (!main.talkedRecently.has(message.author.id)) {
      const time = '1 minute';
      main.talkedRecently.add(message.author.id);
      setTimeout(() => {
        main.talkedRecently.delete(message.author.id);
      }, ms(time));
      sql.run(`UPDATE scores SET exp = ${row.exp + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
    });
  });

  sql.get(`SELECT * FROM channels WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '', '']);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '', '']);
    });
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
    cmd.run(client, message, args, perms);
  }

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
    }
    const expNextLv = row.level * 5 + 10;
    const curLv = row.level;

    if (row.exp >= expNextLv) {
      sql.run(`UPDATE scores SET exp = 0, level = ${row.level + 1} WHERE userId = ${message.author.id}`);
      message.channel.send(`**Level up!** ${message.author.username} is now **lv.${curLv + 1}**! Yay 🎉`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
    });
  });
};
