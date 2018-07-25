const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  if (args.length === 0) {
    return message.channel.send(`Please give me a title for your custom card, ${user.username}`).catch(console.error);
  }

  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      makeCard(row, message, args);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        makeCard(r.ops[0], message, args);
        return;
      });
    }
  });
};


// Helper method
function makeCard(row, message, args) {
  const user = message.author;
  const cost = 600;
  var cardtemplate = {
    title: args.join(' '),
    description: '',
    fields: [],
    thumbnail: ''
  };

  if (args.length === 0 || args.length > 1) {
    return message.channel.send(`Please give a valid title for your card, ${user.username}. Titles cannot contain spaces, but other characters are fine`).catch(console.error);
  }

  const count = row['cards'].length;
  let dupe;

  if (count > 0) {
    dupe = row['cards'].find(function(element) {
      return element.title === args.join(' ');
    });
  }

  if (dupe) {
    return message.channel.send(`You\'ve already created a custom card with that title, ${user.username}`).catch(console.error);
  }

  if (count === 0) {
    main.scores.update({ userId: message.author.id }, { $push: { cards: cardtemplate } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Custom card creation successful~')
      .setThumbnail(reactions.closedeyes)
      .setDescription(`Alright! I\'ve created a card titled **${args.join(' ')}** for you, ${user.username}.\nThis one\'s on the house, but keep in mind that next ones will cost **\$${cost}**\n\nYou can check how many lists you have with \`${settings.prefix}mystats\``);
    return message.channel.send({embed});
  } else
  if (count !== 0 && row['credits'] < cost && count < 3) {
    return message.channel.send(`It seems you don\'t have enough credits to create a new custom card, ${user.username}.\nAlso, creating a new card costs **\$${cost}**`).catch(console.error);
  } else
  if (count !== 0 && row['credits'] >= cost && count < 3) {
    main.scores.update({ userId: message.author.id }, { $inc: { credits: (-cost) }, $push: { cards: cardtemplate }}).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Custom card creation successful~')
      .setThumbnail(reactions.closedeyes)
      .setDescription(`Alright! I\'ve created a card titled **${args.join(' ')}** for you, ${user.username}. That would be **\$${cost}**~\n\nYou can check how many lists you have with \`${settings.prefix}mystats\``);
    return message.channel.send({embed});
  } else
  if (count === 3) {
    return message.channel.send(`Oops, looks like you can\'t create any more custom cards, ${message.author.username}`);
  }
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['makecard'],
  permLevel: 0
};

exports.help = {
  name: 'createcard',
  description: 'Allows you to create a custom card that contains a list of anything you can put in it. Each entry in the card has a tile and a description.\nA card can hold 15 entries total.\nYou begin with only one card, but you can unlock more card slots with your earned credits/money (3 max. First one\'s on the house~)',
  usage: 'createcard <card title>',
  type: 'custom card'
};
