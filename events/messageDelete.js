const {RichEmbed} = require('discord.js');


module.exports = (message) => {
  if (message.author.bot) return;
  const server = message.guild;
  const client = message.client;

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
        .setDescription(`**Action:** Message delete\n**User:** ${message.author.tag} (User ID: ${message.author.id})\n**Deleted message:**\n${message.content}`);
      return client.channels.get(modlog.id).send({embed});
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    });
  });
};
