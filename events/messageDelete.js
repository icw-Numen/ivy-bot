const {RichEmbed} = require('discord.js');
const main = require('../app.js');

module.exports = (message) => {
  if (message.author.bot) return;
  const client = message.client;

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      msgDel(row, message, guild, client);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        msgDel(r.ops[0], message, guild, client);
        return;
      });
    }
  });
};


// Helper method
function msgDel(row, message, guild, client) {
  const modlog = guild.channels.find('name', row['modlog']);
  if (!modlog) {
    return;
  }
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTimestamp()
    .setDescription(`**Action:** Message delete\n**User:** ${message.author.tag} (User ID: ${message.author.id})\n**Deleted message:**\n${message.content}`);
  return client.channels.get(modlog.id).send({embed});
}
