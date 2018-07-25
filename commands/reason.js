const settings = require('../settings.json');
const main = require('../app.js');

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

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    var row = res;
    if (err) return console.log(err);
    if (row) {
      setReason(row, message, args, guild, client, caseNumber, newReason);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        setReason(r.ops[0], message, args, guild, client, caseNumber, newReason);
        return;
      });
    }
  });
};


// Helper method
async function setReason(row, message, args, guild, client, caseNumber, newReason) {
  const modlog = guild.channels.find('name', row['modlog']);

  if (modlog) {
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
        embed.description = embed.description.replace(`No reason\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`, newReason);
        logMsg.edit({embed});
      });
    });
  }
}


// Command metadata
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
