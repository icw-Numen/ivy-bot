const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  const choicesA = args.join(' ');
  const choicesB = choicesA.split(' | ');

  if (choicesB.length < 2) {
    return message.channel.send(`Please give me at least two choices, ${message.author.username}`).catch(console.error);
  }

  const thonk = client.emojis.get('459990749488873472');

  const rand = Math.floor(Math.random() * choicesB.length);

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Choosing wisely~')
    .setThumbnail(reactions.smug2)
    .setDescription(`${thonk}  |  I choose **${choicesB[rand]}**!`);
  message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['erabe'],
  permLevel: 0
};

exports.help = {
  name: 'choose',
  description: 'Chooses one out of two or more choices (up to n choices)',
  usage: 'choose <choice1> | <choice2> | <choice3> | ... | <choice n>',
  type: 'fun'
};
