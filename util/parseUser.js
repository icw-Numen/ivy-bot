// this is to check is the user is valid to use ban/kick on, for example
exports.parseUser = (message, user) => {
  const member = message.guild.member(user) || null;

  if (user.id === message.author.id) {
    message.channel.send('Ah! You can\'t do that to yourself...');
    return null;
  } else
  if (member) {
    if (member.highestRole.position >= message.member.highestRole.position) {
      message.channel.send(`It seems that the target member has a higher or equal role position than you, ${message.author.username}`);
      return null;
    }
  }

  return member;
};
