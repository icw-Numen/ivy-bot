const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const channel = message.guild.channels.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !channel)) return message.channel.send(`${message.author.username}, please enter a valid channel`).catch(console.error);

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      setGoodbye(row, message, args, guild);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        setGoodbye(r.ops[0], message, args, guild);
        return;
      });
    }
  });
};


// Helper method
function setGoodbye(row, message, args, guild) {
  if (args.length === 1) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { goodbye: (args[0]) } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Goodbye channel set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default goodbye channel was successfully set to **\#${args[0]}**, ${message.author.username}`);
    message.channel.send({embed});
  } else
  if (args.length === 0) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { goodbye: '' } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Goodbye channel set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default goodbye channel was successfully reset to none, ${message.author.username}`);
    message.channel.send({embed});
  }
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setgoodbye'],
  permLevel: 2
};

exports.help = {
  name: 'goodbye',
  description: 'Sets the server\'s default channel for sending goodbyes to members who just left the guild',
  usage: 'goodbye <channel>',
  type: 'server'
};
