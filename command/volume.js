exports.run= async(bot,message,args)=>{
  let serverQueue = bot.queue.get(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send("I'm sorry but you need to be in a voice channel to play music!");
        if (!serverQueue) return message.channel.send("There is nothing playing.");
        if (!args[0]) return message.channel.send(`The current volume is: **\`${serverQueue.volume}%\`**`);
        if (isNaN(args[0]) || args[0] > 100) return message.channel.send("Volume only can be set in range **1** - **100**.");
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolume(args[0] / 100);
        return message.channel.send(`I set the volume to: **\`${args[0]}%\`**`);

}
exports.help ={
  name:"volume"
}