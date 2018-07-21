const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
  if (args.length === 0 || ((!(/^<a:/.test(args[0]) || args[0].substring(args[0].length - 1) == '>')) &&
  (!(/^<:/.test(args[0]) || args[0].substring(args[0].length - 1) == '>')))) {
    return message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(console.error);
  }

  let extn;

  if (/^<a:/.test(args[0])) {
    extn = '.gif';
  } else {
    extn = '.png';
  }

  var regex = /\ud83d[\ude00-\ude4f]/g;
  let mojiid;

  if (args[0].match(regex)) {
    mojiid = args[0];
  } else {
    //pulls part with ID
    mojiid = args[0].split(':')[2].replace(/\D/g, '');
  }

  if (!mojiid) {
    return message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(console.error);
  }

  const embed = new RichEmbed()
      .setColor(0x36393E)
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
      .setImage(`https://discordapp.com/api/emojis/${mojiid}${extn}`);
  message.channel.send({embed}).catch(error => {return message.channel.send(`Please type a valid emoji, ${message.author.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bigemoji', 'bmoji', 'bmj'],
  permLevel: 0
};

exports.help = {
  name: 'bigmoji',
  description: 'Sends the given emoji at its original resolution',
  usage: 'bigmoji <emoji>',
  type: 'utilities'
};
