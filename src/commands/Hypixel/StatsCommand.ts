import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { Message, MessageEmbed } from "discord.js";
import axios from "axios";

export default class LoadmembersCommand extends BaseCommand {
  constructor() {
    super("stats", "Hypixel", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const player = args[0];
    const api_key = process.env.API_KEY;

    if (!player) return message.reply("You must provide a mc username");
    axios
      .get(`https://api.hypixel.net/player?key=${api_key}&name=${player}`)
      .then((res: any) => {
        const embed = new MessageEmbed()
          .setAuthor({
            name: `Stats for ${res.data.player.displayname}`,
          })
          .addFields(
            {
              name: " Arena wins",
              value: `${res.data.player.stats.Arena.wins_2v2}`,
              inline: true,
            },
            {
              name: " UHC wins",
              value: `${res.data.player.stats.UHC.wins}`,
              inline: true,
            },
            {
              name: " Skywars wins",
              value: `${res.data.player.stats.SkyWars.wins}`,
              inline: true,
            },
            {
              name: " Bedwars wins",
              value: `${res.data.player.stats.Bedwars.wins_bedwars}`,
              inline: true,
            },
            {
              name: " Duels wins",
              value: `${res.data.player.stats.Duels.wins}`,
              inline: true,
            },
            {
              name: " General wins",
              value: `${res.data.player.achievements.general_wins}`,
              inline: true,
            },
            {
              name: " Gifting Meta",
              value: `${res.data.player.giftingMeta.ranksGiven}`,
              inline: true,
            },
            {
              name: " Rank",
              value: `${res.data.player.rank}`,
              inline: true,
            },
            {
              name: " First login",
              value: calcDate(res.data.player.firstLogin),
              inline: true,
            }
          )
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setColor("RANDOM");

        message.channel.send({ embeds: [embed] });
      })
      .catch((err: any) => {
        message.channel.send("ERROR " + err.message);
      });
  }
}

function calcDate(timestamp: string | number | Date) {
  var d = new Date(timestamp);
  const timeStampCon =
    d.getDate() +
    "/" +
    d.getMonth() +
    "/" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();

  return timeStampCon;
}
