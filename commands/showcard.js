const main = require('../app.js');
const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
  const user = message.author;

  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
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
      return element.title === args[0];
    });

    if (!card) {
      return message.channel.send(`Please specify a valid custom card, ${message.author.username}`);
    }

    title = card.title;
    description = card.description;
    fields =  card.fields;
    thumbnail =  card.thumbnail;
  }

  if (args.length === 2) {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setThumbnail(thumbnail)
      .setAuthor(message.author.username, message.author.avatarURL);

    if (thumbnail.length > 0) {
      embed.setThumbnail(thumbnail);
    }

    if (fields.length > 0) {
      const field = fields.find(function(element) {
        return element.title = args[1];
      });

      if (field) {
        embed.addField(field.title, field.body, true);
      } else {
        return message.channel.send(`Looks like there are no entries with the title **${args[1]}** in this custom card, ${message.author.username}`);
      }

    } else {
      return message.channel.send(`Oops, there are no entries in this custom card, ${message.author.username}`);
    }

    message.channel.send({embed});
  } else {
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle(title)
      .setThumbnail(thumbnail)
      .setAuthor(message.author.username, message.author.avatarURL);

    if (thumbnail.length > 0) {
      embed.setThumbnail(thumbnail);
    }

    if (description.length > 0) {
      embed.setDescription(description);
    } else if ((description.length === 0) && (fields.length === 0)) {
      embed.setDescription('(This card is empty...)');
    }

    if (fields.length > 0) {
      fields.forEach(f => {
        if (f.body.length > 0) {
          embed.addField(f.title, f.body, true);
        } else {
          embed.addField(f.title, '(This field is empty...)', true);
        }
      });
    }

    message.channel.send({embed});
  }
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
  description: 'Shows a custom card you\'ve created. Passing nothing shows your first card. Passing an entry/field title after the card name will show a card with just that entry',
  usage: 'showcard <card title> <entry>',
  type: 'custom card'
};
