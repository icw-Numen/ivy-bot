const {RichEmbed} = require('discord.js');
const settings = require('../settings.json');
const package = require('../package.json');
//const sharding = require('../sharding.js');
//const imgs = require('../imgs.json');

exports.run = async (client, message) => {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`Ivy, ${package.description}`)
    //.setImage(imgs.splash)
    .setThumbnail(`${client.user.avatarURL}`)
    .setDescription(`${settings.description}\n\n (Psst! For command details, type \`${settings.prefix}help\` or \`${settings.prefix}help <commandname>\`. The prefix \`${settings.prefix2}\` is fine too if you prefer calling me by my name~ Pinging me with a command works just as fine)`)
    .addField('Prefix(es):', `\`${settings.prefix}\`,   \`${settings.prefix2}\`,   \`${settings.prefix3}\``, true)
    .addField('Bot\'s version:', `${package.version}`, true)
    .addField('Program language:', 'Javascript', true)
    .addField('Library:', 'Discord.js', true)
    .addField('Engine:', 'Node.js', true)
    .addField('Database:', 'mLab MongoDB', true)
    .addField('Deployed on:', 'Heroku', true)
    .addField('# of servers joined:', `${client.guilds.size}`, true)
    .addField('# of users:', `${client.users.size}`, true)
    .addField('Support server:', 'https://discord.gg/HVh7QcV', true)
    .addField('Ivy\'s website:', 'https://icw-numen.github.io/ivy-bot/')
    .addField('Ivy icons/art:', 'https://sta.sh/21qy8xqbpkxm')
    .setFooter(`Bot and icons/art made with care by ${package.author}`);
  message.channel.send({embed});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['intro', 'botinfo', 'ivyinfo', 'bot', 'ivy', 'about', 'features'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Sends an embed with information about the bot',
  usage: 'info',
  type: 'bot'
};
