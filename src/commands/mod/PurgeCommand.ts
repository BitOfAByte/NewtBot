import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Message, MessageEmbed } from "discord.js";

export default class LoadmembersCommand extends BaseCommand {
  constructor() {
    super("purge", "mod", ["clear"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply("that doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      return message.reply("you need to input a number between 1 and 99.");
    }

    if (message.channel.type === "GUILD_TEXT") {
      message.channel.bulkDelete(amount, true).then((m) => {
        message.channel.send("Deleted " + m.size + " messages");
      });
    } else {
      message.reply("This is a guild only command!");
    }
  }
}
