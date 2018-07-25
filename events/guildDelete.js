const main = require('../app.js');

module.exports = (client, guild) => {
  console.log(`Guild leave: ${guild.name} (${guild.id}) removed me :\(`);

  // If the settings Enmap contains any guild overrides, remove them.
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      main.guildsettings.deleteOne({ guildId : { $eq: guild.id }}, function (err) {
        if (err) return console.log(err);
        return console.log(`Guild leave: ${guild.name} (${guild.id}) removed me :\(`);
      });
    } else {
      return;
    }
  });
};
