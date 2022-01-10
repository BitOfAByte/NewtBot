import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import Levels from "discord-xp";
import { Rank } from "canvacord";
export default class sendCommand extends BaseCommand {
  constructor() {
    super("level", "Utils", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const user = await Levels.fetch(message.author.id, "886139397429407744");
    const neededXp = Levels.xpFor(user.level + 1);

    if (!user)
      return message.reply("You don't have any xp try sending some messages");
    const rank = new Rank()
      .setAvatar(message.author.displayAvatarURL())
      .setCurrentXP(user.xp)
      .setCurrentXP(user.xp)
      .setRequiredXP(neededXp)
      .setLevel(user.level)
      .setRank(2, "idj", false)
      .setProgressBar("#FFA500", "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator);
  }
}
