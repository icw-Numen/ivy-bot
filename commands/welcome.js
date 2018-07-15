const sql = require('sqlite');
const reactions = require('../reactions.json');
const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
  const channel = message.guild.channels.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !channel)) return message.channel.send(`Please give me a valid channel, ${message.author.username}`).catch(console.error);

  sql.get(`SELECT * FROM channels WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '']).then(() => {
        message.channel.send(`Uwah! Something went wrong. Please try again, ${message.author.username}`).catch(console.error);
      });
    } else {
      if (args.length === 1) {
        sql.run(`UPDATE channels SET welcome = '${args[0]}' WHERE guildId = ${message.guild.id}`);
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Welcome channel set~')
          .setThumbnail(reactions.wink)
          .setDescription(`The default welcome channel was successfully set to **\#${args[0]}**, ${message.author.username}`);
        message.channel.send({embed});
      } else
      if (args.length === 0) {
        sql.run(`UPDATE channels SET welcome = '' WHERE guildId = ${message.guild.id}`);
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Welcome channel set~')
          .setThumbnail(reactions.wink)
          .setDescription(`The default welcome channel was successfully reset to none, ${message.author.username}`);
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
  aliases: ['setwelcome'],
  permLevel: 2
};

exports.help = {
  name: 'welcome',
  description: 'Sets the server\'s default channel for welcoming new members. Not giving any channels will set/reset it to none',
  usage: 'welcome <channel>',
  type: 'server'
};
