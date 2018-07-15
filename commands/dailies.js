const sql = require('sqlite');
const ms = require('ms');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message) => {
  const user = message.author;
  sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]).then(() => {
        message.channel.send(`Uwah! Something went wrong. Please try again, ${user.username}`).catch(console.error);
        return;
      });
    }
    if (row.claimed === 1) {
      return message.channel.send(`You have already claimed your dailies today, ${user.username}`).catch(console.error);
    }

    const time = '1 day';

    sql.run(`UPDATE scores SET claimed = 1 WHERE userId = ${user.id}`);
    setTimeout(() => {
      sql.run(`UPDATE scores SET claimed = 0 WHERE userId = ${user.id}`);
    }, ms(time));
    const money = row.credits;
    sql.run(`UPDATE scores SET credits = ${row.credits + 100} WHERE userId = ${user.id}`);
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(`${user.username}\'s dailies~`)
      .setThumbnail(reactions.closedeyes)
      .setDescription(`${user.username}, **$100** has been added to your account! You now have **\$${money + 100}** 💰`);
    message.channel.send({embed});
  }).catch(() => {
    // console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [user.id, 1, 0, 0, 0]);
    });
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hollahollagetdolla'],
  permLevel: 0
};

exports.help = {
  name: 'dailies',
  description: 'Gives you $100. You can claim it again the next day',
  usage: 'dailies',
  type: 'level/credits system'
};
