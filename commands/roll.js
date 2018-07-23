const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  const user = message.author.username;

  if ((args[0] && !parseInt(args[0])) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) {
    return message.channel.send(`Please give me a valid number of dice (1 ~ 100), ${user}`).catch(console.error);
  }

  if ((args[1] && !parseInt(args[1])) || parseInt(args[1]) <= 0 || parseInt(args[1]) > 200) {
    return message.channel.send(`Please give me a valid number of faces (1 ~ 200), ${user}`).catch(console.error);
  }

  let dice;
  let faces;

  if (!parseInt(args[0])) {
    faces = 6;
  } else {
    faces = parseInt(args[0]);
  }

  if (!parseInt(args[1])) {
    dice = 1;
  } else {
    dice = parseInt(args[1]);
  }

  const rolls = [];

  for (let i = 0; i < dice; i++) {
    rolls.push(Math.floor(Math.random() * faces) + 1);
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Dice roll~')
    .setThumbnail(reactions.normal2)
    .setDescription(`${user}, you have rolled: \n${rolls.join(', ')}`);
  message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dice', 'diceroll'],
  permLevel: 0
};

exports.help = {
  name: 'roll',
  description: 'Rolls one or more dice. You can specify the number of faces too',
  usage: 'roll <# of dice> <faces>',
  type: 'fun'
};
