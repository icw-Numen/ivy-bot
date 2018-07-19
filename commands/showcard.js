const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      showCard(row, message, args);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        showCard(r.ops[0], message, args);
        return;
      });
    }
  });
};


// Helper method
function showCard(row, message, args) {
  if (row['cards'].length === 0) {
    return message.channel.send(`Oops, it seems you don\'t have any custom cards, ${message.author.username}`);
  }

  const cards = row['cards'];
  let card;
  let title;
  let description;
  let fields;
  let thumbnail;

  if (args.length === 0) {
    card = cards[0];
    title = card.title;
    description = card.description;
    fields =  card.fields;
    thumbnail =  card.thumbnail;
  } else {
    card = cards.find(function(element) {
      return element.title === args.join(' ');
    });

    title = card.title;
    description = card.description;
    fields =  card.fields;
    thumbnail =  card.thumbnail;
  }

  var embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Sending card~')
    .setThumbnail(reactions.closedeyes)
    .setDescription(`Please wait while I load your card, ${message.author.username}`);

  return message.channel.send({embed}).then(m => {
    setTimeout(function() {
      m.delete();
    }, 3500);

    embed = new RichEmbed()
      .setColor(0x36393E)
      .setTitle(title)
      .setThumbnail(thumbnail);

    if (thumbnail.length > 0) {
      embed.setThumbnail(thumbnail);
    }

    if (description.length > 0) {
      embed.setDescription(description);
    } else if ((description.length === 0) && (fields.length === 0)) {
      embed.setDescription('(This card is empty...)');
    }

    if (fields.length > 0) {
      fields.forEach(f => {embed.addField(f.split(' ')[0], f.slice(f.split(' ')[0].length - 1, f.length));});
    }

    message.channel.send({embed});
  });
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['card', 'list', 'showlist', 'customcard'],
  permLevel: 0
};

exports.help = {
  name: 'showcard',
  description: 'Shows a custom card you\'ve created. Passing nothing shows your first card',
  usage: 'showcard <card title>',
  type: 'custom card'
};
