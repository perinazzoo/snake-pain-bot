import { CommandInteraction } from "discord.js";

import { IServiceHandler } from "../..";
import SetCoffeeChannelService from "./SetCoffeeChannelService";

class SetChannelServiceHandler {
  interaction: CommandInteraction
  services: IServiceHandler
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
    this.services = {
      cafe() {
        new SetCoffeeChannelService(interaction);
      }
    }
    
    void this.execute();
  }

  private async execute() {
    const service = this.services[this.interaction.options.getSubcommand()];

    if (!service) {
      return await this.interaction.reply('foi mal aí, não achei esse comando');
    }

    service();
  }
}

export default SetChannelServiceHandler;