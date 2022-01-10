require("dotenv").config();
import "reflect-metadata";
import { registerCommands, registerEvents } from "./utils/registry";
import DiscordClient from "./client/client";
import { Collection, Intents } from "discord.js";
import { createConnection, getRepository } from "typeorm";
import { GuildConfiguration } from "./typeorm/entities/GuildConfiguration";
import { WarningConfiguration } from "./typeorm/entities/WarningConfiguration";
import { MuteConfiguration } from "./typeorm/entities/MuteConfiguration";
import { KickConfiguration } from "./typeorm/entities/KickConfiguration";
import { BanConfiguration } from "./typeorm/entities/BanConfiguration";
import { MemberConfiguration } from "./typeorm/entities/MemberConfiguration";

const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

(async () => {
  await createConnection({
    type: "mysql",
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    synchronize: true,
    entities: [
      GuildConfiguration,
      WarningConfiguration,
      MuteConfiguration,
      KickConfiguration,
      BanConfiguration,
      MemberConfiguration,
    ],
  });

  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildId, config));

  client.configs = configs;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DJS_BOT_TOKEN);
})();
