const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {      
      getExp(row, message);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle(`${user.username}\'s Experience Points~`)
          .setThumbnail(reactions.normal)
          .setDescription(`${user.username}, you currently have **1 exp** (9 exp until next level)`);
        message.channel.send({embed});
        return;
      });
    }
  });
};


// Helper function(s)
function getExp(row, message) {
  const user = message.author;
  const expNextLv = row['level'] * 5 + 10;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Experience Points~`)
    .setThumbnail(reactions.normal)
    .setDescription(`${user.username}, you currently have **${row['exp']} exp** (${expNextLv - row['exp']} exp until next level)`);
  message.channel.send({embed});
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['xp'],
  permLevel: 0
};

exports.help = {
  name: 'exp',
  description: 'Shows how many experience points you currently have',
  usage: 'exp',
  type: 'level/credits system'
};
