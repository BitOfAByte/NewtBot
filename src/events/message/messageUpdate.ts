import BaseEvent from "../../utils/structures/BaseEvent";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageUpdate");
  }

  async run(client: DiscordClient, message: Message, newMessage: Message) {
    const count = 1958;

    const originalMessage =
      message.content.slice(0, count) +
      (message.content.length > count ? " ..." : "");
    const EditedMessage =
      newMessage.content.slice(0, count) +
      (message.content.length > count ? " ..." : "");

    const embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`A [message](${newMessage.url}) has been edited by ${message.author.tag} in ${newMessage.channel}. \n
            **Original**: \`\`\`${originalMessage}\`\`\`
            **Edited**: \`\`\`${EditedMessage}\`\`\`
          `);
    if (newMessage.attachments.size > 0) {
      embed.addField(
        "Attachments",
        `${newMessage.attachments.map((u) => u.url)}`,
        true
      );
    }

    const channel = newMessage.guild?.channels.cache.get(
      "928724987685269554"
    ) as TextChannel;
    channel.send({ embeds: [embed] });
  }
}
