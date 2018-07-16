const main = require('../app.js');
const reactions = require('../reactions.json');
const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
  const channel = message.guild.channels.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !channel)) return message.channel.send(`Please give me a valid channel, ${message.author.username}`).catch(console.error);

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      setWelcome(row, message, args, guild);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '' }, function (error) {
        if (error) return console.log(err);
        setWelcome(row, message, args, guild);
        return;
      });
    }
  });
};


// Helper method
function setWelcome (row, message, args, guild) {
  if (args.length === 1) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { welcome: (args[0]) } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Welcome channel set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default welcome channel was successfully set to **\#${args[0]}**, ${message.author.username}`);
    message.channel.send({embed});
  } else
  if (args.length === 0) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { welcome: '' } }).catch(error => console.log(error));        
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Welcome channel set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default welcome channel was successfully reset to none, ${message.author.username}`);
    message.channel.send({embed});
  }
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setwelcome'],
  permLevel: 2
};

exports.help = {
  name: 'welcome',
  description: 'Sets the server\'s default channel for welcoming new members. Not giving any channels will set/reset it to none',
  usage: 'welcome <channel>',
  type: 'server'
};
