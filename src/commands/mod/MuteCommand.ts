import { Message, MessageEmbed, Role } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { ModerationLog } from "../../typeorm/entities/ModerationLog";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("mute", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const muteRepo: Repository<ModerationLog> = getRepository(ModerationLog);

    const member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);

    const reason = args.slice(1).join(" ");
    const role = message.guild?.roles.cache.find(
      (r) => r.name === "muted"
    ) as Role;

    if (!role) return message.reply("No role found!");

    if (!member || !reason)
      return message.reply("You didn't provide any of the required arguments");

    if (!member.permissions.has("MUTE_MEMBERS"))
      return message.reply("You do not have permissions to this command");

    member.roles.add(role);
    await muteRepo.insert({
      guildId: message.guild?.id,
      memberId: member.id,
      reason: reason,
      issuedOn: new Date(),
      issuedBy: message.author.id,
    });

    const muteData = await muteRepo.find({
      memberId: member.id,
    });

    for (const values of muteData) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${values.memberId} has been valuesed [Case ID: ${values.id}]`,
        })
        .addFields(
          { name: `Member: `, value: `${values.memberId}`, inline: true },
          { name: `Moderator:`, value: `${values.issuedBy}`, inline: true },
          { name: `Guild ID: `, value: `${values.guildId}`, inline: true },
          { name: `Reason`, value: `${values.reason}`, inline: false },
          { name: `Date: `, value: `${values.issuedOn}`, inline: true }
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM");

      message.channel.send({ embeds: [embed] });
    }
  }
}
