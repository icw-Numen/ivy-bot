const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  if ((args.length === client.user.username.length && (args.join(' ') === client.user.username.length)) ||
(message.mentions.users.first())) {
    const joindate = message.guild.members.find('displayName', client.user.username).joinedAt;
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('My join date~')
      .setThumbnail(reactions.closed)
      .setDescription(`Thanks for asking! I have joined this server at **${joindate}**, ${message.author.username}`);
    return message.channel.send({embed});
  } else
  if (message.mentions.users.size < 1) {
    if (args.length === 0) {
      const joindate = message.guild.members.find('displayName', message.author.username).joinedAt;
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle(`${message.author.username}\' join date~`)
        .setThumbnail(reactions.normal)
        .setDescription(`You have joined this server at **${joindate}**, ${message.author.username}`);
      return message.channel.send({embed});
    }

    const nick = args.join(' ');

    const user = message.guild.members.find('displayName', `${nick}`);

    if (!user) {
      return message.channel.send(`Sorry, I couldn\'t find the user ${args[0]}, ${message.author.username}`).catch(console.error);
    }

    const joindate = message.guild.members.find('username', user.user.username).joinedAt;
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.user.username}\' join date~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.user.username} has joined this server at **${joindate}**, ${message.author.username}`);
    return message.channel.send({embed});

  } else if (message.mentions.users.size === 1) {
    const user = message.mentions.users.first();

    const joindate = message.guild.members.find('displayName', user.user.username).joinedAt;
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.user.username}\' join date~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.user.username} has joined this server at **${joindate}**, ${message.author.username}`);
    return message.channel.send({embed});
  }
  else {
    return message.channel.send(`Please give me only one user, ${message.author.username}. No more no less~`).catch(console.error);
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['joined'],
  permLevel: 0
};

exports.help = {
  name: 'joindate',
  description: 'Tells when the mentioned member has joined the server. Mentioning no one tells you when you have joined the server. This command also works with a username if you don\'t want to ping anyone',
  usage: 'joindate <mention/username>',
  type: 'server'
};
