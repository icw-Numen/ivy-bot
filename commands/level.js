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
          .setTitle(`${user.username}\'s Level~`)
          .setThumbnail(reactions.smug)
          .setDescription(`${user.username}, you are currently at **lv.0**`);
        message.channel.send({embed});
        return;
      });
    }
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.username}\'s Level~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.username}, you are currently at **lv.${row.level}**`);
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
  aliases: ['lv', 'lvl'],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: 'Shows your current level',
  usage: 'level',
  type: 'level/credits system'
};
