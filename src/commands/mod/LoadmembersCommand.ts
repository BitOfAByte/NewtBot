import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Message } from "discord.js";
import { getRepository, Repository } from "typeorm";
import { MemberConfiguration } from "../../typeorm/entities/MemberConfiguration";

export default class LoadmembersCommand extends BaseCommand {
  constructor() {
    super("loadmembers", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<MemberConfiguration> =
      getRepository(MemberConfiguration);
  }
}
