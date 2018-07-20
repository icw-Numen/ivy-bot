const Discord = require('discord.js');
exports.manager = new Discord.ShardingManager('./app.js');
exports.manager.spawn(1);
