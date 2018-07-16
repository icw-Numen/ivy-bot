
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]).then(() => {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle(`${user.username}\'s Stats~`)
          .setThumbnail(reactions.smug)
          .setDescription(`${user.username}, you are currently at **lv.0**, you have **1/10 exp**, and you have **\$0** in your account`);
        message.channel.send({embed});
        return;
      });
    }
    const expNextLv = row.level * 5 + 10;
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.username}\'s Stats~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.username}, you are currently at **lv.${row.level}**, and you have **${row.exp}/${expNextLv - row.exp} exp**. You have **\$${row.credits}** in your account`);
    message.channel.send({embed});
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]);
    });
  });
};


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
