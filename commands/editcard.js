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
  let str;

  if (row['cards'].length === 0) {
    return message.channel.send(`Oops, it seems you don\'t have any custom cards, ${message.author.username}`);
  }

  const cards = row['cards'];

  if (args.length === 0) {
    return message.channel.send(`Please specify a custom card, ${message.author.username}`);
  } else {
    let fieldTitle;
    let fieldBody;

    const card = cards.find(function(element) {
      return element.title === args[0];
    });

    if (!card) {
      return message.channel.send(`Please specify a valid custom card, ${message.author.username}`);
    }

    const field =  card.fields.find(field => {
      return field.title === args[1].slice(0, args.length - 1);
    });

    if (args[1] === 'description') {
      const description = args.slice(2, args.length).join(' ');
      console.log(description);
      main.scores.update({ userId: message.author.id, 'cards.title': args[0] }, { $set: { 'cards.$.description': description } }).catch(error => console.log(error));
      str = `Updated custom card description successfully, ${message.author.username}`;
    } else
    if (field) {
      fieldTitle = field.title;
      fieldBody =  args.join(' ').slice((args[0].length + args[1].length), args.length);
      main.scores.update({ userId: message.author.id, 'cards.fields.title': fieldTitle }, { $set: { 'cards.fields.$.body': fieldBody} }).catch(error => console.log(error));
      str = `Updated custom card field body successfully, ${message.author.username}`;
    } else
    if (!field) {
      fieldTitle = args[1].slice(0, args.length - 1);
      fieldBody = args.join(' ').slice((args[0].length + args[1].length), args.length);
      main.scores.update({ userId: message.author.id }, { $push: { 'cards.fields': {title: fieldTitle, body: fieldBody} } }).catch(error => console.log(error));
      str = `Created custom card field successfully, ${message.author.username}`;
    }
  }

  var embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle('Updated card~')
    .setThumbnail(reactions.wink)
    .setDescription(str);

  return message.channel.send({embed});
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addfield', 'editfield', 'editentry', 'editlist'],
  permLevel: 0
};

exports.help = {
  name: 'editcard',
  description: 'Edits the contents of the specified card. If no description or entries/fields were set, new ones will be created',
  usage: 'editcard <card title> <description/(field title: new field value)>',
  type: 'custom card'
};
