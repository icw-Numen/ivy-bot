const main = require('../app.js');
const {playHelper} = require('../util/playHelper.js');
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
  const bot = message.guild.member(client.user);

  if (main.servers[message.guild.id].vc === '') {
    return message.channel.send(`Please join a voice channel and add me with \`${settings.prefix}join\`, ${user.username}`).catch(console.error);
  }
  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first, ${user.username}`).catch(console.error);
  }

  const server = main.servers[message.guild.id];

  if (server.dispatcher) {
    if (!server.dispatcher.paused) {
      return message.channel.send(`I'm already playing something, ${user.username}`).catch(console.error);
    }
  }

  if (server.queue.length === 0 && !server.dispatcher) {
    return message.channel.send(`It appears that the music queue is empty. Please give me a link with \`${settings.prefix}enqueue\` so I can add it to the queue, ${user.username}`).catch(console.error);
  }

  if (!(server.queue.length === 0)) {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Let the party begin~')
      .setThumbnail(reactions.wink1)
      .setDescription(`Music will start playing shortly, ${user.username}`);
    message.channel.send({embed}).then(m => {
      playHelper(server.vc, message);
      if (bot.hasPermission('MANAGE_MESSAGES')) {
        setTimeout(function() {
          m.delete();
        }, 6000);
      }
    });
    return;
  }
};

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['start', 'resume'],
  permLevel: 0
};

exports.help = {
  name: 'play',
  description: 'Starts playing the tracks in the music queue. Unpauses if something was paused before',
  usage: 'play',
  type: 'music'
};
