import { Message, GuildMember, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { BanConfiguration } from "../../typeorm/entities/BanConfiguration";
import { getRepository, Repository } from "typeorm";

export default class WarnCommand extends BaseCommand {
  constructor() {
    super("ban", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<BanConfiguration> =
      getRepository(BanConfiguration);

    const member = message.mentions.members?.first();

    if (!member)
      return message.reply("You didn't provide any of the required arguments");

    if (!member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("No permissions!");

    const banConfig = await warnRepo.find({
      userId: member.id,
    });

    for (const bans of banConfig) {
      message.guild?.members.unban(member.id);
    }
    message.reply(
      `<@${member?.id}> has been ubbanned by <@${message.author?.id}> `
    );
  }
}
