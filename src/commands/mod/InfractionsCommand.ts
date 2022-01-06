import { Message, GuildMember, User, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { WarningConfiguration } from "../../typeorm/entities/WarningConfiguration";
import { getRepository, Repository } from "typeorm";

export default class InfractionCommand extends BaseCommand {
  constructor() {
    super("infractions", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<WarningConfiguration> =
      getRepository(WarningConfiguration);
    const member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);

    if (!member) return message.reply("Invalid usage");

    const warnings = await warnRepo.find({
      userId: member.id,
      guildId: message.guild?.id,
    });

    for (const warn of warnings) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${warn.user} has been warned [Case ID: ${warn.id}]`,
        })
        .addFields(
          { name: `Member: `, value: `${warn.user}`, inline: true },
          { name: `Moderator:`, value: `${warn.moderator}`, inline: true },
          { name: `Guild ID: `, value: `${warn.guildId}`, inline: true },
          { name: `Reason`, value: `${warn.reason}`, inline: false },
          { name: `Active: `, value: `${warn.active}`, inline: true }
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM");

      message.channel.send({ embeds: [embed] });
    }
  }
}
