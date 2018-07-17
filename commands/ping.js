exports.run = (client, message) => {
  message.channel.send('Ping?')
    .then(msg => {
      msg.edit(`Pong~ ${msg.createdTimestamp - message.createdTimestamp}ms`);
    });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ms'],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. Responds with ping',
  usage: 'ping',
  type: 'bot'
};
