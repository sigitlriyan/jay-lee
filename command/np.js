exports.run=async(bot, message, args)=>{
  let serverQueue = bot.queue.get(message.guild.id); 
  if (!serverQueue) return message.channel.send("There is nothing playing.");
        return message.channel.send(`🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`);

}
exports.help ={
  name:"np"
}