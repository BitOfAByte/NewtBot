// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { Guild, GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { getRepository, Repository } from "typeorm";
import { MemberConfiguration } from "../typeorm/entities/MemberConfiguration";
export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember, guild: Guild) {
    const channel = guild.channels.cache.get("931283214872498266");
    const warnRepo: Repository<MemberConfiguration> =
      getRepository(MemberConfiguration);

    const config = client.configs.get(member.guild.id);

    const updateMembers = (guilds: Guild) => {
      channel?.setName(`${guilds.memberCount.toLocaleString()}`);
    };

    updateMembers(guild);

    if (!config) return;
    if (config.welcomeChannelId) {
      const channel = member.guild.channels.cache.get(
        config.welcomeChannelId
      ) as TextChannel;
      if (!channel) console.log("No welcome channel found");
      else channel.send(`Welcome ${member}`);
    } else {
      console.log("No welcome channel set.");
    }
  }
}
