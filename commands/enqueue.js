const main = require('../app.js');
const {getInfo} = require('ytdl-getinfo');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first, ${user.username}`).catch(console.error);
  }

  const ytReg = /(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})/;

  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  const server = main.servers[message.guild.id];
  if (args.length === 0) {
    return message.channel.send(`Please give me a link so I can add it to the queue, ${user.username}`).catch(console.error);
  }

  getInfo(args[0]).then(info => {
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
      if (args[0].match(ytReg)) {
        server.queue.push(args[0]);
        server.qUsers.push(user.username);
      } else {
        return;
      }
    });
  }).catch(error => {return message.channel.send(`Please give me a valid link, ${user.username}`).catch(error);});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addqueue', 'addsong', 'addmusic', 'enqueue', 'playthis', 'enq'],
  permLevel: 0
};

exports.help = {
  name: 'enqueue',
  description: 'Adds a track to the queue. Queue can hold 25 tracks max.',
  usage: 'enqueue <youtube link>',
  type: 'music'
};
