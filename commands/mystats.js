const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      getStats2(row, message);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        getStats1(row, message);
        return;
      });
    }
  });
};


// Helper method
function getStats1(row, message) {
  const user = message.author;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Stats~`)
    .setThumbnail(reactions.smug)
    .setDescription(`${user.username}, you are currently at **lv.0**, you have **1/10 exp**, and you have **\$0** in your account`);
  message.channel.send({embed});
}

// Helper method
function getStats2(row, message) {
  const user = message.author;
  const expNextLv = row.level * 5 + 10;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Stats~`)
    .setThumbnail(reactions.normal)
    .setDescription(`${user.username}, you are currently at **lv.${row['level']}**, and you have **${row['exp']}/${expNextLv - row['exp']} exp**. You have **\$${row['credits']}** in your account`);
  message.channel.send({embed});
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stats'],
  permLevel: 0
};

exports.help = {
  name: 'mystats',
  description: 'Shows the level, exp, and money you currently have',
  usage: 'mystats',
  type: 'level/credits system'
};
