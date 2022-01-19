import BaseEvent from "../../utils/structures/BaseEvent";
import { GuildMember, Message } from "discord.js";
import DiscordClient from "../../client/client";
import { calcLevel } from "../../utils/calculateLevel";
export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message, member: GuildMember) {
    if (message.author.bot) return;
    if (message.channel?.id === "929797366146560011") {
      member.kick(`Typed in the wrong channel... ${message.channel}`);
    }
    const config = client.configs.get(message.guildId!);
    if (!config) {
      message.channel.send("No configuration set.");
      return;
    }
    if (message.content.startsWith(config.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    } else {
      calcLevel(client, message);
    }
  }
}
