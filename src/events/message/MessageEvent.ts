import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import { LevelConfiguration } from "../../typeorm/entities/Levels";
import { getRepository, Repository } from "typeorm";
export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    const warnRepo: Repository<LevelConfiguration> =
      getRepository(LevelConfiguration);

    if (message.author.bot) return;

    const config = client.configs.get(message.guildId!);
    if (!config) {
      message.channel.send("No configuration set.");
      return;
    }

    const LevelInfo = warnRepo.create({
      user: message.author.username,
      userId: message.author.id,
    });

    const generatedxp = Math.floor(Math.random() * 16);
    LevelInfo.xp += generatedxp;

    if (LevelInfo.xp >= LevelInfo.level * 40) {
      LevelInfo.level++;
      LevelInfo.xp = 0;
      message.reply(`You're now level **${LevelInfo.level}**!`);
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
