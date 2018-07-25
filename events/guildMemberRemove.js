const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

module.exports = member => {
  const guild = member.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      memRem(row, member, guild);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        memRem(r.ops[0], member, guild);
        return;
      });
    }
  });
};


// Helper method
function memRem(row, member, guild) {
  const channel = guild.channels.find('name', row['goodbye']);
  if (!channel) return;
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setThumbnail(reactions.smug)
    .setTitle('A member has left the server~')
    .setDescription(`Goodbye, ${member.user.username}...`);
  return channel.send({embed});
}
