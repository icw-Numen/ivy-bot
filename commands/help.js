const settings = require('../settings.json');
const {RichEmbed} = require('discord.js');
const package = require('../package.json');
const reactions = require('../reactions.json');

exports.run = (client, message, args) => {
  if (!args[0]) {
    const mp = client.commands;
    const botS = '\`~' + mp.filter(c => c.help.type === 'bot').map(c => `${c.help.name}\``).join(',  \`~');
    const funS = '\`~' + mp.filter(c => c.help.type === 'fun').map(c => `${c.help.name}\``).join(',  \`~');
    const memeS = '\`~' + mp.filter(c => c.help.type === 'meme').map(c => `${c.help.name}\``).join(',  \`~');
    const serverS = '\`~' + mp.filter(c => c.help.type === 'server').map(c => `${c.help.name}\``).join(',  \`~');
    const modS = '\`~' + mp.filter(c => c.help.type === 'mod').map(c => `${c.help.name}\``).join(',  \`~');
    const musicS = '\`~' + mp.filter(c => c.help.type === 'music').map(c => `${c.help.name}\``).join(',  \`~');
    const pointS = '\`~' + mp.filter(c => c.help.type === 'level/credits system').map(c => `${c.help.name}\``).join(',  \`~');
    const devS = '\`~' + mp.filter(c => c.help.type === 'dev').map(c => `${c.help.name}\``).join(',  \`~');
    const utilS = '\`~' + mp.filter(c => c.help.type === 'utilities').map(c => `${c.help.name}\``).join(',  \`~');
    const cardS = '\`~' + mp.filter(c => c.help.type === 'custom card').map(c => `${c.help.name}\``).join(',  \`~');
    const lewdS = '\`~' + mp.filter(c => c.help.type === 'lewd').map(c => `${c.help.name}\``).join(',  \`~');

    const tip = `Use \`${settings.prefix}help <commandname>\` for details, including aliases (these are basically alternate names for each command).\n\nYou can also use my name as the prefix if you wish (like this: \`${settings.prefix2}help\`). Pinging me works fine too (like this: \`@${client.user.username} help\`).`;

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setThumbnail(reactions.wink1)
      .setTitle('Command List~')
      .setDescription(` \n\n~~demon~~ maid ${client.user.username} to the rescue :9\n\n${tip}\n\nAs of now, there are **${client.commands.size}** commands in total`)
      .addField('Bot Commands:', `${botS}`)
      .addField('Useful Commands:', `${utilS}`)
      .addField('Fun Commands:', `${funS}`)
      .addField('Music Commands:', `${musicS}`)
      .addField('Moderation Commands:', `${modS}`)
      .addField('Server Commands:', `${serverS}`)
      .addField('Custom Card Commands:', `${cardS}`)
      .addField('Level/credits System Commands:', `${pointS}`)
      .addField('Meme Commands:', `${memeS}`)
      .addField('Developer Commands:', `${devS}`)
      .addField('Lewd, 🔞 Commands:', `${lewdS}`)
      .setFooter(`Bot and icons/art made with care by ${package.author}`);
    return message.channel.send({embed});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      const embed = new RichEmbed()
        .setColor(0xF18E8E)
        .setThumbnail(reactions.wink1)
        .setTitle(`Command Name: ${command.help.name}`)
        .setDescription(`Here\'s all you need to know about \`${settings.prefix}${command.help.name}\`, ${message.author.username} :9`)
        .addField('Description:', `${command.help.description}`)
        .addField('Usage:', `\`${settings.prefix}${command.help.usage}\``)
        .addField('Alias(es):', `\`${command.conf.aliases.join('\`, \`')}\``)
        .addField('Category:', `\`${command.help.type}\``)
        .setFooter(`Bot and icons/art made with care by ${package.author}`);
      return message.channel.send({embed});
    } else {
      return message.channel.send(`Oops, I couldn\'t find that command, ${message.author.username}`).catch(console.error);
    }
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands. Typing a command after "help" gives that command\'s details',
  usage: 'help <command/url>',
  type: 'bot'
};
