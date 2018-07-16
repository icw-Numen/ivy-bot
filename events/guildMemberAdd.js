const main = require('../app.js');

module.exports = member => {
  const guild = member.guild;
  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
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
  channel.send(`Hello~ Welcome to **${guild.name}**, ${member.user.username}!`);
}
