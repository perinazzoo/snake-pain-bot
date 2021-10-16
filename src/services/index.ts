import { CommandInteraction } from 'discord.js';
import CoffeeServices from './coffee/coffeeServices';

export interface IServiceHandler {
  [key: string]: Function
}

class ServiceHandler {
  services: IServiceHandler;
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
    this.services = {
      cafe(): void {
        new CoffeeServices(interaction);
      }
    }
    void this.execute();
  }

  public execute (): Function {
    return this.services[this.interaction.commandName];
  }
}

export default ServiceHandler;
