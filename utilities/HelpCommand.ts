import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../src/utils/structures/BaseCommand";
import DiscordClient from "../src/client/client";
import fs from "fs";

export default class TestCommand extends BaseCommand {
  constructor() {
    super("help", "utilities", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    fs.readdir("./command/", (err, files) => {
      if (err) console.error(err);

      let jsfiles = files.filter((f) => f.split(".").pop() === "ts");
      if (jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
      }

      var namelist = "";
      var desclist = "";
      var usage = "";

      let result = jsfiles.forEach((f, i) => {
        let props = require(`./${f}`);
        namelist = props.help.name;
        desclist = props.help.description;
        usage = props.help.usage;
      });

      message.author.send(`**Help${namelist}** \n${desclist} \n${usage}`);
    });
  }
}
