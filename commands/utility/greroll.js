module.exports = {
  name: "greroll",
  category: "Utility",
  execute: async (client, message, args) => {
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") ||
      !message.member.roles.cache.some(r => r.name === "Giveaways")
    ) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions or `Giveaways` role to reroll giveaways."
      );
    }

    // If no message ID or giveaway name is specified
    if (!args[1]) {
      return message.channel.send(
        ":x: You have to specify a valid Giveaway message ID!"
      );
    }

    // try to found the giveaway with prize then with ID
    let giveawayr =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find(g => g.messageID === args[1]);

    // If no giveaway was found
    if (!giveawayr) {
      return message.channel.send(
        "Unable to find a giveaway for `" + args.join(" ") + "`."
      );
    }

    // Reroll the giveaway
    client.giveawaysManager
      .reroll(giveawayr.messageID)
      .then(() => {
        // Success message
      })
      .catch(e => {
        if (
          e.startsWith(
            `Giveaway with message ID ${giveawayr.messageID} is not ended.`
          )
        ) {
          message.channel.send("This giveaway has not ended!");
        } else {
          console.error(e);
          message.channel.send("An error occured...");
        }
      });
  }
};
