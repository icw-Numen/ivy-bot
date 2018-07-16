const main = require('../app.js');

module.exports = member => {
  const guild = member.guild;
  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      memRem(row, member, guild);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error) {
        if (error) return console.log(err);
        memRem(row, member, guild);
        return;
      });
    }
  });
};


// Helper method
function memRem(row, member, guild) {
  const channel = guild.channels.find('name', row['goodbye']);
  if (!channel) return;
  channel.send(`Goodbye, ${member.user.username}...`);
}
