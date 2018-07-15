// type in cmd "npm install --save ms" to solve this
// this npm package converts ms into human-readable time and that into ms
const ms = require('ms');

const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  // locks per guild/channel
  if (!client.lockit) client.lockit = [];

  const time = args.join(' ');
  const validUnlocks = ['release', 'unlock'];

  if (!time) message.channel.send(`Please set a duration for the lockdown in either hours, minutes, or seconds, ${message.author.username}`).catch(console.error);

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      // enables ppl to send messages again
      SEND_MESSAGES: null
    }).then(() => {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle('Lockdown lifted~')
        .setThumbnail(reactions.wink)
        .setDescription('Everyone can chat here again now');
      message.channel.send({embed});
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      // disables ppl from sending messages
      SEND_MESSAGES: false
    }).then(() => {
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle('Lockdown~')
        .setThumbnail(reactions.smug2)
        .setDescription(`No one will be able to chat in this channel for ${ms(ms(time), { long:true })}`);
      message.channel.send({embed}).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(() => {
            const embed = new RichEmbed()
              .setColor(0xF18E8E)
              .setTitle('Lockdown lifted~')
              .setThumbnail(reactions.wink)
              .setDescription('Everyone can chat here again now');
            message.channel.send({embed});
          }).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));
      }).catch(error => {
        console.log(error);
      });
    });
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld', 'lock'],
  permLevel: 2
};

exports.help = {
  name: 'lockdown',
  description: 'This will prevent users from sending messages to the channel for the set duration, be it in hours, minutes or seconds. Example use: <prefix> lockdown 5 minutes',
  usage: 'lockdown <duration>',
  type: 'mod'
};
