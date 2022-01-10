// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { getRepository, Repository } from "typeorm";
import { MemberConfiguration } from "../typeorm/entities/MemberConfiguration";
export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    const warnRepo: Repository<MemberConfiguration> =
      getRepository(MemberConfiguration);

    console.log(`Guild Member Joined`);
    console.log(`Joined ${member.guild.id} ${member.guild.name}`);
    const config = client.configs.get(member.guild.id);

    const data = warnRepo.insert({
      user: member.user.username,
      userId: member.id,
      level: 0,
    });

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
