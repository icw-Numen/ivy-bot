const {RichEmbed} = require('discord.js');
const package = require('../package.json');
const imgs = require('../imgs.json');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('My character info~')
    .setImage(imgs.splash)
    .setThumbnail(`${reactions.normal}`)
    .setDescription(`Thanks for asking, ${message.author.username}!\n\nAgain, I'm just a totally ordinary maid, but here's my profile:`)
    .addField('Height:', '185 cm', true)
    .addField('Weight:', '[censored]', true)
    .addField('Age:', '[unknown]', true)
    .addField('Race:', '[unknown]', true)
    .addField('Nationality:', '[unknown]', true)
    .addField('Occupation:', 'Maid', true)
    .addField('Likes:', 'Being praised, physical contact', true)
    .addField('Dislikes:', 'Being called a cow', true)
    .addField('Three sizes:', 'B: [Christian manga], W: [redacted],\nH: [censored]', true)
    .addField('Ivy icons/art:', 'https://sta.sh/21qy8xqbpkxm')
    .setFooter(`Bot and icons/art made with care by ${package.author}`);
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lore', 'characterinfo', 'bio', 'characterprofile', 'whoareyou', 'aboutivy'],
  permLevel: 0
};

exports.help = {
  name: 'profile',
  description: 'Sends an embed with information about the Ivy as a character',
  usage: 'profile',
  type: 'bot'
};
