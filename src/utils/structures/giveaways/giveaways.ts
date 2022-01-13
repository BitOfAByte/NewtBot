import { Repository } from "typeorm";
import { MessageEmbed, Message, MessageReaction, User } from "discord.js";
import { GiveawayConfiguration } from "../../../typeorm/entities/GiveawayConfiguration";
export default {
  async end(giveawayRepo: Repository<GiveawayConfiguration>, msg: Message) {
    const channel = msg.channel;
    await msg.fetch();

    await giveawayRepo.delete({ message: msg.id });

    const filter = (reaction: any, user: any) => {
      return reaction.emoji.name === "🥳" && user.id === msg.author.id;
    };

    const reaction = msg.createReactionCollector({
      filter,
      time: 36000 * 1000,
    });

    const winner = await reaction.users?.filter((w) => !w.bot).random();

    reaction.on("collect", async (reaction, user) => {
      const embed: MessageEmbed = msg.embeds[0];
      embed.setFooter("Giveaway has ended");
      embed.setColor("BLURPLE");
      embed.addField("Winner: ", winner ? `${winner.tag}` : "No winners");
      await msg.edit({ embeds: [embed] });
    });
  },
};
