module.exports = (client, guild) => {
  console.log(`Guild leave: ${guild.name} (${guild.id}) removed me :\(`);

  // If the settings Enmap contains any guild overrides, remove them.
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
