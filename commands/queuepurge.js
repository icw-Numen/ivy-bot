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

  const user = message.author;

  if (main.servers[message.guild.id].vc === '') {
    return message.channel.send(`Please join a voice channel and add me with \`${settings.prefix}join\`, ${user.username}`).catch(console.error);
  }
  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first, ${user.username}`).catch(console.error);
  }

  const server = main.servers[message.guild.id];

  if (server.queue.length === 0) {
    return message.channel.send(`Ah, looks like the queue is already empty, ${message.author.username}`).catch(console.error);
  }

  for (var i = server.queue.length - 1; i >= 0; i--) {
    server.queue.splice(i, 1);
    server.qUsers.splice(i, 1);
  }
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Purging queue~')
    .setThumbnail(reactions.wink)
    .setDescription(`The music queue\'s now empty again, ${message.author.username}`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['queueclear', 'clear', 'deletequeue', 'queuedelete'],
  permLevel: 0
};

exports.help = {
  name: 'queuepurge',
  description: 'Deletes all entries in the music queue',
  usage: 'queuepurge',
  type: 'music'
};
