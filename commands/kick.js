const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1) message.channel.send(`Please mention someone so I can kick them for you, ${message.author.username}`).catch(console.error);
  if (!parseUser(message, user)) return;
  if (!user.kickable || message.guild.member(client.user).permissions < user.permissions) {
    return message.channel.send(`Oops, looks like I can\'t kick ${user.username}, ${message.author.username}`).catch(console.error);
  }

  const server = message.guild;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
      message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);
    } else {
      const modlog = server.channels.find('name', row.modlog);

      if (!modlog) return message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" before using this command, ${message.author.username}`).catch(console.error);

      caseNumber(client, modlog).then(num => {
        const reason = args.splice(1, args.length).join(' ') || `No reasons given (use ${settings.prefix}reason <case number> <reason> to set a reason for this action)`;

        if (!user.bot) user.send(`You have been kicked for: ${reason}`);

        let embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Kick Successful~')
          .setThumbnail(reactions.wink1)
          .setDescription(`${user.username} has been ~~consumed~~ dealt with smoothly. For more details, check #${modlog.name}`);
        message.channel.send({embed});

        message.guild.member(user).kick();

        embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTimestamp()
          .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
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
  aliases: ['boot'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user for a given reason',
  usage: 'kick <mention> <reason>',
  type: 'mod'
};
