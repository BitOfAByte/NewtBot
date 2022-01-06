// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, Interaction, MessageSelectMenu } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (!interaction.isSelectMenu()) {
      return;
    }
    const { customId, values, member } = interaction;

    const compon = interaction.component as MessageSelectMenu;
    const removed = compon.options.filter((option) => {
      return !values.includes(option.value);
    });

    if (customId === "auto_roles" && member instanceof GuildMember) {
      for (const id of values) {
        member.roles.add(id);
      }
      for (const id of removed) {
        member.roles.remove(id.value);
      }

      interaction.reply({
        ephemeral: true,
        content: `Roles updated`,
      });
    }
  }
}
