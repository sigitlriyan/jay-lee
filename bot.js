const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const db = require ("quick.db");
const superagent = require ("superagent");
const {get} = require ("snekfetch");
const fetch = require ("node-fetch")
const {Canvas} = require ("canvas-constructor");
const OrangeJuice= ("https://cdn.glitch.com/40633fd1-ed9f-4e52-8f7c-9d4487b3f903%2FOrangeJuice.otf?v=1591720993660");

// const dotenv = require("dotenv").config();
require("./server.js");

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.PREFIX;


const bot = new Client({disablemantion:"everyone"});


const queue = new Map();
bot.queue = queue;
bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => console.log(`${bot.user.tag} has been successfully turned on!`));
bot.on("shardDisconnect", (event, id) => console.log(`Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect!`));
bot.on("shardReconnecting", (id) => console.log(`Shard ${id} reconnecting...`));

bot.on("message", async (message) => { // eslint-disable-line
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
  
   const pesan = message.content.toLowerCase();
  const sender = message.author;
  let args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  let author = message.author.username; 
  try {
    let commandFile = require(`./command/${cmd}.js`);
    commandFile.run(bot, message, args);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(`${author}|${message.guild.name}  menggunakan ${cmd}`);
  }
  
  

   
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
   
    const serverQueue = queue.get(message.guild.id);

    let command = message.content.toLowerCase().split(" ")[0];

  if(message.content === `${PREFIX}ping`){

    message.channel.send("ping");
  }
  
});

bot.on("message", message =>{
 if(message.content === `${PREFIX}test`){
    bot.emit("guildMemberAdd", message.member)
  
  }
});
bot.on("guildMemberAdd", async member => {
  
   let nameLimit = member.user.username;
   let username = nameLimit.length > 25 ? nameLimit.substring(0, 23) + "..." : nameLimit;
 
  
  
  let Config = await db.get(`${member.guild.id}.Config.Welcome.ED`);
  if (Config === "YA") {
    let Channel = await db.get(`${member.guild.id}.Config.Welcome.Channel`);
    if (!Channel) {
      return;
    } else {
      let BG = await db.get(`${member.guild.id}.Config.Welcome.Background`);
      if (!BG) BG = "URL DEFAULT BACKGROUND";
      
      let MSG = await db.get(`${member.guild.id}.Config.Welcome.Message`);
      if (!MSG) MSG = "DEFAULT MESSAGE";
      
        let DSC = await db.get(`${member.guild.id}.Config.Welcome.Description`);
      if (!DSC) DSC = "blum ada description nya chuk";
    
      var patern = [
    ["{members}", member.guild.memberCount],
    ["{guild}", member.guild.name],
    ["{user}",member.user.toString()]
   
   
   ]; 
   let ptr = patern.map(e => 
              {DSC = DSC.replace(e[0],e[1]);
              })
  
    
      
      
      var imageUrlRegex = /\?size=2048$/g;
      var { body: avatar } = await superagent.get(member.user.displayAvatarURL({format: "jpg"}));
      var { body: background } = await superagent.get(`${BG}`);
      async function createCanvas() {
        return new Canvas(1024, 450)
          .addImage(background, 0, 0, 1024, 450)
          .setColor("#ffffff")
          .setTextFont('bold 40px sans-serif')
          .addCircle(512, 155, 120)
          .addCircularImage(avatar, 512, 155, 115)
          .setTextAlign("center")
          
          .setColor("#ffffff")
          .setTextFont('bold 40px OrangeJuice')
          .addText("WELCOME", 512, 355)
          .setTextAlign("center")
          
          .setColor("#ffffff")
          .setTextFont('bold 40px sans-serif')
          .addText(`${member.user.tag}`, 512, 395)
          .setTextAlign("center")
          
          .setColor("#ffffff")
          .setTextFont('bold 32px sans-serif')
          .addText(`${MSG}`, 512, 430)
          .toBuffer();
      };
      let Channelz = bot.channels.cache.get(`${Channel}`);
      Channelz.send(DSC,{files: [{ attachment: await createCanvas(), name: "welcome.png" }]});
    };
  } 
});



bot.login(TOKEN);