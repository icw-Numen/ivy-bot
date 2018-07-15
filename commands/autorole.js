const {RichEmbed} = require('discord.js');
const sql = require('sqlite');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const role = message.guild.roles.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !role)) return message.channel.send(`${message.author.username}, please enter a valid role`).catch(console.error);

  sql.get(`SELECT * FROM channels WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [message.guild.id, '', '', '', '']).then(() => {
        message.channel.send(`Uwah! Something went wrong. Please try again, ${message.author.username}`);
      });
    } else {
      if (args.length === 1) {
        sql.run(`UPDATE channels SET autorole = '${args[0]}' WHERE guildId = ${message.guild.id}`);
        message.channel.send(`The default role was successfully set to **${args[0]}**, ${message.author.username}`);
      } else
      if (args.length === 0) {
        sql.run(`UPDATE channels SET autorole = '' WHERE guildId = ${message.guild.id}`);

        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Autorole set~')
          .setThumbnail(reactions.wink)
          .setDescription(`The default role was successfully reset to none, ${message.author.username}`);
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
  aliases: ['defaultrole'],
  permLevel: 2
};

exports.help = {
  name: 'autorole',
  description: 'Sets the server\'s default role for new members. Passing nothing resets default role to none',
  usage: 'autorole <role>',
  type: 'server'
};
