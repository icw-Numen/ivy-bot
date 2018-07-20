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

  let tag1;
  let tag2;
  let str;
  let reaction;

  if (args.length === 2) {
    tag1 = args[0];
    tag2 = ' ' + args[1];
    str = `Browsing Danbooru for some goodies with the tags **${args[0]}** and **${args[1]}**, ${message.author.username}~`;
    reaction = reactions.smug2;
  }
  else {
    tag1 = args[0];
    tag2 = '';
    str = `Browsing Danbooru for some goodies with the tag **${args[0]}**, ${message.author.username}~`;
    reaction = reactions.smug2;
  }

  if (args[0] === 'succubus'|| args[1] === 'succubus') {
    str = `You have good taste, ${message.author.username}~`;
    reaction = reactions.wink1;
  }

  const booru = new Danbooru();
  booru.posts({ tags: tag1 + tag2 }).then(posts => {
    const index = Math.floor(Math.random() * posts.length);
    const post = posts[index];

    if (!post) {
      return message.channel.send(`Oops, no lewds to be found here, ${message.author.username}~`).catch(console.error);
    }

    const url = booru.url(post.file_url);
    const link = url.href;

    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Bringing the lewds~')
      .setThumbnail(reaction)
      .setImage(post.file_url)
      .setURL(link)
      .setDescription(str);
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
  aliases: ['luds', 'l00ds', 'lewds', 'postlewds', 'nsfw', 'nudes'],
  permLevel: 0
};

exports.help = {
  name: 'danbooru',
  description: 'Searches a random, totally not lewd image on Danbooru ( ͡° ͜ʖ ͡°)\nYou can search up to two tags at once (in the same way you would on Danbooru)',
  usage: 'danbooru <tag_1> <tag_2>',
  type: 'lewd'
};
