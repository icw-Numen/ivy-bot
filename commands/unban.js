const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const settings = require('../settings.json');
const sql = require('sqlite');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  const server = message.guild;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
      message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);
    } else {
      //separates reason from the message
      const reason = args.slice(1).join(' ');

      if (reason.length < 1) return message.channel.send(`Please give me a reason so I can unban them, ${message.author.username}`).catch(console.error);

      const user = args[0];

      const modlog = server.channels.find('name', row.modlog);

      if (!modlog) return message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);

      if (!user) return message.channel.send(`Please give me a user ID (not user name or tag) so I can unban them for you, ${message.author.username}`).catch(console.error);

      caseNumber(client, modlog).then(num => {
        const reason = args.splice(1, args.length).join(' ') || `No reasons given (use ${settings.prefix}reason <case number> <reason> to set a reason for this action)`;
        message.guild.unban(user);
        let embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Unban Successful~')
          .setThumbnail(reactions.smug2)
          .setDescription(`The user with the ID of **${user}** has been unbanned. For more details, head over to #${modlog.name}`);
        message.channel.send({embed});

        embed = new RichEmbed()
          .setColor(0xFFAD56)
          .setTimestamp()
          .setDescription(`**Action:** Unban\n**Target:** User ID: ${user}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setFooter(`Case ${num}`);
        return client.channels.get(modlog.id).send({embed});
      });
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    });
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unhammer'],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Revoke a ban on a user for a given reason based on their user ID (which can be found in the mod action\'s embed)',
  usage: 'unban <user ID> <reason>',
  type: 'mod'
};
