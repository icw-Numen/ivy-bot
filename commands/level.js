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
      getLv(row, message, user, reactions.normal, str);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        str = `${user.username}, you are currently at **lv.0**`;
        getLv(row, message, user, reactions.smug, str);
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
