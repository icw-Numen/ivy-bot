const main = require ('../app.js');
const ytdl = require('ytdl-core');
const reactions = require('../reactions.json');
const {getInfo} = require('ytdl-getinfo');
const {RichEmbed} = require('discord.js');

function playHelper (connection, message) {
  const server = main.servers[message.guild.id];

  const curSong = server.queue[0];
  const curUser = server.qUsers[0];

  if (!curSong || !curUser) {
    return;
  }

  getInfo(curSong).then(info => {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${info.items[0].title}`)
      .setThumbnail(reactions.wink)
      .setDescription(`is now playing\n\n(track added by ${curUser})`)
      .setURL(info.items[0].url);
    message.channel.send({embed});
  }).catch(error => {return error;});

  if (server.dispatcher) {
    if (server.dispatcher.paused) {
      server.dispatcher.resume();
      return;
    }
  }

  server.dispatcher = connection.playStream(ytdl(curSong, {filter: 'audioonly'}), {volume: .3});

  server.dispatcher.on('end', () => {
    if (server.queue[0] && message.guild.voiceConnection) {
      setTimeout(function() {
        if (!(main.servers[message.guild.id].vc === '')) {
          server.queue.shift();
          server.qUsers.shift();
          playHelper(connection, message);
        }
      }, 2000);
    }
    else {
      connection.disconnect();
      setTimeout(function() {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle('Done~')
          .setThumbnail(reactions.closedeyes)
          .setDescription('Reached the end of the queue. Did I do well?');
        message.channel.send({embed});
      }, 3000);
    }
  });
}


module.exports = {playHelper};
