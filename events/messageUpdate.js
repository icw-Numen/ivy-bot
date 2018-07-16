const {RichEmbed} = require('discord.js');


module.exports = (oMessage, nMessage) => {
  if (oMessage.content === nMessage.content) return;
  const server = oMessage.guild;
  const client = oMessage.client;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    } else {
      const modlog = server.channels.find('name', row.modlog);
      if (!modlog) {
        return;
      }
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTimestamp()
        .setDescription(`**Action:** Message edit\n**User:** ${oMessage.author.tag} (User ID: ${oMessage.author.id})\n**Old message:**\n${oMessage.content}\n**New message:**\n${nMessage.content}`);
      return client.channels.get(modlog.id).send({embed});
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    });
  });
};
