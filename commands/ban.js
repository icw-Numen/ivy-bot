const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
const main = require('../app.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`Please mention someone so I can ban them for you, ${message.author.username}`).catch(console.error);
  if (!parseUser(message, user)) return;
  if (!user.bannable || message.guild.member(client.user).permissions < user.permissions) {
    return message.channel.send(`Oops, looks like I can\'t ban ${user.username}, ${message.author.username}`).catch(console.error);
  }

  const guild = message.guild;
  main.guildsettings.findOne({ guildId : { $eq: guild.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      hammer(row, message, args, guild, client, user);
    } else {
      main.guildsettings.insertOne({ guildId: guild.id, welcome: '', goodbye: '', modlog: '', autorole: '', nsfw: [], queue: [] }, function (error, r) {
        if (error) return console.log(error);
        hammer(r.ops[0], message, args, guild, client, user);
        return;
      });
    }
  });
};


// Helper method
function hammer(row, message, args, guild, client, user) {
  const modlog = guild.channels.find('name', row['modlog']);

  caseNumber(client, modlog).then(num => {
    const reason = args.splice(1, args.length).join(' ') || 'No reason';
    let str;
    if (modlog) {
      str = `**${user.username}** has been ~~consumed~~ dealt with swiftly, ${message.author.username}. For more details, check #${modlog.name}`;
    } else {
      str = `**${user.username}** has been ~~consumed~~ dealt with swiftly, ${message.author.username}`;
    }

    if (!user.bot) user.send(`You have been banned for: ${reason}`);

    let embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Ban successful~')
      .setThumbnail(reactions.wink1)
      .setDescription(str);
    message.channel.send({embed});

    message.guild.ban(user, 7);

    if (modlog) {
      embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setTimestamp()
        .setDescription(`**Action:** Ban\n**Target:** ${user.tag} (User ID: ${user.id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}\n\n(Tip: Use \`${settings.prefix}reason <case number> <reason>\` to set a reason for this action)`)
        .setFooter(`Case ${num}`);
      return client.channels.get(modlog.id).send({embed});
    }
  });
}


// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hammer'],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user',
  usage: 'ban <mention> <reason>',
  type: 'mod'
};
