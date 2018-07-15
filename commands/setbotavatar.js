const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  if (args.length === 0) {
    const avatarLink = reactions.normal2;
    client.user.setAvatar(avatarLink).catch(console.error);
  } else {
    const avatarLink = args[0];
    client.user.setAvatar(avatarLink).catch(() => {return message.channel.send(`Error. Couldn\'t set avatar, ${message.author.username}`);});
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bav', 'setboticon'],
  permLevel: 4
};

exports.help = {
  name: 'setbotavatar',
  description: 'Changes the bot\'s avatar',
  usage: 'setbotavatar <avatar/link>',
  type: 'dev'
};
