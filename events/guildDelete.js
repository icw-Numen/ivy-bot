const Discord = require('discord.js');
const package = require('../package.json');
const reactions = require('../reactions.json');

module.exports = (guild) => {
  const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(0xF18E8E)
    .setThumbnail(reactions.smug)
    .setDescription('Aww, looks like the fun ends here... But fret not, I\'ll gladly come back any time if you wish so~')
    .setFooter(`Bot and images made with care by ${package.author}`);

  return guild.channels.get(guild.channels.find('name', 'general').id).send({embed});
};
