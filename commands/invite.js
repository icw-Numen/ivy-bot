const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  message.channel.createInvite()
    .then(invite => {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle('Server Invite~')
        .setThumbnail(reactions.normal)
        .setDescription(`Here\'s this server's invitation link, ${message.author.username}:\n\n${invite.url}`);
      message.channel.send({embed}).catch(error => {return message.channel.send(`Oops, it seems I\'m unable to create an invite at the moment, ${user.username}`).catch(error);});
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['serverinvite', 'serverlink', 'invitation', 'serverinvitation', 'createinvite'],
  permLevel: 0
};

exports.help = {
  name: 'invite',
  description: 'Sends a temporary server invite',
  usage: 'invite',
  type: 'server'
};
