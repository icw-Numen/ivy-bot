const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js', {respawn: false, token: process.env.TOKEN});
exports.manager = Manager;
Manager.spawn();
