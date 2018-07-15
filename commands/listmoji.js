const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message) => {
  const emojiList = message.guild.emojis.map(e => e.toString()).join(' ');
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Emoji List~')
    .setThumbnail(reactions.smug2)
    .setDescription(`${message.author.username}, this server's emojis are:\n\n${emojiList}\n\n**${message.guild.emojis.array().length}** emojis total`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['listemojis', 'listmojis', 'listemoji', 'emojilist', 'emojislist', 'emojis', 'le', 'el', 'emojis'],
  permLevel: 0
};

exports.help = {
  name: 'listmoji',
  description: 'Sends a list of the server\'s emojis',
  usage: 'listmoji',
  type: 'server'
};
