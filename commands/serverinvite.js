const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  message.channel.createInvite()
    .then(invite => {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle('Server Invite~')
        .setThumbnail(reactions.normal)
        .setDescription(`Here\'s this server's invitation link, ${message.author.username}:\n${invite.url}`);
      message.channel.send({embed});
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
  usage: 'invite <channel>',
  type: 'server'
};
