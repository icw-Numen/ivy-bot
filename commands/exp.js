const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;

  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    if (res) {
      getExp();
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

    function getExp() {
      const expNextLv = res['level'] * 5 + 10;
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTitle(`${user.username}\'s Experience Points~`)
        .setThumbnail(reactions.normal)
        .setDescription(`${user.username}, you currently have **${res['exp']} exp** (${expNextLv - res['exp']} exp until next level)`);
      message.channel.send({embed});
    }
  });  
};


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
