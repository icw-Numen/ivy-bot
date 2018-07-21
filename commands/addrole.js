const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;
  const role = message.guild.roles.find('name', `${args.join(' ')}`);

  if (!role) return message.channel.send(`Oops, I couldn\'t find the role ${args.join(' ')}`).catch(console.error);

  const bot = message.guild.member(client.user);

  if (!bot.hasPermission('MANAGE_ROLES') || !bot.hasPermission('ADMINISTRATOR')) {
    return message.channel.send(`It seems I don\'t have the correct permissions to add that role, ${message.author.username}\nTry giving me a higher role`).catch(console.error);
  }

  if (role.hasPermission('MANAGE_ROLES') || role.hasPermission('ADMINISTRATOR') || role.hasPermission('KICK_MEMBERS') || role.hasPermission('BAN_MEMBERS') ||
  role.hasPermission('MANAGE_CHANNELS') || role.hasPermission('MANAGE_GUILD') || role.hasPermission('MANAGE_MESSAGES') || role.hasPermission('MUTE_MEMBERS') ||
role.hasPermission('DEAFEN_MEMBERS') || role.hasPermission('MOVE_MEMBERS') || role.hasPermission('USE_VAD') || role.hasPermission('MANAGE_NICKNAMES') ||
role.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || role.hasPermission('MANAGE_WEBHOOKS') || role.hasPermission('MANAGE_EMOJIS')) {
    return message.channel.send(`Hm looks like I can\'t add this role, ${message.author.username}`).catch(console.error);
  }

  if (message.guild.member(user).roles.has(role.id)) {
    if (!user.bot) message.channel.send(`It seems you already have the role ${role.name}, ${message.author.username}`).catch(console.error);
  } else {
    message.guild.member(user).addRole(role).then(() => {
      if (!user.bot) {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Role added~')
          .setThumbnail(reactions.wink)
          .setDescription(`${message.author.username}, role **${role.name}** has been assigned to you sucessfully`);
        message.channel.send({embed});
      }
    }).catch(error => {
      return message.channel.send(`It seems I don\'t have the correct permissions to add that role, ${message.author.username}\nTry giving me a higher role`).catch(error);
    });
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['roleadd', 'setrole', 'roleset', 'iam', 'assign', 'assignrole'],
  permLevel: 0
};

exports.help = {
  name: 'addrole',
  description: 'Assigns a role to the user',
  usage: 'addrole <role>',
  type: 'server'
};
