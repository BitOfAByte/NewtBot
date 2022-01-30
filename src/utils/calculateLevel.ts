import Level from "../typeorm/entities/LevelConfiguration";
import { Message } from "discord.js";
import DiscordClient from "../client/client";
import { getRepository, Repository } from "typeorm";
import LevelConfiguration from "../typeorm/entities/LevelConfiguration";

export const calcLevel = async (client: DiscordClient, message: Message) => {
  const LevelRepository: Repository<LevelConfiguration> =
    getRepository(LevelConfiguration);

  let rank = await LevelRepository.findOne({
    user: message.author.username,
    server: message.guild?.id,
  });

  if (!rank) {
    rank = await LevelRepository.create({
      user: message.author.username,
      userId: message.author.id,
      server: message.guild?.id,
      level: 0,
      xp: 0,
      lastMessage: Date.now(),
    });
  }

  const getRandomInt = (min: number, max: number) => {
    let randomFloat = (Math.random() * (max - min) + min).toString();
    return parseInt(String(randomFloat.split(".")), 10);
  };

  if (Date.now() - rank.lastMessage > 60000) {
    let level = rank.level;
    let xp = rank.xp;
    let lastMessage = rank.lastMessage;
    let RandomNumber = getRandomInt(15, 30);
    xp += RandomNumber;
    const xpToNextLevel = 5 * Math.pow(level, 2) + 50 * level + 100;
    if (xp >= xpToNextLevel) {
      level++;
      xp = xp - xpToNextLevel;
      message.channel.send(`${message.author.username} has reached ${level}`);
    }

    await LevelRepository.update(
      { userId: message.author.id, server: message.guild?.id },
      {
        level: level,
        xp: xp,
        lastMessage: Date.now(),
      }
    );
  }
};
