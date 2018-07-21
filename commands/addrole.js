const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;
  const role = message.guild.roles.find('name', `${args[0]}`);

  if (args.length != 1) return message.channel.send(`${message.author.username}, please specify only one role, no more no less!`).catch(console.error);
  if (!role) return message.channel.send(`Oops, I couldn\'t find the role ${args[0]}`).catch(console.error);

  const bot = message.guild.member(client.user);

  if (!bot.hasPermission('MANAGE_ROLES') || bot.permissions < user.permissions) {
    return message.channel.send(`It seems I don\'t have the correct permissions to add that role, ${message.author.username}`).catch(console.error);
  }

  if (message.member.highestRole.comparePositionTo(role) < 0) return message.channel.send(`Hm I can\'t add roles higher than your highest role, ${message.author.username}`).catch(console.error);

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
    }).catch(console.error);
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
