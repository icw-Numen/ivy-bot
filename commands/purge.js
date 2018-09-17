exports.run = (client, message, args) => {
  if (!(message.author.hasPermission('ADMINISTRATOR') || message.author.hasPermission('MANAGE_MESSAGES'))) {
    return message.channel.send(`No deleting without permission, ${message.author.username} >:T`).catch(console.error);
  }

  const messageCount = parseInt(args.join(' '));
  const arg = args.join(' ');
  if (!arg.match(/bot/i) && args.length !== 0
  && !parseInt(args.join(' '))) return message.channel.send(`Please give me a valid input, ${message.author.username}`).catch(console.error);

  const bot = message.guild.member(client.user);

  if (!bot.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send(`It seems I don\'t have the correct permissions to delete messages, ${message.author.username}`).catch(console.error);
  }

  if (arg.match(/bot/i)) {
    return message.channel.fetchMessages({limit: messageCount}).then(messages => {
      messages = messages.filter(message => message.author.bot);
      message.channel.bulkDelete(messages).catch(error => function() {
        return message.channel.send(`${error}`).catch(console.error);
      });
    });
  }

  return message.channel.fetchMessages({limit: messageCount})
    .then(messages => {
      if (arg.match(/bot/i)) {
        messages = messages.filter(message => message.author.bot);
      }
      message.channel.bulkDelete(messages).catch(error => function() {
        return message.channel.send(`${error}`).catch(console.error);
      });
    });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['obliterate', 'delete', 'deletemsg', 'killwithfire', 'killitwithfire', 'burn'],

  //this means only mods (permLevel 2) or higher can use this command
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges <number> amount of messages under 14 days old from a given channel. Clears last 100 messages if no <number> is given. Include "bot" to delete bot messages only',
  usage: 'purge <number> <bot>',
  type: 'mod'
};
