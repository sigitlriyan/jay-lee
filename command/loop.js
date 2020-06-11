exports.run=async(bot,message,args)=>{
  let serverQueue = bot.queue.get(message.guild.id);   
  if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send(`:repeat: **|** Loop ${serverQueue.loop === true ? "enabled" : "disabled"}!`);
        };
        return message.channel.send("There is nothing playing.");
    
}
exports.help={
  name:"loop"
}