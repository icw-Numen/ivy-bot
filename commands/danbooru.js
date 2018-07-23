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

  var tag1;
  var tag2;
  var str;
  var reaction;

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

  if ((args[0] === 'succubus'|| args[1] === 'succubus') ||
  (args[0] === 'demon_girl'|| args[1] === 'demon_girl') ||
  (args[0] === 'maid'|| args[1] === 'maid') ||
  (args[0] === 'horns'|| args[1] === 'horns') ||
  (args[0] === 'large_breasts'|| args[1] === 'large_breasts') ||
  (args[0] === 'huge_breasts'|| args[1] === 'huge_breasts') ||
  (args[0] === 'short_hair'|| args[1] === 'short_hair')) {
    str = `Ooh~ You have good taste, ${message.author.username}~`;
    reaction = reactions.wink1;
  }

  const booru = new Danbooru();
  booru.posts({ tags: tag1 + tag2}).then(posts => {
    const index = Math.floor(Math.random() * posts.length);
    const post = posts[index];

    if (!post) {
      // booru.posts({ tags: tag1 + tag2 + ' rating:explicit'}).then(loods => {
      //   const indexx = Math.floor(Math.random() * loods.length);
      //   const lood = loods[indexx];
      //   if (!lood) {
      //     return message.channel.send(`Oops, no lewds to be found here, ${message.author.username}~`).catch(console.error);
      //   }
      //   postLuds(message, booru, lood, reaction, str);
      //   return;
      // });
      return message.channel.send(`Oops, no lewds to be found here, ${message.author.username}~`).catch(console.error);
    }

    postLuds(message, booru, post, reaction, str);
  });
};


// Helper method
function postLuds(message, booru, post, reaction, str) {
  const url = booru.url(post.file_url);
  const link = url.href;
  const lonk = booru.url(post.large_file_url).href;

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Bringing the lewds~')
    .setThumbnail(reaction)
    .setURL(link)
    .setDescription(str);
  if (message.channel.nsfw) {
    message.channel.send({embed}).then(() => {
      message.channel.send(`${lonk}`);
    });
  } else {
    return message.channel.send(`Ah~ We can\'t do lewd things here, ${message.author.username}~`).catch(console.error);
  }
}
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
