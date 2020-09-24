const Discord = require("discord.js");
const { PREFIX, owner_id } = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "blacklist",
  aliases: ["bl"],
  category: "owner",
  usage: "blacklist <@user>",
  description: "Blacklist somebody from the bot!",
  execute: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);

    if (prefix == null) {
      prefix = PREFIX;
    }

    if (message.author.id != owner_id)
      return message.reply("you do not have permission to use this command!");

    const user = message.mentions.users.first();

    if (!user) return message.reply("Please mention someone!");
    let blacklist = await db.fetch(`blacklist_${user.id}`);

    if (blacklist === "Not") {
      db.set(`blacklist_${user.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed().setDescription(
        `${user} has been **Blacklisted!**`
      );

      message.channel.send(embed);
    } else if (blacklist === "Blacklisted") {
      db.set(`blacklist_${user.id}`, "Not");
      let embed = new Discord.MessageEmbed().setDescription(
        `${user} has been **Whitelisted!**`
      );

      message.channel.send(embed);
    } else {
      db.set(`blacklist_${user.id}`, "Not");
      let embed = new Discord.MessageEmbed().setDescription(
        `Set up data for ${user}!`
      );

      message.channel.send(embed);
    }
  }
};
