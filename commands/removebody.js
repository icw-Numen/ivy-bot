const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  const user = message.author;

  main.scores.findOne({ userId : { $eq: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      deleteEntry(row, message, args);
    } else {
      main.scores.insertOne({userId: message.author.id, exp: 1, level: 0, credits: 0, claimed: null, lewd: '', cards: []}, function (error, r) {
        if (error) return console.log(error);
        deleteEntry(r.ops[0], message, args);
        return;
      });
    }
  });
};


// Helper method
function deleteEntry(row, message, args) {
  let str;

  if (row['cards'].length === 0) {
    return message.channel.send(`Oops, it seems you don\'t have any custom cards, ${message.author.username}`);
  }

  const cards = row['cards'];

  if (args.length === 0) {
    return message.channel.send(`Please specify a custom card, ${message.author.username}`);
  } else {
    let fieldTitle;

    const card = cards.find(function(element) {
      return element.title === args[0];
    });

    if (!card) {
      return message.channel.send(`Please specify a valid custom card, ${message.author.username}`);
    }

    const fieldIndex =  card.fields.findIndex(field => {
      return field.title === args[1];
    });

    let field;
    if (fieldIndex >= 0) {
      field = card.fields[fieldIndex];
    }


    if (args.length === 1) {
      main.scores.update({ userId: message.author.id }, { $pull: { 'cards': {title: args[0]} } }).catch(error => console.log(error));
      str = `I\'ve deleted your custom card with the title **${args[0]}**, ${message.author.username}`;
    } else
    if (args[1] === 'purge') {
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $set: { 'cards.$.fields': [] } }).catch(error => console.log(error));
      str = `I\'ve removed all entries from your custom card with the title **${args[0]}**, ${message.author.username}`;
    } else
    if (fieldIndex >= 0) {
      fieldTitle = field.title;
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $pull: { 'cards.$.fields': {title: fieldTitle}} }).catch(error => console.log(error));
      str = `I\'ve delete the entry with the title **${fieldTitle}**, ${message.author.username}`;
    } else
    if (fieldIndex < 0) {
      return message.channel.send(`Oops, it appears that there\'s no entry with the title **${args[1]}**, ${message.author.username}`);
    }
  }

  var embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Custom card deletion successful~')
    .setThumbnail(reactions.wink)
    .setDescription(str);

  return message.channel.send({embed});
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['deletecard', 'deleteentry', 'removecard', 'removeentry'],
  permLevel: 0
};

exports.help = {
  name: 'removebody',
  description: 'Deletes an entry/field of the specified card. Typing the card title (and nothing else) will delete the card. Typing "purge" after the card title deletes all entries in the card',
  usage: 'removebody <card title> <purge/field title>',
  type: 'custom card'
};
