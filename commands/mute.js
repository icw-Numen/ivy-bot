const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');

const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if (message.mentions.users.size < 1) return message.channel.send(`Please mention someone so I can mute them for you, ${message.author.username}.`).catch(console.error);
  const user = message.mentions.users.first();
  if (!parseUser(message, user)) return;

  const server = message.guild;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
      message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);
    } else {
      const modlog = server.channels.find('name', row.modlog);

      if (!modlog) return message.channel.send(`Please set a log channel with "${settings.prefix}modlog <channel>" first, ${message.author.username}`).catch(console.error);

      caseNumber(client, modlog).then(num => {
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES') || message.guild.member(client.user).permissions < user.permissions) {
          return message.channel.send(`Oops, it seems I don\'t have the correct permissions, ${message.author.username}`).catch(console.error);
        }

        let muterole = message.guild.roles.find('name', 'Muted');
        if (!muterole) muterole = message.guild.roles.find('name', 'muted');

        if (!muterole) {
          message.guild.createRole({name: 'Muted', color: [0, 0, 0], permissions: 0}).then(role => {
            message.channel.send('I couldn\'t find a muted role, creating muted role...').catch(console.error);
            muterole = role;
          });
        }

        const reason = args.splice(1, args.length).join(' ') || `No reasons given (use ${settings.prefix}reason <case number> <reason> to set a reason for this action)`;

        if (!user.bot) user.send(`You have been muted for: ${reason}`);

        let embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Mute/Unmute Successful~')
          .setThumbnail(reactions.smug2)
          .setDescription(`${user.username} has been muted. For more details, head over to #${modlog.name}`);
        message.channel.send({embed});

        embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTimestamp()
          .setDescription(`**Action:** Mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
          .setFooter(`Case ${num}`);

        if (message.guild.member(user).roles.has(muterole.id)) {
          message.guild.member(user).removeRole(muterole).then(() => {
            if (!user.bot) user.send(`You have been unmuted for: ${reason}`);
            client.channels.get(modlog.id).send({embed});
          });
        } else {
          message.guild.member(user).addRole(muterole).then(() => {
            if (!user.bot) user.send(`You have been muted for: ${reason}`);
            client.channels.get(modlog.id).send({embed});
          }).catch(console.error);
        }
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
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mutes or unmutes a mentioned user for a given reason. \nNote that you must set each channel to not allow muted members to text/speak because of how Discord roles work.',
  usage: 'mute <mention> <reason>',
  type: 'mod'
};
