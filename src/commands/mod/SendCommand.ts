import {
  Message,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class sendCommand extends BaseCommand {
  constructor() {
    super("send", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const channel = message.mentions.channels.first();
    const text = args.slice(1).join(" ");
    if (!channel || channel.type != "GUILD_TEXT")
      return message.reply("Invlaid");

    channel.send(text);
  }
}
