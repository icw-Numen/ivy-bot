exports.run = (client, message) => {
  var rand = Math.floor(Math.random() * 100) + 1;
  var jackpot = 100;
  var mid = 10;
  var low = 5;

  if (rand == jackpot) {
    message.channel.send('┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴');
  } else
  if (rand <= mid) {
    message.channel.send('( ͡° ౪ ͡° )');
  } else
  if (rand <= low) {
    message.channel.send('(͠≖ ͜ʖ͠≖)👌');
  }
  else {
    message.channel.send('( ͡° ͜ʖ ͡°)');
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lennyface'],
  permLevel: 0
};

exports.help = {
  name: 'lenny',
  description: 'Sends a lenny face. Has slight chance of sending rare lenny faces too ( ͡° ͜ʖ ͡°)',
  usage: 'lenny',
  type: 'meme'
};
