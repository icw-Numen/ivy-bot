const {RichEmbed} = require('discord.js');
const settings = require('../settings.json');
const package = require('../package.json');
const reactions = require('../reactions.json');

module.exports = (guild) => {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setThumbnail(reactions.normal2)
    .setTitle('Hello everyone~')
    .setDescription(`~~Demon~~ Maid Ivy here, and thanks for ~~summoning~~ inviting me :9\n\nFor details of what I can do, please type \`${settings.prefix}info\` or type \`${settings.prefix}help\` for commands.\n\`${settings.prefix2}help\` and \`@Ivy help\` are fine too if you prefer calling me by my name~\n\nI\'ll do my best to serve all of you~`)
    .setFooter(`Bot and icons/art made with care by ${package.author}`);
  console.log(`Guild added: ${guild.name} (${guild.id}) has added me`);
  const channel = guild.channels.get(guild.channels.find('name', 'general').id);
  if (channel) {
    return channel.send({embed});
  }  
};
