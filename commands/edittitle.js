const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      editTile(row, message, args);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        editTile(r.ops[0], message, args);
        return;
      });
    }
  });
};


// Helper method
function editTile(row, message, args) {
  let str;

  if (row['cards'].length === 0) {
    return message.channel.send(`Oops, it seems you don\'t have any custom cards, ${message.author.username}`);
  }

  const cards = row['cards'];

  if (args.length === 0) {
    return message.channel.send(`Please specify a custom card, ${message.author.username}`);
  } else {
    let fieldTitle;
    const cardTitle = args[0];

    const card = cards.find(function(element) {
      return element.title === cardTitle;
    });

    if (!card) {
      return message.channel.send(`Please specify a valid custom card, ${message.author.username}`);
    }

    if (args.slice(2, args.length).length > 1) {
      return message.channel.send(`Please give a valid title for your card, ${message.author.username}. Titles cannot contain spaces, but other characters are fine`).catch(console.error);
    }

    const fieldIndex =  card.fields.findIndex(field => {
      return field.title === args[1];
    });

    if (args[1] === 'title') {
      fieldTitle = args[2];
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $set: { 'cards.$.title': fieldTitle } }).catch(error => console.log(error));
      str = `I\'ve updated your custom card\'s title to **${fieldTitle}**, ${message.author.username}`;
    } else
    if (fieldIndex >= 0) {
      fieldTitle = args[2];
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $set: { ['cards.$.fields.' + fieldIndex + '.title']: fieldTitle} }).catch(error => console.log(error));
      str = `I\'ve updated your custom card entry with the new title **${fieldTitle}**, ${message.author.username}`;
    } else
    if (fieldIndex < 0) {
      if (card.fields.length === 15) {
        return message.channel.send(`Oops, looks like you can\'t create any more entries, ${message.author.username}`);
      }

      fieldTitle = args[1];
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $push: { 'cards.$.fields': {title: fieldTitle, body: ''} } }).catch(error => console.log(error));
      str = `I\'ve created a new entry with the title **${fieldTitle}** for your custom card, ${message.author.username}`;
    }
  }

  var embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Custom card update successful~')
    .setThumbnail(reactions.wink1)
    .setDescription(str);

  return message.channel.send({embed});
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addtitle'],
  permLevel: 0
};

exports.help = {
  name: 'edittitle',
  description: 'Edits the title of an entry/field of the specified card. If the entry/field title does not exist, a new entry/field will be created',
  usage: 'edittitle <card title> <title/field title> <new card title/new field title>',
  type: 'custom card'
};
