import ms from "ms";
import { Message, MessageEmbed } from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";
import { GiveawayConfiguration } from "../../typeorm/entities/GiveawayConfiguration";
import { getRepository, Repository } from "typeorm";
import giveaways from "../../utils/structures/giveaways/giveaways";

export default class sendCommand extends BaseCommand {
  constructor() {
    super("giveaway", "giveaway", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const warnRepo: Repository<GiveawayConfiguration> = getRepository(
      GiveawayConfiguration
    );

    const item = args.slice(1).join(" ");

    const time = Number(args.slice(2).join(" "));
    const end: number = Date.now() + time;

    if (!item || !time)
      return message.reply("You must provide an item and a time");
    const embed = new MessageEmbed()
      .setAuthor({
        name: `Giveaway | ${item}`,
        iconURL: `${message.author.displayAvatarURL()}`,
      })
      .setColor("BLURPLE")
      .setDescription(`${message.author.tag} is giving away **${item}**!`)
      .setFooter("Giveaway ends")
      .setTimestamp(end);

    const msg: Message = await message.channel.send({ embeds: [embed] });
    await msg.react("🥳");

    await warnRepo.insert({
      channel: msg.channel.id,
      message: msg.id,
      end: end,
    });

    setTimeout(() => {
      giveaways.end(warnRepo, msg);
    }, time);
  }
}
