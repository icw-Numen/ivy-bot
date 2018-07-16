const {RichEmbed} = require('discord.js');
const main = require('../app.js');

module.exports = (oMessage, nMessage) => {
  if (oMessage.content === nMessage.content) return;
  const guild = oMessage.guild;
  const client = oMessage.client;

  main.guildsettings.findOne({ guildId : { $gte: guild.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      msgUpdt(row, oMessage, nMessage, guild, client);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '' }, function (error) {
        if (error) return console.log(err);
        msgUpdt(row, oMessage, nMessage, guild, client);
        return;
      });
    }
  });
};


// Helper method
function msgUpdt(row, oMessage, nMessage, guild, client) {
  const modlog = guild.channels.find('name', row['modlog']);
  if (!modlog) {
    return;
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTimestamp()
    .setDescription(`**Action:** Message edit\n**User:** ${oMessage.author.tag} (User ID: ${oMessage.author.id})\n**Old message:**\n${oMessage.content}\n**New message:**\n${nMessage.content}`);
  return client.channels.get(modlog.id).send({embed});
}
