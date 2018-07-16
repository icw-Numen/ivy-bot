const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    let str;
    if (row) {
      str = `${user.username}, my settings for this server are:`;
      getServerStats(row, message, user, reactions.normal, str);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error) {
        if (error) return console.log(err);
        str = `${user.username}, my settings for this server are:`;
        getServerStats(row, message, user, reactions.smug, str);
        return;
      });
    }
  });
};


// Helper method
function getServerStats(row, message, user, reaction, str) {
  let strA;
  let strW;
  let strG;
  let strM;
  if (row['autorole'].length === 0) {
    strA = 'Not set';
  } else
  if (row['autorole'].length >= 0) {
    strA = row['autorole'];
  }
  if (row['welcome'].length === 0) {
    strW = 'Not set';
  } else
  if (row['welcome'].length >= 0) {
    strW = row['welcome'];
  }
  if (row['goodbye'].length === 0) {
    strG = 'Not set';
  } else
  if (row['goodbye'].length >= 0) {
    strG = row['goodbye'];
  }
  if (row['modlog'].length === 0) {
    strM = 'Not set';
  } else
  if (row['modlog'].length >= 0) {
    strM = row['modlog'];
  }
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Stats~`)
    .setThumbnail(reaction)
    .setDescription(str)
    .addField('Autorole:', `#${strA}`, true)
    .addField('Welcome channel:', `#${strW}`, true)
    .addField('Goodbye channel:', `#${strG}`, true)
    .addField('Mod/Bot logs:', `#${strM}`, true);
  message.channel.send({embed});
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['serversettings', 'channelsettings', 'botsettings'],
  permLevel: 0
};

exports.help = {
  name: 'settings',
  description: 'Shows current server settings set by the bot',
  usage: 'settings',
  type: 'server'
};
