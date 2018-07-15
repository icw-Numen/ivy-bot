const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  if (args.length < 1) {
    return message.channel.send(`🎱  | Please give the mighty 8-ball a question, ${message.author.username}`).catch(console.error);
  }

  const answers = ['It is certain', 'As I see it, yes', 'It is decidedly so', 'Most likely',
    'Without a doubt', 'Outlook good', 'Yes - definitely', 'Yes', 'You may rely on it',
    'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now',
    'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no',
    'My sources say no', 'Outlook not so good', 'Very doubtful'
  ];

  const rand = Math.floor(Math.random() * answers.length);

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('The Almighty Magic 8-ball has spoken!~')
    .setThumbnail(reactions.smug2)
    .setDescription(`🎱  |  **${answers[rand]}, ${message.author.username}.**`);
  message.channel.send({embed});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['8-ball', '8b'],
  permLevel: 0
};

exports.help = {
  name: '8ball',
  description: 'The magic 8-ball answers any questions you might have about the future',
  usage: '8ball <question>',
  type: 'fun'
};
