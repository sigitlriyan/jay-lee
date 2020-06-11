const Discord = require("discord.js");
module.exports.run = async (bot, message, args) =>{
  const helpembed = new Discord.MessageEmbed()
            .setColor("#7289DA")
            .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
            .setDescription(`
__**Commands List**__
> \`play\` > **\`play [title/url]\`**
> \`search\` > **\`search [title]\`**
> \`skip\`, \`stop\`,  \`pause\`, \`resume\`
> \`nowplaying\`, \`queue\`, \`volume\``)
            .setFooter("akan masih ada maintenance untuk bot ini... hubungi Jaylee bila ada masalah pada bot ini");
        message.channel.send(helpembed);
}
exports.help={
  name:"help"
}