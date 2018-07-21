const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  // const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;

  if (args.length === 0 || ((!(/^<a:/.test(args[0]) || args[0].substring(args[0].length - 1) == '>')) &&
  (!(/^<:/.test(args[0]) || args[0].substring(args[0].length - 1) == '>')))) {
    return message.channel.send(`Please type a valid custom emoji, ${message.author.username}`).catch(console.error);
  }

  let extn;

  if (/^<a:/.test(args[0])) {
    extn = '.gif';
  } else {
    extn = '.png';
  }

  // if (args[0].match(regex)) {
  //   mojiid = args[0];
  //   extn = '.svg';
  // } else {
  //   //pulls part with ID
  //   mojiid = args[0].split(':')[2].replace(/\D/g, '');
  // }

  const mojiid = args[0].split(':')[2].replace(/\D/g, '');

  if (!mojiid) {
    return message.channel.send(`Please type a valid custom emoji, ${message.author.username}`).catch(console.error);
  }

  const embed = new RichEmbed()
      .setColor(0x36393E)
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
      .setImage(`https://discordapp.com/api/emojis/${mojiid}${extn}`);
  message.channel.send({embed}).catch(error => {return message.channel.send(`Please type a valid custom emoji, ${message.author.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bigemoji', 'bmoji', 'bmj'],
  permLevel: 0
};

exports.help = {
  name: 'bigmoji',
  description: 'Sends the given custom emoji at its original resolution',
  usage: 'bigmoji <emoji>',
  type: 'utilities'
};
