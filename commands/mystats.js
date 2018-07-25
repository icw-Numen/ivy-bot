const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const moment = require('moment');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    var str;
    var lv;
    var xp;
    var monies;
    if (row) {
      const expNextLv = row.level * 5 + 10;
      if (expNextLv - row['exp'] === 0) {
        lv = row['level'] + 1;
        xp = 0;
        monies = row['credits'] + 50;
      } else {
        lv = row['level'];
        xp = row['exp'];
        monies = row['credits'];
      }

      str = `${user.username}, your current stats are the following:`;
      getStats(row, message, user, reactions.normal, str, lv, xp, monies);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        lv = 0;
        xp = 1;
        monies = 0;
        str = `${user.username}, your current stats are the following:`;
        getStats(r.ops[0], message, user, reactions.smug, str, lv, xp, monies);
        return;
      });
    }
  });
};


// Helper method
function getStats(row, message, user, reaction, str, lv, xp, monies) {
  let str2;
  if (row['claimed'] === moment().format('L')) {
    str2 = 'Unavailable';
  } else {
    str2 = 'Available';
  }

  const cards = row['cards'].map(a => `- ${a.title} (**${a.fields.length}** entries total, 15 max.)`).join(',\n');

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s Stats~`)
    .setThumbnail(reaction)
    .setDescription(str)
    .addField('Level:', `lv. ${lv}`, true)
    .addField('Exp:', `${xp} exp`, true)
    .addField('Balance:', `\$${monies}`, true)
    .addField('Dailies:', `${str2}`, true)
    .addField('Custom Cards:', `${cards}\n(**${row['cards'].length}** cards total, 3 max.)`, true);
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
  description: 'Shows the level, exp, money, and custom cards you currently have',
  usage: 'mystats',
  type: 'level/credits system'
};
