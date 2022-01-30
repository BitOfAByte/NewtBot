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
    calcLevel(client, message);
    if (message.channel?.id === "929797366146560011") {
      member.kick(`Typed in the wrong channel... ${message.channel}`);
    }
    const config = client.configs.get(message.guildId!);
    if (!config) {
      message.channel.send("No configuration set.");
      return;
    }
    let count = 0;
    let timeout;

    if (
      message.channel.type === "GUILD_TEXT" &&
      message.channel.name === "counting"
    ) {
      if (Number(message.content) === 1) {
        count++;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() =>
          message.channel.send("test " + count++).catch((err) => {
            console.log(err);
          })
        );
      } else if (message.author.id != client.user?.id) {
        message.channel.send(`${member} messed up!`).catch(console.error);
        count = 0;
        if (timeout) clearTimeout(timeout);
      }
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
    }
  }
}
