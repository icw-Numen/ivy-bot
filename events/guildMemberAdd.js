const main = require('../app.js');
const reactions = require('../reactions.json');
const {RichEmbed} = require('discord.js');

module.exports = member => {
  const guild = member.guild;
  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      welcome(row, member);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error) {
        if (error) return console.log(err);
        welcome(row, member);
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
  if (role && bot.hasPermission('MANAGE_ROLES')) member.addRole(role).catch(console.error);
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setThumbnail(reactions.closedeyes)
    .setTitle('A new member has joined the server~')
    .setDescription(`Hello~ Welcome to **${guild.name}**, ${member.user.username}!`);
  return channel.send({embed});
}
