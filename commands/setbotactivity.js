exports.run = (client, message, args) => {
  const str = args.join(' ');
  console.log(str);
  client.user.setActivity(str);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bact', 'setbotstatus'],
  permLevel: 4
};

exports.help = {
  name: 'setbotactivity',
  description: 'Changes the bot\'s activity/"Playing" status to the given input string',
  usage: 'setbotactivity <string>',
  type: 'dev'
};
