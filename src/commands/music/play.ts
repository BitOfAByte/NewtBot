import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("level", "Utils", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {}
}
