const main = require('../app.js');
const {playHelper} = require('../util/playHelper.js');
const {getInfo} = require('ytdl-getinfo');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');
const ytApi = require('simple-youtube-api');

exports.run = async (client, message, args) => {
  const user = message.author;

  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first and then add me with \`${settings.prefix}join\`, ${user.username}`).catch(console.error);
  }

  const ytReg = /(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})/;

  let url;
  if (args.join(' ').match(ytReg)) {
    url = args[0];
  } else {
    ytApi.search(args.join(' ')).then(link => {url = link[0].url;});
  }


  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  const server = main.servers[message.guild.id];

  if (args.length === 0 && server.queue.length === 0) {
    return message.channel.send(`It appears that the music queue is empty. Please give me a link so I can add it to the queue, ${user.username}`).catch(console.error);
  }

  if (args.length === 0 && !(server.queue.length === 0)) {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Let the party begin~')
      .setThumbnail(reactions.normal2)
      .setDescription(`Now playing music, ${user.username}`);
    message.channel.send({embed});
    playHelper(server.vc, message);
    return;
  }

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
      if (!server.dispatcher) playHelper(server.vc, message);
      server.queue.push(url);
      server.qUsers.push(user.username);
    });
  }).catch(error => {return message.channel.send(`Please give me a valid link, ${user.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['start'],
  permLevel: 0
};

exports.help = {
  name: 'play',
  description: 'Starts playing the tracks in the music queue. Giving a link adds the track to the queue. 25 songs can be queued max.\nNot giving anything simply resumes where the queue was left off',
  usage: 'play <youtube link>',
  type: 'music'
};
