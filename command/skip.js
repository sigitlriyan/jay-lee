exports.run= async(bot,message,args)=>{
 let serverQueue = bot.queue.get(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
        if (!serverQueue) return message.channel.send("There is nothing playing that I could **\`skip\`** for you.");
        serverQueue.connection.dispatcher.end("Skip command has been used!");
        return message.channel.send("⏭️  **|**  Skip command has been used!");
}
exports.help={
  name:"skip"
}