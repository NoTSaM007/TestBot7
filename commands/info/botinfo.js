const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  category: "Info",
  execute: async (client, message, args) => {
    let days = 0;
    let week = 0;
    let uptime = ``;
    let totalSeconds = client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let servers = client.guilds.cache.size;
    let users = client.users.cache.size;

    if (hours > 23) {
      days = days + 1;
      hours = 0;
    }

    if (days == 7) {
      days = 0;
      week = week + 1;
    }

    if (week > 0) {
      uptime += `${week} week, `;
    }

    if (minutes > 60) {
      minutes = 0;
    }

    uptime += `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    let serverembed = new Discord.MessageEmbed()
      .setColor("#9400D3")
      .setAuthor(`Horizon`, client.user.displayAvatarURL)
      .addField(`ID`, client.user.id, true)
      .addField(`Version`, `0.0.1`, true)
      .addField(`Library`, `Discord.js v12`, true)
      .addField(`Creator`, `Yᴏᴜʀ Sᴀᴍ #2385`, true)
      .addField(`Servers`, `${servers}`, true)
      .addField(`Users`, `${users}`, true)
      .addField(`Created On`, client.user.createdAt)
      .addField(
        `Invite`,
        `[Invite Horizon](https://discord.com/api/oauth2/authorize?client_id=742375154654380082&permissions=8&scope=bot)`,
        true
      )
      .setFooter(`Uptime: ${uptime}`);

    message.channel.send(serverembed);
  }
};
