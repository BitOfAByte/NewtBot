import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Message, MessageEmbed } from "discord.js";

export default class LoadmembersCommand extends BaseCommand {
  constructor() {
    super("lock", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const channel =
      message.mentions.channels?.first() ||
      message.guild?.channels.cache.get(args[0]);

    if (!channel || channel.type != "GUILD_TEXT")
      return message.reply(
        "Invalid channel or you didn't provide any arguments"
      );

    channel.permissionOverwrites.create(channel.guild.roles.everyone, {
      SEND_MESSAGES: false,
    });

    const embed = new MessageEmbed().setDescription(
      `Sucessfully locked ${channel.name}`
    );
    channel.send({ embeds: [embed] });
  }
}
