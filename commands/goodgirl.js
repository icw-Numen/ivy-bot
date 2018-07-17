const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message) => {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Ehehe~ I know I know~')
    .setThumbnail(reactions.closedeyes2)
    .setDescription(`Please praise me more, ${message.author.username}~`);
  message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['goodbot', 'goodmaid', 'goodcow', 'patpat', 'pat', 'pet'],
  permLevel: 0
};

exports.help = {
  name: 'goodgirl',
  description: 'Lets you tell Ivy that she\'s being a good girl (does nothing special otherwise)',
  usage: 'goodgirl',
  type: 'bot'
};
