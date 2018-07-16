const {RichEmbed} = require('discord.js');
const package = require('../package.json');

exports.run = async (client, message) => {
  const embed = new RichEmbed()
    .setColor(0xFF6666)
    .setTitle(`${package.author}'s Info`)
    .setThumbnail(`${client.users.find('tag', 'Numen#3815').avatarURL}`)
    .setDescription('That\'s right, there\'s only one person working on this bot ᕙ༼ຈل͜ຈ༽ᕗ\n\nBio: Just a generalist/hobbyist who happened to feel like making a bot for the sake of improving quality of life on Discord not only for himself, but also for all other users who happened to find this nice, totally not demonic maid\n\nHis dream is to continue pursuing what he feels right as a "one man army" and make this world a more exciting place\n\nFeel free to visit any of the links below; any form of support is deeply appreciated')
    .addField('Discord tag:', 'Numen#3815')
    .addField('Discord server:', 'https://discord.gg/HVh7QcV')
    .addField('Github:', 'https://github.com/icw-Numen')
    .addField('Twitter:', 'https://twitter.com/raw_sauce_numen')
    .addField('Pixiv:', 'https://www.pixiv.net/member.php?id=10878110')
    .addField('Ko-fi (tip jar):', 'http://Ko-fi.com/rawsaucenumen')
    //.addField(`${package.author}\'s personal website: `, '[link]')
    .setFooter(`Bot and icons/art made with care by ${package.author}`);

  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['authorinfo', 'lewdbringer', 'dev', 'devinfo', 'botauthor', 'botdev'],
  permLevel: 0
};

exports.help = {
  name: 'author',
  description: 'Sends an embed with information about the bot\'s author',
  usage: 'author',
  type: 'bot'
};
