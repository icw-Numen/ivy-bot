const settings = require('../settings.json');
const chalk = require('chalk');
const sql = require('sqlite');
const reactions = require('../reactions.json');

// prints to console once bot successfully runs
module.exports = client => { // eslint-disable-line no-unused-vars
  // this is sent to cmd/whatever is the console
  // this wont appear if you put it outside ready event since the
  // bot doesnt load instantly
  console.log(chalk.bgGreen('I\'m online, master! Maid bot Ivy at your service!'));
  client.user.setActivity(`with... It's a secret~ | ${settings.prefix}help`);  
  sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)');
  sql.run('CREATE TABLE IF NOT EXISTS channels (guildId TEXT, welcome TEXT, goodbye TEXT, modlog TEXT, autorole TEXT, muted TEXT)');
  const avatarLink = reactions.normal2;
  client.user.setAvatar(avatarLink).catch(() => {return;});
};
