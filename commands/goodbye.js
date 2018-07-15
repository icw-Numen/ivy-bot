const sql = require('sqlite');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const channel = message.guild.channels.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !channel)) return message.channel.send(`${message.author.username}, please enter a valid channel`).catch(console.error);

  sql.get(`SELECT * FROM channels WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '']).then(() => {
        message.channel.send(`Uwah! Something went wrong. Please try again, ${message.author.username}`).catch(console.error);
      });
    } else {
      if (args.length === 1) {
        sql.run(`UPDATE channels SET goodbye = '${args[0]}' WHERE guildId = ${message.guild.id}`);
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Goodbye channel set~')
          .setThumbnail(reactions.wink)
          .setDescription(`The default goodbye channel was successfully set to **\#${args[0]}**, ${message.author.username}`);
        message.channel.send({embed});
      } else
      if (args.length === 0) {
        sql.run(`UPDATE channels SET goodbye = '' WHERE guildId = ${message.guild.id}`);
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Goodbye channel set~')
          .setThumbnail(reactions.wink)
          .setDescription(`The default goodbye channel was successfully reset to none, ${message.author.username}`);
        message.channel.send({embed});
      }
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '']);
    });
  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setgoodbye'],
  permLevel: 2
};

exports.help = {
  name: 'goodbye',
  description: 'Sets the server\'s default channel for sending goodbyes to members who just left the guild',
  usage: 'goodbye <channel>',
  type: 'server'
};
