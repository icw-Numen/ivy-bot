const Discord = require('discord.js');
const main = require('../app.js');

// when someone gets unhammered
module.exports = (guild, user) => {
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      unbanned(row, guild, user);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        unbanned(r.ops[0], guild, user);
        return;
      });
    }
  });
};


// Helper method
function unbanned(row, guild, user) {
  const channel = guild.channels.find('name', row['welcome']);
  if (!channel) return;
  guild.defaultChannel.send(`${user.tag} was just unbanned!`);

  const embed = new Discord.RichEmbed()
    .setColor(0xF18E8E)
    .setTimestamp()
    .setDescription(`**Action**: Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);

  return guild.channels.get(guild.channels.find('name', 'bot-mod-logs').id).send({embed});
}
