const main = require('../app.js');
const ytdl = require('ytdl-core');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if (!main.servers[message.guild.id]) {
    main.servers[message.guild.id] = {
      queue: [],
      qUsers: [],
      vc: ''
    };
  }

  const server = main.servers[message.guild.id];
  const q = server.queue;
  const q2 = server.qUsers;
  let lim;
  if (args.length > 0 && args.join(' ').indexOf('full') >= 0) {
    lim = q.length;
  } else {
    lim = 10;
  }
  var qA = [];
  for (var i = 0; i < lim; i++) {
    if (i < q.length) {
      const info = await ytdl.getInfo(q[i]);
      if (i === 0) {
        qA[i] = '- ' + '**' + info.title + '**' + `\n(added by ${q2[i]})`;
      } else {
        qA[i] = '- ' + '**' + info.title + '**' + `\n(added by ${q2[i]})`;
      }
    } else {
      break;
    }
  }

  let qF = qA.join(' \n');

  let reaction;

  if (qF.length === 0) {
    qF = 'The queue is empty...\nFeed me your hottest mixtape, everyone! 🔥';
    reaction = reactions.smug2;
  } else {
    reaction = reactions.wink;
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Music Queue~')
    .setThumbnail(reaction)
    .setDescription(`${message.author.username}, this server's music queue is:\n\n${qF}\n\n**${qA.length}** tracks total (25 max.)`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['musiclist', 'songlist', 'tracklist', 'playlist' ,'q', 'showqueue'],
  permLevel: 0
};

exports.help = {
  name: 'queue',
  description: 'Shows the first ten entries in the music queue. Typing "full" after the command gives the whole queue instead',
  usage: 'queue <full>',
  type: 'music'
};
