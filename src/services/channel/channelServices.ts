import { CommandInteraction } from "discord.js";

import { IServiceHandler } from "..";
import SetCoffeeChannelService from "./coffeeChannelService";

class ChannelServiceHandler {
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

export default ChannelServiceHandler;