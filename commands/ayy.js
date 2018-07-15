exports.run = (client, message) => {
  message.channel.send('lmao');
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ay', 'ayyy'],
  permLevel: 0
};

exports.help = {
  name: 'ayy',
  description: 'lmao',
  usage: 'ayy',
  type: 'meme'
};
