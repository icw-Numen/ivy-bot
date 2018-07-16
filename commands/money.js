
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.user;
  sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]).then(() => {
        const embed = new RichEmbed()
          .setColor(0xF18E8E)
          .setTitle(`${user.username}\'s Bank Account~`)
          .setThumbnail(reactions.smug)
          .setDescription(`${user.username}, you currently have **\$0** in your account. Rip 💸`);
        message.channel.send({embed});
        return;
      });
    }
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.username}\'s Bank Account~`)
      .setThumbnail(reactions.normal)
      .setDescription(`${user.username}, you currently have **\$${row.credits}** in your account`);
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
  aliases: ['monies', 'moolah', 'moola', 'credits', 'wallet', 'bank', 'piggybank'],
  permLevel: 0
};

exports.help = {
  name: 'money',
  description: 'Shows how much money you currently have',
  usage: 'money',
  type: 'level/credits system'
};
