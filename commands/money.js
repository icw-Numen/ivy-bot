const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.user;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      getMoney2(row, message);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        getMoney1(row, message);
        return;
      });
    }
  });
};


// Helper method
function getMoney1(row, message) {
  const user = message.author;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Bank Account~`)
    .setThumbnail(reactions.smug)
    .setDescription(`${user.username}, you currently have **\$0** in your account. Rip 💸`);
  message.channel.send({embed});
  return;
}

// Helper method
function getMoney2(row, message) {
  const user = message.author;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Bank Account~`)
    .setThumbnail(reactions.normal)
    .setDescription(`${user.username}, you currently have **\$${row['credits']}** in your account`);
  message.channel.send({embed});
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['monies', 'moolah', 'moola', 'credits', 'wallet', 'bank', 'piggybank'],
  permLevel: 0
};

exports.help = {
  name: 'money',
  description: 'Shows how much money you currently have',
  usage: 'money',
  type: 'level/credits system'
};
