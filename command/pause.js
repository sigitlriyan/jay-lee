exports.run=async(bot, message, args)=>{
  let serverQueue=bot.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send("⏸  **|**  Paused the music for you!");
        }
        return message.channel.send("There is nothing playing.");
}
exports.help={
  name:"pause"
}