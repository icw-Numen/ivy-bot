const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('./app.js', {token: process.env.TOKEN});
exports.manager = Manager;
Manager.spawn();

Manager.on('launch', shard => {
  console.log(`Shard ${shard.id}/${shard.manager.totalShards} loaded`);
});

process.on('exit', function() {
  console.log('See you later, master~');
  Manager.broadcastEval('process.exit()');
});
