const {MessageEmbed} = require ("discord.js");
exports.run=async(bot, message, args)=>{
  let serverQueue = bot.queue.get(message.guild.id); 
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  let wew = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`
__**Song Queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
        `)
  .setFooter(`Now Playing: ${serverQueue.songs[0].title}`)
  .setTitle("keep chill and feel your music")
  
     message.channel.send(wew);
}
exports.help={
  name:"queue"
}