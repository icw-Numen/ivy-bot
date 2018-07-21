const {RichEmbed} = require('discord.js');
const settings = require('../settings.json');

exports.run = (client, message, args) => {

  if (message.mentions.users.size < 1) {
    if (args.length === 0) {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle(`${message.author.username}\' Avatar~`)
        .setDescription('Looks good, if you ask me :9')
        .setImage(`${message.author.avatarURL}`)
        .setURL(`${message.author.avatarURL}`);
      return message.channel.send({embed});
    } else
    if (args.length === 1 && (args[0].match(/server/i))) {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle('Server Icon~')
        .setDescription('Looks good, if you ask me :9')
        .setImage(`${message.guild.iconURL}`)
        .setURL(`${message.guild.iconURL}`);
      return message.channel.send({embed});
    }

    const nick = args.join(' ');

    const user = message.guild.members.find('displayName', `${nick}`);

    if (!user) {
      return message.channel.send(`Sorry, I couldn\'t find the user ${args[0]}, ${message.author.username}`).catch(console.error);
    }

    let str;

    if (user.user.tag === settings.botttag) {
      str = 'Ufufu~ You like what you see? :9';
    } else {
      str = 'Looks good, if you ask me :9';
    }

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setImage(`${user.user.avatarURL}`)
      .setURL(`${user.user.avatarURL}`)
      .setDescription(str)
      .setTitle(`${user.user.username}\'s Avatar~`);
    message.channel.send({embed});

  } else if (message.mentions.users.size === 1) {
    const user = message.mentions.users.first();

    let str;

    if (user.tag === settings.bottag) {
      str = 'Ufufu~ You like what you see? :9';
    } else {
      str = 'Looks good, if you ask me :9';
    }

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setImage(`${user.avatarURL}`)
      .setURL(`${user.avatarURL}`)
      .setDescription(str)
      .setTitle(`${user.username}\'s Avatar~`);
    message.channel.send({embed});
  } else {
    return message.channel.send(`Please give me only one user, ${message.author.username}. No more no less~`).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['icon', 'avy'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Sends someone\'s avatar at its original resolution. You can specify the user by giving their user name or by pinging them. Not specifying any users gives a link to your own avatar. Typing "server" instead of specifying a user gives the server icon',
  usage: 'avatar <mention/user>',
  type: 'utilities'
};
