const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');

exports.run = async (client, message) => {
  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  const user = message.author;

  if (main.servers[message.guild.id].vc === '') {
    return message.channel.send(`Please join a voice channel and add me with \`${settings.prefix}join\`, ${user.username}`).catch(console.error);
  }
  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first, ${user.username}`).catch(console.error);
  }

  const server = main.servers[message.guild.id];

  await server.vc.disconnect();
  server.vc = '';

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Stopping~')
    .setThumbnail(reactions.normal2)
    .setDescription(`I guess I\'ll leave this VC for now, ${message.author.username}`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stop', 'end'],
  permLevel: 0
};

exports.help = {
  name: 'leave',
  description: 'Leaves the voice channel. Also stops playing music',
  usage: 'leave',
  type: 'music'
};
