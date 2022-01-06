import BaseEvent from "../../utils/structures/BaseEvent";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageDelete");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.partial || message.author.bot) return;
    const channel = client.channels.cache.get(
      "928724987685269554"
    ) as TextChannel;

    const embed = new MessageEmbed()
      .setAuthor({
        name: `Message deleted | ${message.author.tag}`,
        iconURL: `${message.author.displayAvatarURL()}`,
      })
      .setDescription(message.content)
      .addFields(
        {
          name: "Author: ",
          value: `${message.author.tag} (\`${message.author.id}\`)`,
          inline: true,
        },
        {
          name: "Channel ",
          value: `${message.channel} (\`${message.channel.id}\`)`,
          inline: true,
        }
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
    return channel.send({ embeds: [embed] });
  }
}
