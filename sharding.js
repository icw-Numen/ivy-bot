const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js', {totalShards: 'auto', autoSpawn: true, token: process.env.TOKEN});
exports.manager = Manager;
Manager.spawn();

Manager.on('launch', shard => console.log(`Shard ${shard.id}/${shard.totalShards} loaded`));
