const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    var str;
    if (row) {
      str = `${user.username}, you are currently at **lv.${row['level']}**`;
      getMoney(message, user, reactions.normal, str);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        str = `${user.username}, you currently have **\$0** in your account. Rip 💸`;
        getMoney(message, user, reactions.smug, str);
        return;
      });
    }
  });
};


// Helper method
function getMoney(message, user, reaction, str) {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Bank Account~`)
    .setThumbnail(reaction)
    .setDescription(str);
  message.channel.send({embed});
  return;
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
