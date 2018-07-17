exports.run = (client, message) => {
  message.channel.send('OwO what\'s this?');
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['OwO'],
  permLevel: 0
};

exports.help = {
  name: 'owo',
  description: 'OwO what\'s this?',
  usage: 'owo',
  type: 'meme'
};
