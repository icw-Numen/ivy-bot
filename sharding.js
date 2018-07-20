const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js', {respawn: true, token: process.env.TOKEN});
Manager.spawn();
