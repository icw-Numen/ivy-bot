const {RichEmbed} = require('discord.js');
const main = require('../app.js');

module.exports = (oMessage, nMessage) => {
  if (oMessage.content === nMessage.content) return;
  const guild = oMessage.guild;
  const client = oMessage.client;

  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      msgUpdt(row, oMessage, nMessage, guild, client);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        msgUpdt(r.ops[0], oMessage, nMessage, guild, client);
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
