const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message) => {
  const rand = Math.floor(Math.random() * 2) + 1;
  const user = message.author.username;
  let str;

  if (rand == 1) {
    str = `${user}, I got heads!`;
  } else {
    str = `${user}, I got tails!`;
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Coin flip~')
    .setThumbnail(reactions.smug2)
    .setDescription(str);
  message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['flip'],
  permLevel: 0
};

exports.help = {
  name: 'coinflip',
  description: 'Flips a coin',
  usage: 'coinflip',
  type: 'fun'
};
