import { CommandInteraction } from 'discord.js';

import SetServiceHandler from './SetServiceHandler';

import { IServiceHandler } from './';

class ServiceHandler {
  services: IServiceHandler
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
    this.services = {
      definir(): void {
        new SetServiceHandler(interaction);
      }
    }
  }
  
  public execute(): Function {
    return this.services[this.interaction.commandName]
  }
}

export default ServiceHandler;
