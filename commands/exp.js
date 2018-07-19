const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    var str;
    const expNextLv = row['level'] * 5 + 10;
    if (row) {
      str = `${user.username}, you currently have **${row['exp']} exp** (${expNextLv - row['exp']} exp until next level)`;
      getExp(row, message, user, reactions.normal, str, expNextLv);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: {}}, function (error) {
        if (error) return console.log(error);
        str = `${user.username}, you currently have **${row['exp']} exp** (${expNextLv - row['exp']} exp until next level)`;
        getExp(row, message, user, reactions.normal2, str, expNextLv);
        return;
      });
    }
  });
};


// Helper function(s)
function getExp(row, message, user, reaction, str, expNextLv) {
  if (expNextLv - row['exp'] === 0) {
    return;
  }
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Experience Points~`)
    .setThumbnail(reaction)
    .setDescription(str);
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
