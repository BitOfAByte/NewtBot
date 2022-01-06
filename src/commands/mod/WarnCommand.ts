import { Message, GuildMember, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { WarningConfiguration } from "../../typeorm/entities/WarningConfiguration";
import { getRepository, Repository } from "typeorm";

export default class WarnCommand extends BaseCommand {
  constructor() {
    super("warn", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<WarningConfiguration> =
      getRepository(WarningConfiguration);

    const member = message.mentions.members?.first();
    const reason = args.slice(1).join(" ");

    if (!member || !reason)
      return message.reply("You didn't provide any of the required arguments");

    if (!member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("No permissions!");

    await warnRepo.insert({
      guildId: message.guild?.id,
      user: member.user.tag,
      moderator: message.author.tag,
      reason: reason,
      active: true,
      userId: member.id,
    });

    message.reply(
      `<@${member?.id}> has been warned by <@${message.author?.id}> for **${reason}**`
    );
  }
}
