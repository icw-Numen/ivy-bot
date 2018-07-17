const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message) => {
  const roleList = message.guild.roles.map(e => e.name).join(', ');
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Role List~')
    .setThumbnail(reactions.wink)
    .setDescription(`${message.author.username}, this server's roles are:\n\n\`${roleList}\`\n\n**${message.guild.roles.array().length}** roles total`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['listrole', 'rolelist', 'roleslist', 'lr', 'rl', 'roles'],
  permLevel: 0
};

exports.help = {
  name: 'listroles',
  description: 'Sends a list of the server\'s roles',
  usage: 'listroles',
  type: 'server'
};
