const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');

exports.run = (client, message) => {
  if (!message.member.voiceChannel) {
    return message.channel.send(`Please join a voice channel first and then add me with  \`${settings.prefix}join\`, ${message.author.username}`).catch(console.error);
  }

  const server = main.servers[message.guild.id];

  if (server.vc === '') {
    return message.channel.send(`Please add me to a voice channel first, ${message.author.username}`).catch(console.error);
  }

  if (message.guild.voiceConnection && server.dispatcher) {
    server.dispatcher.pause();
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Pausing~')
      .setThumbnail(reactions.wink)
      .setDescription(`Let me know when you want to play the queue again, ${message.author.username}`);
    message.channel.send({embed});
  } else {
    return message.channel.send(`Oh, it appears nothing is being played right now, ${message.author.username}`).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pausemusic', 'pausesong' ,'pausetrack'],
  permLevel: 0
};

exports.help = {
  name: 'pause',
  description: 'Pauses the currently playing music',
  usage: 'pause',
  type: 'music'
};
