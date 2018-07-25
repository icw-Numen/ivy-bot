const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const settings = require('../settings.json');
const main = require('../app.js');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      unHammer(row, message, args, guild, client);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        unHammer(r.ops[0], message, args, guild, client);
        return;
      });
    }
  });
};


// Helper method
function unHammer(row, message, args, guild, client) {
  //separates reason from the message
  const reason = args.slice(1).join(' ');

  if (reason.length < 1) return message.channel.send(`Please give me a reason so I can unban them, ${message.author.username}`).catch(console.error);

  const user = args[0];

  const modlog = guild.channels.find('name', row['modlog']);

  if (!user) return message.channel.send(`Please give me a user ID (not user name or tag) so I can unban them for you, ${message.author.username}`).catch(console.error);

  caseNumber(client, modlog).then(num => {
    const reason = args.splice(1, args.length).join(' ') || 'No reason';
    message.guild.unban(user);
    let embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Unban Successful~')
      .setThumbnail(reactions.smug2)
      .setDescription(`The user with the ID of **${user}** has been unbanned. For more details, head over to #${modlog.name}`);
    message.channel.send({embed});

    embed = new RichEmbed()
      .setColor(0xFFAD56)
      .setTimestamp()
      .setDescription(`**Action:** Unban\n**Target:** User ID: ${user}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`)
      .setFooter(`Case ${num}`);
    return client.channels.get(modlog.id).send({embed});
  });
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unhammer'],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Revoke a ban on a user for a given reason based on their user ID (which can be found in the mod action\'s embed)',
  usage: 'unban <user ID> <reason>',
  type: 'mod'
};
