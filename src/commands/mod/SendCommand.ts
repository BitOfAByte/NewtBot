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
    const channel = client.channels.cache.get(
      "928746280765755443"
    ) as TextChannel;

    args.shift();
    const text = args.join(" ");
    channel.send(text);
  }
}
