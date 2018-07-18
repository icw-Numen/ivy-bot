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

  if (server.dispatcher) {
    getInfo(curSong).then(info => {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle(`${info.items[0].title}`)
        .setThumbnail(reactions.wink1)
        .setDescription(`has been skipped, ${message.author.username}`)
        .setURL(info.items[0].url);
      message.channel.send({embed});
    }).catch(error => {return message.channel.send(`Oops, looks like something went wrong, ${message.author.username}. Please try again`).catch(error);});

    server.dispatcher.end();
  } else {
    return message.channel.send(`Oops, looks like nothing\'s being played right now, ${message.author.username}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['next'],
  permLevel: 0
};

exports.help = {
  name: 'skip',
  description: 'Skips the current music in the queue',
  usage: 'skip',
  type: 'music'
};
