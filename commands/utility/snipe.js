const Discord = require("discord.js");
const { PREFIX } = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "Info",
  usage: "(prefix)snipe",
  description: "get deleted messages",
  execute: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = PREFIX;
    }

    const msg = client.snipes.get(message.channel.id);
    if (!msg)
      return message.channel.send(
        "There are no deleted messages in this channel!"
      );
    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author)
      .setDescription(msg.content)
      .setTimestamp();
    if (msg.image) embed.setImage(msg.image);

    message.channel.send(embed);
  }
};
