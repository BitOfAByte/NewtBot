import { Message, MessageEmbed, Role } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("unmute", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);
    const role = message.guild?.roles.cache.find(
      (r) => r.name === "muted"
    ) as Role;

    if (!member) return message.reply("You must provide a member to unmute");

    if (!role) return message.reply("No role found!");

    if (!member?.roles.cache.has("916008898035605514"))
      return message.reply("Member is not muted");

    if (!member?.permissions.has("MUTE_MEMBERS"))
      return message.reply("You do not have permissions to this command");

    member?.roles.remove(role);

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${member} has been unmuted`,
      })
      .addFields(
        { name: `Member: `, value: `${member}`, inline: true },
        { name: `Moderator:`, value: `${message.author}`, inline: true },
        { name: `Guild ID: `, value: `${message.guildId}`, inline: true }
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }
}
