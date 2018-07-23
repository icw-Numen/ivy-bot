const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  if (!args.join(' ').match(/rock/i) && !args.join(' ').match(/paper/i) && !args.join(' ').match(/scissors/i)) {
    return message.channel.send(`Please make a valid move, ${message.author.username}`).catch(console.error);
  }
  const rand = Math.floor(Math.random() * 3) + 1;
  var choice = (rand === 1) ? (choice = 'rock') : (rand === 2) ? (choice = 'paper') : (choice = 'scissors');

  let str;
  let reaction;

  if ((args[0] === 'rock' && choice === 'paper') ||
    (args[0] === 'paper' && choice === 'scissors') ||
    (args[0] === 'scissors' && choice === 'rock')) {
    str = `I got ${choice}! I win!`;
    reaction = reactions.smug2;
  } else if (args[0] === choice) {
    str = `I got ${choice}! It's a draw!`;
    reaction = reactions.smug1;
  } else {
    str = `I got ${choice}! It's your win, ${message.author.username}!`;
    reaction = reactions.pout2;
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Jan ken pon~')
    .setDescription(str)
    .setThumbnail(reaction);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['jankenpon'],
  permLevel: 0
};

exports.help = {
  name: 'rps',
  description: 'Plays Rock Paper Scissors against the bot. Choices are rock, paper, scissors',
  usage: 'rps <choice>',
  type: 'fun'
};
