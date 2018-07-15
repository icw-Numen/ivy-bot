const sql = require('sqlite');
const {caseNumber} = require('../util/caseNumber.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  let bullets;
  let pulls;
  const user = message.author.username;
  const server = message.guild;

  if (!parseInt(args[0])) {
    bullets = 1;
  } else {
    bullets = parseInt(args[0]);
  }

  if (!parseInt(args[1])) {
    pulls = 5;
  } else {
    pulls = parseInt(args[1]);
  }

  if ((args[0] && !parseInt(args[0]) && !args[0].match(/safe/i)) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 5 ||
  args.length > 3) {
    return message.channel.send(`Please give me a valid number of bullets (1 ~ 5), ${user}`).catch(console.error);
  }

  if ((args[1] && !parseInt(args[1]) && !args[0].match(/safe/i)) || parseInt(args[1]) <= 0 || parseInt(args[1]) > 5 ||
  args.length > 3) {
    return message.channel.send(`Please give me a valid number of pulls (1 ~ 5), ${user}`).catch(console.error);
  }

  var fired = 0;

  for (var i = 0; i < pulls + 1; i++) {
    (function(i) {
      setTimeout(function() {
        const shot = Math.floor(Math.random() * (6 - i)) + 1;
        if (i === pulls && fired === 0) {
          const embed = new RichEmbed()
            .setColor(0xF18E8E)
            .setTitle('Victory~')
            .setThumbnail(reactions.wink1)
            .setDescription(`Huzzah! 🎉  |  ${user} has pulled the trigger ${pulls} times without getting shot!`);
          message.channel.send({embed});

          if (!(args.join(' ').includes('safe') && args.join(' ').includes('Safe')) && message.guild.member(message.author).kickable) {
            sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
              if (!row) {
                sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]).then(() => {
                  return;
                });
              }
              const money = row.credits;
              sql.run(`UPDATE scores SET credits = ${row.credits + 100} WHERE userId = ${message.author.id}`);
              const embed = new RichEmbed()
                .setColor(0xF18E8E)
                .setTitle('Oh and by the way~')
                .setThumbnail(reactions.wink)
                .setDescription(`${message.author.username}, **\$${20*pulls + 20*bullets}** has been awarded to your account as reward for playing with safe mode off! You now have **\$${money + 100}** in your account 💰`);
              message.channel.send({embed});
            }).catch(() => {
              // console.error;
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
              });
            });
          }
          return;
        }
        if (shot <= bullets && fired === 0) {
          fired = 1;
          if (!(args.join(' ').match(/safe/i)) && message.guild.member(message.author).kickable) {
            sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
              if (!row) {
                sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]).then(() => {
                  return;
                });
              }
              const money = row.credits;
              if (money < 10) {
                const embed = new RichEmbed()
                  .setColor(0xF18E8E)
                  .setThumbnail(reactions.smug2)
                  .setDescription(`***\\*BANG!!\\**** 🔫  |\n\nOh no! ${user} got badly wounded and has to leave immediately!`);
                message.channel.send({embed});
              } else {
                sql.run(`UPDATE scores SET credits = ${row.credits - 10} WHERE userId = ${message.author.id}`);
                const embed = new RichEmbed()
                  .setColor(0xF18E8E)
                  .setThumbnail(reactions.smug2)
                  .setDescription(`***\\*BANG!!\\**** 🔫  |\n\nOh no! ${user} got badly wounded and lost **$10**!`);
                message.channel.send({embed});
              }
            }).catch(() => {
              // console.error;
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, exp, level, credits, claimed) VALUES (?, ?, ?, ?, ?)', [message.author.id, 1, 0, 0, 0]);
              });
            });

            sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
              if (!row) {
                return sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
              }
              const modlog = server.channels.find('name', row.modlog);

              if (modlog) {
                caseNumber(client, modlog).then(num => {
                  const reason = 'Got shot in a Russian roulette game';

                  if (!message.author.bot) message.author.send('You\'ve been shot and got kicked out!');
                  message.guild.member(message.author).kick();

                  const embed = new RichEmbed()
                    .setColor(0xFFAD56)
                    .setTimestamp()
                    .setDescription(`**Action:** Kick\n**Target:** ${message.author.tag}\n**Moderator:** None\n**Reason:** ${reason}`)
                    .setFooter(`Case ${num}`);
                  client.channels.get(modlog.id).send({embed});
                  return;
                });
              } else {
                if (!message.author.bot) message.author.send('You\'ve been shot and got kicked out!');
                message.guild.member(message.author).kick();
                return;
              }
            }).catch(() => {
              console.error;
              sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
                sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
              });
            });
          } else {
            const embed = new RichEmbed()
              .setColor(0xF18E8E)
              .setThumbnail(reactions.smug1)
              .setDescription(`***\\*BANG!!\\**** 🔫  |\n\nOof! ${user} has fired the gun, but survived with no major injuries!`);
            message.channel.send({embed});
            return;
          }
        } else if (fired === 0) {
          message.channel.send('*\\*click\\** 🔫  |  ...');
        }
      }, 1000 * i);
    }(i));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['russianroulette', 'playroulette', 'rlt'],
  permLevel: 0
};

exports.help = {
  name: 'roulette',
  description: 'Play russian roulette against yourself! You can play with up to 5 bullets and pull the trigger up to 5 times. 1 bullet is loaded by default.\n\n**Playing with safe more off means losing will get you kicked out and lose credits, but winning nets you a lot of credits based on the number of bullets and pulls.**\n\nType "safe" to play with no penalties.\nCredits can only be obtained with safe mode off (you also have to be kickable).',
  usage: 'roulette <bullets> <pulls> <safe>',
  type: 'fun'
};
