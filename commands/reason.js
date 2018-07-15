const settings = require('../settings.json');

async function embedSan(embed) {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
  return embed;
}

exports.run = async (client, message, args) => {
  const caseNumber = args.shift();
  const newReason = args.join(' ');

  // bad idea to use channels.find for multiple guilds, change later for multiguild
  const modlog = message.guild.channels.find('name', 'bot-mod-logs');

  await modlog.fetchMessages({
    limit: 100
  }).then((messages) => {
    const caselog = messages.filter(m => m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Case') &&
      m.embeds[0].footer.text === `Case ${caseNumber}`
    ).first();
    modlog.fetchMessage(caselog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      embed.description = embed.description.replace(`No reasons given (use ${settings.prefix}reason <case number> <reason> to set a reason for this action)`, newReason);
      logMsg.edit({embed});
    });
  });

};


exports.conf = {
  aliases: ['setreason'],
  permLevel: 2
};

exports.help = {
  name: 'reason',
  description: 'Sets the reason for a mod action if none was given to it before. Case number can be found in the footer text of the mod action embed',
  usage: 'reason <case number> <new reason>',
  type: 'mod'
};
