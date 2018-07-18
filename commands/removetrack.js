const main = require('../app.js');
const {getInfo} = require('ytdl-getinfo');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
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

  const qPosit = parseInt(args[0]) - 1;

  const server = main.servers[message.guild.id];

  if (!parseInt(args[0]) || qPosit > server.queue.length || qPosit > server.qUsers.length) {
    return message.channel.send(`Please give a valid queue position, ${message.author.username}`).catch(console.error);
  }

  const curSong = server.queue[qPosit];
  const curUser = server.qUsers[qPosit];

  if (!curSong || !curUser) {
    return message.channel.send(`Please give a valid queue position, ${message.author.username}`).catch(console.error);
  }

  server.queue.splice(qPosit, 1);
  server.qUsers.splice(qPosit, 1);

  getInfo(curSong).then(info => {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${info.items[0].title}`)
      .setThumbnail(reactions.wink)
      .setDescription(`has been successfully removed from position ${args[0]} of the queue, ${message.author.username}`)
      .setURL(curSong);
    message.channel.send({embed});
  }).catch(error => {return error;});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['removemusic', 'removesong'],
  permLevel: 0
};

exports.help = {
  name: 'removetrack',
  description: 'Removes the specified track from the queue. You can find the track\'s position in the queue by checking the queue',
  usage: 'removetrack <track queue number>',
  type: 'music'
};
