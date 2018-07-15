const settings = require ('../settings.json');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if (message.mentions.users.size < 1) return message.channel.send(`Please ping someone so I can change their nickname for you, ${message.author.username}`).catch(console.error);

  if (!message.member.hasPermission('MANAGE_NICKNAMES') ||
  !message.member.hasPermission('CHANGE_NICKNAME')) {
    return message.channel.send(`Oops, it seems you don\'t have the permissions to change nicknames, ${message.author.username}`).catch(console.error);
  }

  const user = message.mentions.users.first();
  const oldNick = user.username.slice();
  const newNick = args.splice(1, args.length).join(' ');

  const bot = message.guild.member(client.user);
  if (!bot.hasPermission('MANAGE_NICKNAMES') ||
  !bot.hasPermission('CHANGE_NICKNAME') ||
  bot.permissions < user.permissions) {
    return message.channel.send(`Oops, it seems I don\'t have the permissions to change nicknames, ${message.author.username}`).catch(console.error);
  }

  let str;
  let str2;
  let thumb;

  if ((newNick.match(/ivy/i) && newNick.length === 3 && user.bot && user.tag === `${settings.bottag}`) ||
  (user.bot && user.username.includes('Ivy') && newNick.length === 0)) {
    message.guild.member(user).setNickname(newNick);
    str = `Ufufu~ I see nothing beats my original name after all, ${message.author.username}`;
    str2 = 'New nickname set~';
    thumb = reactions.wink1;
  } else
  if (user.bot && user.tag === `${settings.bottag}` && newNick.match(/cow/i) && newNick.length === 3) {
    message.guild.member(user).setNickname(newNick);
    str = `I ain\'t no cow, ${message.author.username}! >:T`;
    str2 = 'New nickname-- Hey, wait a minute!';
    thumb = reactions.pout;
  } else
  if (user.bot && user.tag === `${settings.bottag}`) {
    message.guild.member(user).setNickname(newNick);
    str = `Eeeh?! A new nickname for me? Thank you, ${message.author.username}! I'll cherish it forever~`;
    str2 = 'New nickname set~';
    thumb = reactions.closedeyes;
  }
  else {
    message.guild.member(user).setNickname(newNick);
    str = `${oldNick}'s nickname's now ${newNick}, ${message.author.username}!`;
    str2 = 'New nickname set~';
    thumb = reactions.wink;
  }

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(str2)
    .setThumbnail(thumb)
    .setDescription(str);
  message.channel.send({embed});


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setnick', 'setnickname', 'setname', 'newnick', 'newnickname'],
  permLevel: 0
};

exports.help = {
  name: 'nickname',
  description: 'Changes the user\'s nickname. You can change the my nickname too (I have special lines for when you give me some specific nicknames). Typing nothing resets the nickname',
  usage: 'nickname <mention> <nickname>',
  type: 'utilities'
};
