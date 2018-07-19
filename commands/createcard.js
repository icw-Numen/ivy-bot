const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');

exports.run = async (client, message, args) => {
  if (args.length === 0) {
    return message.channel.send(`Please give me a title for your custom card, ${user.username}`).catch(console.error);
  }
  
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      makeCard(row, message, args);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null, lewd: '', cards: new Map()}, function (error) {
        if (error) return console.log(err);
        makeCard(row, message, args);
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
    description: '',
    fields: [],
    thumbnail: ''
  };

  if (row['cards'].length === 0) {
    main.scores.update({ userId:user.id }, { $set: { cards: row['cards'].set(args.join(' '), cardtemplate)} }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Custom card creation successful~')
      .setThumbnail(reactions.closedeyes)
      .setDescription(`Alright! I\'ve created a card titled **${args.join(' ')}** for you, ${user.username}.\nThis one\'s on the house, but keep in mind that next ones will cost **\$${cost}**`);
    return message.channel.send({embed});
  } else
  if (row['cards'].length !== 0 && row['credits'] < cost) {
    return message.channel.send(`It seems you don\'t have enough credits to create a new custom card, ${user.username}.\nAlso, creating a new card costs **\$${cost}**`).catch(console.error);
  } else
  if (row['cards'].length !== 0 && row['credits'] >= cost) {
    main.scores.update({ userId:user.id }, { $set: { cards: row['cards'].set(args.join(' '), cardtemplate), credits: (row['credits'] - cost) } }).catch(error => console.log(error));
    const embed = new RichEmbed()
      .setColor(0xF18E8E)
      .setTitle('Custom card creation successful~')
      .setThumbnail(reactions.closedeyes)
      .setDescription(`Alright! I\'ve created a card titled **${args.join(' ')}** for you, ${user.username}. That would be **\$600**~`);
    return message.channel.send({embed});
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
  description: 'Allows you to create a custom card that contains a list of anything you can put in it. Each entry in the card has a tile and a description.\nA card can hold 15 entries total.\nYou begin with only one card, but you can unlock more card slots with your earned credits/money (3 max.)',
  usage: 'createcard <card title>',
  type: 'custom card'
};
