import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("suggest", "Utils", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const channel = client.channels.cache.get("923949235840368670");

    if (!channel || channel.type !== "GUILD_TEXT") return message.reply("NO");
    const text = args.join(" ");

    const embed = new MessageEmbed()
      .setAuthor({ name: `Submitter\n ${message.author.tag}` })
      .setDescription(`**Suggestion**\n${text}`)
      .setColor("BLURPLE")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter("User id" + message.author.id);

    channel.send({ embeds: [embed] }).then((m) => {
      m.react("✅");
      m.react("❌");
    });
  }
}
