const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`Please mention someone so I can warn them for you, ${message.author.username}`).catch(console.error);
  if (!parseUser(message, user)) return;

  const server = message.guild;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
      message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);
    } else {
      const modlog = client.channels.find('name', `${row.modlog}`);

      if (!modlog) return message.channel.send(`Oops, I couldn\'t find a mod-log channel, ${message.author.username}`).catch(console.error);

      caseNumber(client, modlog).then(num => {
        const reason = args.splice(1, args.length).join(' ') || `No reasons given. Use ${settings.prefix}reason ${num} <reason>`;

        if (!user.bot) user.send(`You have been warned for: ${reason}`);

        let embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Warn Successful~')
          .setThumbnail(reactions.smug2)
          .setDescription(`${user.username} has been warned. For more details, head over to #${modlog.name}`);
        message.channel.send({embed});

        embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTimestamp()
          .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
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
  aliases: ['warning'],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user',
  usage: 'warn <mention> <reason>',
  type: 'mod'
};
