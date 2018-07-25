const {RichEmbed} = require('discord.js');
const main = require('../app.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const role = message.guild.roles.find('name', `${args[0]}`);
  if (args.length > 1 || (args.length === 1 && !role)) return message.channel.send(`${message.author.username}, please enter a valid role`).catch(console.error);

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      setAutorole(row, message, args);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        setAutorole(r.ops[0], message, args);
        return;
      });
    }
  });
};


// Helper method
function setAutorole(row, message, args) {
  const guild = message.guild;
  if (args.length === 1) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { autorole: (args[0]) } }).catch(error => console.log(error));

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Autorole set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default role was successfully set to **${args[0]}**, ${message.author.username}`);
    message.channel.send({embed});
  } else
  if (args.length === 0) {
    main.guildsettings.update({ guildId: guild.id }, { $set: { autorole: '' } }).catch(error => console.log(error));

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Autorole set~')
      .setThumbnail(reactions.wink)
      .setDescription(`The default role was successfully reset to none, ${message.author.username}`);
    message.channel.send({embed});
  }
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['defaultrole'],
  permLevel: 2
};

exports.help = {
  name: 'autorole',
  description: 'Sets the server\'s default role for new members. Passing nothing resets the default role to none',
  usage: 'autorole <role>',
  type: 'server'
};
