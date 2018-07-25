const main = require('../app.js');
const reactions = require('../reactions.json');
const {RichEmbed} = require('discord.js');

module.exports = member => {
  const guild = member.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      welcome(row, member);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        main.scores.findOne({ userId : { $eq: member.id }}, function (err, res) {
          if (err) return console.log(err);
          var row = res;
          if (row) {
            main.scores.insertOne({userId: member.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error) {
              if (error) return console.log(error);
            });
          }
        });
        if (error) return console.log(error);
        welcome(r.ops[0], member);
        return;
      });
    }
  });
};


// Helper method
function welcome(row, member) {
  const guild = member.guild;
  const bot = guild.member(guild.client.user);
  const channel = guild.channels.find('name', row['welcome']);
  if (!channel) return;
  const role = guild.roles.find('name', row['autorole']);
  if (role && (bot.hasPermission(['MANAGE_ROLES']) || bot.hasPermission(['ADMINISTRATOR']))) member.addRole(role).catch(console.error);
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setThumbnail(reactions.closedeyes)
    .setTitle('A new member has joined the server~')
    .setDescription(`Hello~ Welcome to **${guild.name}**, ${member.user.username}!`);
  return channel.send({embed});
}
