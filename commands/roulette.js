const main = require('../app.js');
const {caseNumber} = require('../util/caseNumber.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if ((args[0] && !parseInt(args[0]) && !args.join(' ').match(/off/i)) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 5 ||
  args.length > 3) {
    return message.channel.send(`Please give me a valid number of bullets (1 ~ 5), ${player}`).catch(console.error);
  }

  if ((args[1] && !parseInt(args[1]) && !args.join(' ').match(/off/i)) || parseInt(args[1]) <= 0 || parseInt(args[1]) > 5 ||
  args.length > 3) {
    return message.channel.send(`Please give me a valid number of trigger pulls (1 ~ 5), ${player}`).catch(console.error);
  }

  let bullets;
  let pulls;

  const player = message.author.username;
  const guild = message.guild;
  const user = message.author;

  if (!parseInt(args[0])) {
    bullets = 1;
  } else {
    bullets = parseInt(args[0]);
  }

  if (!parseInt(args[1])) {
    pulls = 1;
  } else {
    pulls = parseInt(args[1]);
  }

  var safe;
  if (args.join(' ').match(/off/i)) {
    safe = 0;
  } else {
    safe = 1;
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
            .setDescription(`Huzzah! 🎉  |  ${player} has loaded **${bullets}** bullet(s) and pulled the trigger **${pulls}** time(s) without getting shot!`);
          message.channel.send({embed});

          if ((safe === 0) && message.guild.member(message.author).kickable) {
            main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
              if (err) return console.log(err);
              var row = res;
              if (row) {
                getDolla(row, message, user, player, pulls, bullets);
              } else {
                main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
                  if (error) return console.log(error);
                  getDolla(r.ops[0], message, user, player, pulls, bullets);
                });
              }
            });
          }
          return;
        }
        if (shot <= bullets && fired === 0) {
          fired = 1;
          if ((safe === 0) && message.guild.member(message.author).kickable) {
            main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
              if (err) return console.log(err);
              var row = res;
              if (row) {
                ripScore(row, message, user, player);
              } else {
                main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
                  if (error) return console.log(error);
                  ripScore(r.ops[0], message, user, player);
                });
              }
            });

            main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
              if (err) return console.log(err);
              var row = res;
              if (row) {
                rip(row, message, guild, client, user);
              } else {
                main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
                  if (error) return console.log(error);
                  rip(r.ops[0], message, guild, client, user);
                });
              }
            });
          } else {
            const embed = new RichEmbed()
              .setColor(0xF18E8E)
              .setThumbnail(reactions.smug1)
              .setDescription(`**_\\*BANG!!\\*_** 🔫  |\n\nOof! ${player} has fired the gun, but survived with no major injuries!`);
            message.channel.send({embed});
            return;
          }
        } else if (fired === 0) {
          message.channel.send('_\\*click\\*_ 🔫  |  ...');
        }
      }, 1000 * i);
    }(i));
  }
};


// Helper method
function getDolla(row, message, user, player, pulls, bullets) {
  const money = row['credits'];
  main.scores.update({ userId: message.author.id }, { $inc: { credits: 100 } }).catch(error => console.log(error));
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Oh and by the way~')
    .setThumbnail(reactions.wink)
    .setDescription(`${message.author.username}, **\$${20 * pulls * bullets}** has been awarded to your account as reward for playing with safe mode off, ${player}! You now have **\$${money + 100}** in your account 💰`);
  message.channel.send({embed});
}


// Helper method
function ripScore(row, message, user, player) {
  const money = row['credits'];
  if (money < 30) {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setThumbnail(reactions.smug2)
      .setDescription(`**_\\*BANG\\*_** 🔫  |\n\nOh no! ${player} got badly wounded and has to leave immediately!`);
    message.channel.send({embed});
  } else {
    main.scores.update({ userId: message.author.id }, { $inc: { credits: (-30) } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setThumbnail(reactions.smug2)
      .setDescription(`**_\\*BANG\\*_** 🔫  |\n\nOh no! ${player} got badly wounded and lost **$10**!`);
    message.channel.send({embed});
  }
}


// Helper method
function rip(row, message, guild, client, user) {
  const modlog = guild.channels.find('name', row['modlog']);

  if (modlog) {
    caseNumber(client, modlog).then(num => {
      const reason = 'Got shot in a Russian roulette game';

      if (!user.bot) user.send('You\'ve been shot and got kicked out!');
      message.guild.member(user).kick();

      const embed = new RichEmbed()
        .setColor(0xFFAD56)
        .setTimestamp()
        .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** None\n**Reason:** ${reason}`)
        .setFooter(`Case ${num}`);
      client.channels.get(modlog.id).send({embed});
      return;
    });
  } else {
    if (!user.bot) user.send('You\'ve been shot and got kicked out! You also lost **$10** in the process');
    message.guild.member(user).kick();
    return;
  }
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['russianroulette', 'playroulette', 'rlt'],
  permLevel: 0
};

exports.help = {
  name: 'roulette',
  description: 'Play russian roulette against yourself! You can play with up to 5 bullets (default: 1) and pull the trigger up to 5 times (default: 1).\n\n**Playing with safe mode off means losing will get you kicked out and lose credits, but winning nets you a lot of credits based on the number of bullets and pulls.**\n\nType "off" to play with safe mode off.\nCredits can only be obtained with safe mode off (you also have to be kickable).',
  usage: 'roulette <bullets> <pulls> <off>',
  type: 'fun'
};
