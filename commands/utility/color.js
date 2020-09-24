const Discord = require("discord.js");

module.exports = {
  name: "color",
  category: "Utility",
  description: "Returns a random color code.",
  usage: "color",
  execute: async (client, message, args) => {
    try {
      const hex = Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()
        .slice(-6);

      const color = !args[0] ? hex : args[0];
      const embed = new Discord.MessageEmbed()
        .setColor(hex)
        .setDescription("Random HEX Code: #" + hex)
        .setTitle("#" + hex)
        .setImage(`https://tsuyobot.github.io/hex-to-img/?hex=${color}`);

      message.channel.send(embed);
    } catch (err) {
      message.channel.send("There was an error!\n" + err).catch();
    }
  }
};
