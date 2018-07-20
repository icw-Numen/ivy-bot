const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js', {token: process.env.TOKEN});
exports.manager = Manager;
Manager.spawn();
