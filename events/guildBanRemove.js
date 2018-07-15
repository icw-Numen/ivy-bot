const Discord = require('discord.js');

// when someone gets unhammered
module.exports = (guild, user) => {
  guild.defaultChannel.send(`${user.tag} was just unbanned!`);

  const embed = new Discord.RichEmbed()
    .setColor(0xF18E8E)
    .setTimestamp()
    .setDescription(`**Action**: Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);

  return guild.channels.get(guild.channels.find('name', 'bot-mod-logs').id).send({embed});
};
