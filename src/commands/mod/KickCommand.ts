import { Message, GuildMember, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { KickConfiguration } from "../../typeorm/entities/KickConfiguration";
import { getRepository, Repository } from "typeorm";

export default class WarnCommand extends BaseCommand {
  constructor() {
    super("kick", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<KickConfiguration> =
      getRepository(KickConfiguration);

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

    member.kick(reason);
    message.reply(
      `<@${member?.id}> has been kicked by <@${message.author?.id}> for **${reason}**`
    );
  }
}
