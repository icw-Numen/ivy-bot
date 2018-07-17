const {RichEmbed} = require ('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  const role = message.guild.roles.find('name', `${args[0]}`);

  if (args.length != 1) return message.channel.send(`${message.author.username}, please specify only one role, no more no less!`).catch(console.error);
  if (!role) return message.channel.send(`Oops, I couldn\'t find the role **${args[0]}**, ${message.author.username}`).catch(console.error);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.channel.send(`Oops, it seems I don\'t have the correct permissions, ${message.author.username}`).catch(console.error);

  if (!message.guild.member(user).roles.has(role.id)) {
    if (!user.bot) message.channel.send(`Hmm it looks like you don\'t have the role **${args[0]}**, ${message.author.username}`).catch(console.error);
  } else {
    message.guild.member(user).removeRole(role).then(() => {
      if (!user.bot) {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Role removed~')
          .setThumbnail(reactions.wink)
          .setDescription(`Role **${role.name}** successfully removed, ${message.author.username}!`);
        message.channel.send({embed});
      }
    }).catch(console.error);
  }

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['roleremove'],
  permLevel: 0
};

exports.help = {
  name: 'removerole',
  description: 'Removes a role from the user',
  usage: 'removerole <role>',
  type: 'server'
};
