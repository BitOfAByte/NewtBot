import {
  Message,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class AddroleCommand extends BaseCommand {
  constructor() {
    super("addrole", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const channel = message.mentions.channels.first() as TextChannel;

    if (!channel || channel.type !== "GUILD_TEXT")
      message.reply("Mention a channel");

    const messageId = args[1];
    const role = message.mentions.roles.first() as Role;
    if (!role) message.reply("Unknown role");
    const targetMessage = await channel.messages.fetch(messageId, {
      cache: true,
      force: true,
    });

    if (!targetMessage) return message.reply("Unknown message id");

    if (targetMessage.author.id !== client.user?.id)
      return message.reply(
        `Please provide a message ID that was sent from <@${client.user?.id}>`
      );

    let row = targetMessage.components[0] as MessageActionRow;
    if (!row) {
      row = new MessageActionRow();
    }

    const option: MessageSelectOptionData[] = [
      {
        label: role.name,
        value: role.id,
      },
    ];

    let menu = row.components[0] as MessageSelectMenu;
    if (menu) {
      for (const o of menu.options) {
        if (o.value === option[0].value) {
          return {
            custom: true,
            content: `<@&${o.value}> is already part of this menu`,
            allowedMentions: {
              roles: [],
            },
            ephemeral: true,
          };
        }
      }

      menu.addOptions(option);
      menu.setMaxValues(menu.options.length);
    } else {
      row.addComponents(
        new MessageSelectMenu()
          .setCustomId("auto_roles")
          .setMinValues(0)
          .setMaxValues(1)
          .setPlaceholder("Select your roles....")
          .addOptions(option)
      );
    }

    await targetMessage.edit({
      components: [row],
    });
    message.channel.send(`Added <@&${role.id}> to the menu!`);
    /*
    return {
      custom: true,
      content: `Added <@&${role.id}> to the meun`,
      allowedMentions: {
        roles: [],
      },
      ephemeral: true,
    };
    */
  }
}
