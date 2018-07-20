const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const Danbooru = require('danbooru');

exports.run = (client, message, args) => {
  if (args.length === 0) {
    return message.channel.send(`Please give me at least one tag, ${message.author.username}`).catch(console.error);
  }
  if (args.length > 2) {
    return message.channel.send(`Please give me no more than two tags, ${message.author.username}`).catch(console.error);
  }

  const booru = new Danbooru();
  booru.posts({ tags: args[0] + ' ' + args[1] }).then(posts => {
    const index = Math.floor(Math.random() * posts.length);
    const post = posts[index];


    const url = booru.url(post.large_file_url);
    const link = url.href;

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Bringing the lewds~')
      .setThumbnail(reactions.smug2)
      .setImage(post.large_file_url)
      .setURL(link)
      .setDescription(`Browsing Danbooru for some goodies with tags **${args[0]}** and **${args[0]}**, ${message.author.username}~`);
    if (message.channel.nsfw) {
      message.channel.send({embed});
    } else {
      return message.channel.send(`Ah~ We can\'t do lewd things here, ${message.author.username}~`).catch(console.error);
    }
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['luds', 'l00ds', 'lewds', 'postlewds'],
  permLevel: 0
};

exports.help = {
  name: 'danbooru',
  description: 'Searches a random, totally not lewd image on Danbooru ( ͡° ͜ʖ ͡°)\nYou can search up to two tags at once',
  usage: 'danbooru <tag_1> <tag_2>',
  type: 'lewd'
};
