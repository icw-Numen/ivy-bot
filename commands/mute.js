const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
const main = require('../app.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if (message.mentions.users.size < 1) return message.channel.send(`Please mention someone so I can mute them for you, ${message.author.username}.`).catch(console.error);
  const user = message.mentions.users.first();
  if (!parseUser(message, user)) return;

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      m00te(row, message, args, guild, client, user);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        m00te(r.ops[0], message, args, guild, client, user);
        return;
      });
    }
  });
};


// Helper method
function m00te(row, message, args, guild, client, user) {
  const modlog = guild.channels.find('name', row['modlog']);

  caseNumber(client, modlog).then(num => {
    if ((!message.guild.member(client.user).hasPermission('MANAGE_ROLES') && !message.guild.member(client.user).hasPermission('ADMINISTRATOR')) ||
    message.guild.member(client.user).permissions < user.permissions) {
      return message.channel.send(`Oops, it seems I don\'t have the correct permissions, ${message.author.username}`).catch(console.error);
    }

    let muterole = message.guild.roles.find('name', 'Muted');
    if (!muterole) muterole = message.guild.roles.find('name', 'muted');

    if (!muterole) {
      // 1024 means people with the Muted role will only have the permissions to read messages
      message.guild.createRole({name: 'Muted', color: [0, 0, 0], permissions: 1024}).then(role => {
        message.channel.send('I couldn\'t find a muted role, creating muted role...').catch(console.error);
        muterole = role;
      });
    }

    const reason = args.splice(1, args.length).join(' ') || 'No reason';
    let str;
    let str2;
    let str3;
    if (message.guild.member(user).roles.has(muterole.id)) {
      str2 = 'Unmute Successful~';
      str3 = `**Action:** Unmute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`;
      if (modlog) {
        str = `**${user.username}** has been unmuted, ${message.author.username}. For more details, head over to #${modlog.name}`;
      } else {
        str = `**${user.username}** has been unmuted, ${message.author.username}`;
      }

      message.guild.member(user).removeRole(muterole).then(() => {
        if (!user.bot) user.send(`You have been unmuted for: ${reason}`);
      });
    } else {
      str2 = 'Mute Successful~';
      str3 = `**Action:** Mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`;
      if (modlog) {
        str = `**${user.username}** has been muted, ${message.author.username}. For more details, head over to #${modlog.name}`;
      } else {
        str = `**${user.username}** has been muted, ${message.author.username}`;
      }

      message.guild.member(user).addRole(muterole).then(() => {
        if (!user.bot) user.send(`You have been muted for: ${reason}`);
      });
    }


    let embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(str2)
      .setThumbnail(reactions.smug2)
      .setDescription(str);
    message.channel.send({embed});

    if (modlog) {
      embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTimestamp()
        .setDescription(str3)
        .setFooter(`Case ${num}`);
      client.channels.get(modlog.id).send({embed});
    }
  });
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mutes or unmutes a mentioned user.\n\n**Note that you must set each channel to not allow muted members to text/speak because of how Discord roles work**',
  usage: 'mute <mention> <reason>',
  type: 'mod'
};
