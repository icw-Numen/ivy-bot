const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const {getInfo} = require('ytdl-getinfo');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first, ${message.author.username}`).catch(console.error);
  }

  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  const server = main.servers[message.guild.id];
  var curSong = server.queue[0];
  const curUser = server.qUsers[0];

  if (!server.dispatcher) {
    return message.channel.send(`Oops, looks like nothing\'s being played right now, ${message.author.username}`).catch(console.error);
  }

  getInfo(curSong).then(info => {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${info.items[0].title}`)
      .setThumbnail(reactions.normal)
      .setDescription(`is currently being played (track added by ${curUser}), ${message.author.username}`)
      .setURL(curSong);
    message.channel.send({embed});
  }).catch(error => {return message.channel.send(`Oops, looks like nothing\'s being played right now, ${message.author.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nowplaying', 'playingnow', 'cursong', 'curmusic', 'curtrack'],
  permLevel: 0
};

exports.help = {
  name: 'playing',
  description: 'Shows the current track being played from the music queue',
  usage: 'playing',
  type: 'music'
};
