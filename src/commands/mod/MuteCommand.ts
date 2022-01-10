import { Message, MessageEmbed, Role } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { MuteConfiguration } from "../../typeorm/entities/MuteConfiguration";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("mute", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const muteRepo: Repository<MuteConfiguration> =
      getRepository(MuteConfiguration);

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
      user: member.user.tag,
      userId: member.id,
      reason: reason,
      active: true,
      moderator: message.author.tag,
    });

    const muteData = await muteRepo.find({
      userId: member.id,
    });

    for (const values of muteData) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${values.user} has been valuesed [Case ID: ${values.id}]`,
        })
        .addFields(
          { name: `Member: `, value: `${values.user}`, inline: true },
          { name: `Moderator:`, value: `${values.moderator}`, inline: true },
          { name: `Guild ID: `, value: `${values.guildId}`, inline: true },
          { name: `Reason`, value: `${values.reason}`, inline: false },
          { name: `Active: `, value: `${values.active}`, inline: true }
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM");

      message.channel.send({ embeds: [embed] });
    }
  }
}
