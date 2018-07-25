const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    var str;
    if (row) {
      str = `${user.username}, you are currently at **lv.${row['level']}**`;
      getLv(row, message, user, reactions.normal, str);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        str = `${user.username}, you are currently at **lv.0**`;
        getLv(r.ops[0], message, user, reactions.smug, str);
        return;
      });
    }
  });
};


// Helper method
function getLv(row, message, user, reaction, str) {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Level~`)
    .setThumbnail(reaction)
    .setDescription(str);
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
