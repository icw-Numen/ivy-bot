const sql = require('sqlite');

module.exports = client => { // eslint-disable-line no-unused-vars
  console.log(`You have been disconnected at ${new Date()}`);
  sql.run('UPDATE scores SET claimed = 0').catch(() => {    
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, exp INTEGER, level INTEGER, credits INTEGER, claimed INTEGER)');
  });
};
