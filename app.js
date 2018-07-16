// DEPENDENCIES

const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
exports.scores;
exports.guildsettings;

const mongodb = require('mongodb');
const uri = process.env.MONGODB_URI;
mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err) throw err;

  const db = client.db('ivy-bot-db');

  exports.scores = db.collection('scores');
  exports.guildsettings = db.collection('guildsettings');
});


exports.talkedRecently = new Set();

//for music queue
exports.servers = {};

//for game sessions (WIP)
exports.serversR = {};


require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.cmdsByType = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  if (message.guild.member(client.user).hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) permlvl = 2;
  if (message.guild.member(client.user).hasPermission('ADMINISTRATOR')) permlvl = 3;
  if (message.author.id === process.env.OWNERID) permlvl = 4;
  return permlvl;
};

client.on('warn', e => {
  console.log(chalk.bgYellow(e));
});

client.on('error', e => {
  console.log(chalk.bgRed(e));
});

client.login(process.env.TOKEN);
