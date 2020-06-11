const db = require("quick.db");
const {MessageEmbed} = require ("discord.js")
exports.run= async (bot, message, args)=>{
  
  let uwu = new MessageEmbed()
  .setTitle("pengaturan Welcome")
  .addField("turn on/off welcome",`\`\`\`untuk mengaktifkan welcome gunakan\n Vwelcome enable atau disable\`\`\``,true)
  .addField("change Background",`\`\`\`untuk mengganti background gunakan command \n Vwelcome BG <link gambar>\`\`\``,true)
  .addField("Set Channel",`\`\`\`untuk menentukan channel gunakan command \n Vwelcome set <#channel yg dituju>\`\`\``,true)
  .addField("test welcome",`\`\`\`untuk mencoba test welcome gunakan \n Vtest\`\`\``,true)
  .addField("Description welcome",`\`\`\`untuk mencoba test welcome gunakan \n Vwelcome description/des <masukan description nya>\n
{members} = jumlah member di guild \n{user} = nama user \n{guild} = nama guild\`\`\``,true)
  .setTimestamp()
  .setColor("RANDOM")
  
  
   const argumen = args[0];
  if(!argumen){
    message.channel.send(uwu);
  }
      else if (argumen.toLowerCase() === "enable") {
        message.channel.send(`Enable`);
        db.set(`${message.guild.id}.Config.Welcome.ED`, "YA");
      } else if (argumen.toLowerCase() === "disable") {
        message.channel.send(`Disable`);
        db.set(`${message.guild.id}.Config.Welcome.ED`, "TIDAK");
      } 
      
      else if (argumen.toLowerCase() === "set") {
        let Channel = message.mentions.channels.first();
        if (!Channel) {
          message.channel.send(`Channel??`);
        } else {
          message.channel.send(`Channel: ${Channel}`);
          db.set(`${message.guild.id}.Config.Welcome.Channel`, Channel.id);
        }
      } 
      
      else if (
        argumen.toUpperCase() === "MESSAGE" ||
        argumen.toUpperCase() === "MSG"
      ) {
        let Message = args.slice(1).join(" ");
        if (Message.length > 34) {
          message.channel.send(`Message??`);
        } else {
          message.channel.send(`Message: ${Message}`);
          db.set(`${message.guild.id}.Config.Welcome.Message`, Message);
        }
      } else if (
        argumen.toUpperCase() === "BACKGROUND" ||
        argumen.toUpperCase() === "BG"
      ) {
        let Background = args.slice(1).join(" ");
        if (!Background) {
          message.channel.send(`Background??`);
        } else {
          message.channel.send(`Background: ${Background}`);
          db.set(`${message.guild.id}.Config.Welcome.Background`, Background);
        }
      }
  
 else if (
        argumen.toLowerCase() === "description" ||
        argumen.toLowerCase() === "des"
      ) {
        let description = args.slice(1).join(" ");
 
   if (description.length > 300) {
          message.channel.send(`Message??`);
        } else {
          message.channel.send(`Description: ${description}`);
          db.set(`${message.guild.id}.Config.Welcome.Description`, description);
        }
 }

}
exports.help= {
  name:"welcome"
}