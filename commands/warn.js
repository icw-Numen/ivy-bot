const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
const main = require('../app.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`Please mention someone so I can warn them for you, ${message.author.username}`).catch(console.error);
  if (!parseUser(message, user)) return;

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      giveWarning(row, message, args, guild, client, user);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        giveWarning(r.ops[0], message, args, guild, client, user);
        return;
      });
    }
  });
};


// Helper method
function giveWarning(row, message, args, guild, client, user) {
  const modlog = client.channels.find('name', row['modlog']);

  caseNumber(client, modlog).then(num => {
    const reason = args.splice(1, args.length).join(' ') || 'No reason';

    if (!user.bot) user.send(`You have been warned for: ${reason}`);

    let embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Warn Successful~')
      .setThumbnail(reactions.smug2)
      .setDescription(`${user.username} has been warned. For more details, head over to #${modlog.name}`);
    message.channel.send({embed});

    if (modlog) {
      embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTimestamp()
        .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`)
        .setFooter(`Case ${num}`);
      return client.channels.get(modlog.id).send({embed});
    }
  });
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warning', 'alert'],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user',
  usage: 'warn <mention> <reason>',
  type: 'mod'
};
