const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  if (args.length === 0) {
    return message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(console.error);
  }

  let extn;

  if (/^<a:/.test(args[0])) {
    extn = '.gif';
  } else {
    extn = '.png';
  }

  // removes all non-digits from args
  const moji = args[0].replace(/\D/g, '');

  if (!moji) {
    return message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(console.error);
  }

  const embed = new RichEmbed()
      .setColor(0x36393E)
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
      .setImage(`https://discordapp.com/api/emojis/${moji}${extn}`);
  message.channel.send({embed}).catch(error => {message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bigemoji', 'bmoji', 'bmj'],
  permLevel: 0
};

exports.help = {
  name: 'bigmoji',
  description: 'Sends a bigger version of the given emoji',
  usage: 'bigmoji <emoji>',
  type: 'utilities'
};
