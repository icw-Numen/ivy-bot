const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');

exports.run = (client, message) => {
  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel and add me with \`${settings.prefix}join\`, ${message.author.username}`).catch(console.error);
  }

  const server = main.servers[message.guild.id];

  if (!message.guild.voiceConnection) {
    server.vc = message.member.voiceChannel.join().then((connection) => {
      server.vc = connection;
    });
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Joining~')
      .setThumbnail(reactions.closedeyes)
      .setDescription(`Hello there, ${message.author.username}!`);
    message.channel.send({embed});
  } else {
    return message.channel.send(`I\'m already here, ${message.author.username}`).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['joinvc'],
  permLevel: 0
};

exports.help = {
  name: 'join',
  description: 'Joins the voice channel you are in',
  usage: 'join',
  type: 'music'
};
