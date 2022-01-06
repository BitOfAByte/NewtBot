import { Message, User } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class TestCommand extends BaseCommand {
  constructor() {
    super("test", "testing", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let user: User | undefined;
    let userId = args.shift()!;

    if (!user) {
      userId = userId.replace(/[<@!>]/g, "");
      user = await client.users.fetch(userId);
    }
    user = message.mentions.users?.first();

    message.channel.send(userId);

    try {
    } catch (err) {
      console.error(err);
    }
  }
}
