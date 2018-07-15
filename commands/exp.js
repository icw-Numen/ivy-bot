const sql = require('sqlite');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]).then(() => {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle(`${user.username}\'s Experience Points~`)
          .setThumbnail(reactions.normal)
          .setDescription(`${user.username}, you currently have **1 exp** (9 exp until next level)`);
        message.channel.send({embed});
        return;
      });
    }
    const expNextLv = row.level * 5 + 10;
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.username}\'s Experience Points~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.username}, you currently have **${row.exp} exp** (${expNextLv - row.exp} exp until next level)`);
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
  aliases: ['xp'],
  permLevel: 0
};

exports.help = {
  name: 'exp',
  description: 'Shows how many experience points you currently have',
  usage: 'exp',
  type: 'level/credits system'
};
