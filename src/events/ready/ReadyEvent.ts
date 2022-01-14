import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";
import { Guild } from "discord.js";

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client: DiscordClient, guild: Guild) {
    console.log("Bot has logged in.");

    const updateMembers = (guild: Guild) => {
      const channel = guild.channels.cache.get("931283214872498266");
      channel?.setName(`Members: ${guild.memberCount}`);
    };

    setInterval(() => {
      updateMembers(guild);
    }, 2000);
  }
}
