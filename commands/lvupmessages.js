const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const channel = message.guild.channels.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !channel)) return message.channel.send(`${message.author.username}, please enter a valid channel`).catch(console.error);

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      setNotifs(row, message, args, guild);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', Notifs: '', autorole: '', nsfw: [], queue: [], lvnotifs: '' }, function (error, r) {
        if (error) return console.log(error);
        setNotifs(r.ops[0], message, args, guild);
        return;
      });
    }
  });
};


// Helper method
function setNotifs(row, message, args, guild) {
  if (row['lvnotifs'] === '' || !row['lvnotifs']) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { lvnotifs: 'on' } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Alerts are on~')
      .setThumbnail(reactions.wink)
      .setDescription(`I will now let you know whenever you level up, ${message.author.username}`);
    message.channel.send({embed});
  } else
  if (row['lvnotifs'] === 'on') {
    main.guildsettings.update({ guildId: guild.id }, { $set: { lvnotifs: '' } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Alerts are off~')
      .setThumbnail(reactions.wink)
      .setDescription(`Level up messages are now off, ${message.author.username}`);
    message.channel.send({embed});
  }
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levelupmsgs', 'lvnotifs', 'togglelvupmsgs'],
  permLevel: 2
};

exports.help = {
  name: 'lvupmessages',
  description: 'Toggles level up messages from Ivy on/off. Level up messages are off by default',
  usage: 'lvupmessages',
  type: 'server'
};
