import { CommandInteraction } from "discord.js";

import { IServiceHandler } from "..";
import CoffeeAddUserService from "./coffeeAddUserService";
import CoffeeChannelService from "./coffeeChannelService";
import CoffeeRemoveUserService from "./coffeeRemoveUserService";

class CoffeeServices {
  interaction: CommandInteraction
  services: IServiceHandler
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
    this.services = {
      canal() {
        new CoffeeChannelService(interaction);
      },
      addusuario() {
        new CoffeeAddUserService(interaction);
      },
      rmusuario() {
        new CoffeeRemoveUserService(interaction);
      }
    }
    
    void this.execute();
  }

  private async execute() {
    const service = this.services[this.interaction.options.getSubcommand()] || this.services[this.interaction.options.getSubcommand() + this.interaction.options.getSubcommandGroup()];

    if (!service) {
      return await this.interaction.reply('foi mal aí, não achei esse comando');
    }

    service();
  }
}

export default CoffeeServices;