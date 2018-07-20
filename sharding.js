const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js');
exports.manager = Manager;
Manager.spawn(2);
