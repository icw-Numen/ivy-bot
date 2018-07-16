

module.exports = member => {
  const server = member.guild;

  sql.get(`SELECT * FROM channels WHERE guildId ="${server.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    } else {
      const channel = server.channels.find('name', row.welcome);
      const role = server.roles.find('name', row.autorole);
      if (role) member.addRole(role).catch(console.error);
      if (!channel) return;
      channel.send(`Hello~ Welcome to **${server.name}**, ${member.user.username}!`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)').then(() => {
      sql.run('INSERT INTO channels (guildId, welcome, goodbye, modlog, autorole, muted) VALUES (?, ?, ?, ?, ?, ?)', [server.id, '', '', '', '', '']);
    });
  });
};
