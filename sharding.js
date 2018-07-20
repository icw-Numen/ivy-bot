const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('./app.js', {token: process.env.TOKEN, autoSpawn: true});
exports.manager = Manager;
Manager.spawn(2);

Manager.on('launch', shard => console.log(`Shard ${shard.id}/${shard.manager.totalShards} loaded`));
