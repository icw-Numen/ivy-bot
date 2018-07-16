const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      getLv2(row, message);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        getLv1(row, message);
        return;
      });
    }
  });  
};


// Helper method
function getLv1 (row, message) {
  const user = message.author;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Level~`)
    .setThumbnail(reactions.smug)
    .setDescription(`${user.username}, you are currently at **lv.0**`);
  message.channel.send({embed});
}

// Helper method
function getLv2 (row, message) {
  const user = message.author;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Level~`)
    .setThumbnail(reactions.normal)
    .setDescription(`${user.username}, you are currently at **lv.${row['level']}**`);
  message.channel.send({embed});
}



// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lv', 'lvl'],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: 'Shows your current level',
  usage: 'level',
  type: 'level/credits system'
};
