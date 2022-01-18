import { Message, GuildMember, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { ModerationLog } from "../../typeorm/entities/ModerationLog";
import { getRepository, Repository } from "typeorm";

export default class KickCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super("warn", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const member = message.mentions.members?.first();
    const reason = args.slice(1).join(" ");

    if (!member || !reason)
      return message.reply("You didn't provide any of the required arguments");

    if (!member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("No permissions!");

    const date = new Date();
    date.setDate(date.getDate() - 6);
    const modLog = this.modLogRepository.create({
      guildId: message.guildId!,
      memberId: member.id,
      issuedBy: message.author.id,
      issuedOn: date,
      reason,
      type: "warn",
    });
    await this.modLogRepository.save(modLog);

    message.reply(
      `<@${member?.id}> has been warned by <@${message.author?.id}> for **${reason}**`
    );
  }
}
