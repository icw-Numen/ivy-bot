const main = require('../app.js');
const {getInfo} = require('ytdl-getinfo');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const YouTube = require('simple-youtube-api');
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

  if (args.length === 0) {
    return message.channel.send(`Please give me a video so I can add it to the queue, ${user.username}`).catch(console.error);
  }

  const ytReg = /(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})/;
  const youtube = new YouTube(process.env.YOUTUBEAPIKEY);
  var url;

  if (args.join(' ').match(ytReg)) {
    url = args.join();
  } else {
    youtube.searchVideos(args.join(' '), 1).then(link => {
      url = link[0].url;
      playVideo(url, message);
    }).catch(error => {
      return message.channel.send(`Oops, something went wrong when searching for a video. Please try again, ${user.username}`).catch(error);
    });
    return;
  }

  playVideo(url, message);
};


// Helper method
function playVideo(url, message) {
  const user = message.author;
  const server = main.servers[message.guild.id];
  getInfo(url).then(info => {
    if (server.queue.length >= 25) {
      return message.channel.send(`Ah, there can be only 25 tracks max. in the queue, ${user.username}`).catch(console.error);
    }

    let str;
    if (server.queue.length === 0)  {
      str = `has been added to the queue at position **1**, ${user.username}`;
    }
    else {
      str = `has been added to the queue at position **${server.queue.length + 1}**, ${user.username}`;
    }
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${info.items[0].title}`)
      .setDescription(`${str}`)
      .setThumbnail(reactions.wink)
      .setURL(info.items[0].url);
    message.channel.send({embed}).then(() => {
      server.queue.push(url);
      server.qUsers.push(user.username + `, position **${server.queue.length}**`);
    });
  }).catch(error => {return message.channel.send(`Please give me a valid video, ${user.username}`).catch(error);});
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addqueue', 'addsong', 'addmusic', 'enqueue', 'playthis', 'enq'],
  permLevel: 0
};

exports.help = {
  name: 'enqueue',
  description: 'Adds a track to the queue. Queue can hold 25 tracks max. Works with either a link or a keyword (in this case, Ivy will use the first video she finds)',
  usage: 'enqueue <youtube link/keywords>',
  type: 'music'
};
