import { Message, GuildMember, User, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { ModerationLog } from "../../typeorm/entities/ModerationLog";
import { getRepository, Repository } from "typeorm";

export default class InfractionCommand extends BaseCommand {
  constructor() {
    super("infractions", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<ModerationLog> = getRepository(ModerationLog);
    const member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);

    if (!member) return message.reply("Invalid usage");

    const warnings = await warnRepo.find({
      memberId: member.id,
      guildId: message.guild?.id,
      type: "warn",
    });

    for (const warn of warnings) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${member.user}  infractions [Case ID: ${warn.id}]`,
        })
        .addFields(
          { name: `Member: `, value: `${warn.memberId}`, inline: true },
          { name: `Moderator:`, value: `${warn.issuedBy}`, inline: true },
          { name: `Guild ID: `, value: `${warn.guildId}`, inline: true },
          { name: `Reason`, value: `${warn.reason}`, inline: false },
          { name: `Date: `, value: `${warn.issuedOn}`, inline: true }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("RANDOM");

      message.channel.send({ embeds: [embed] });
    }
  }
}
