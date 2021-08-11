import { CommandInteraction } from 'discord.js';
import SetChannelServiceHandler from './channel';

export interface IServiceHandler {
  [key: string]: Function
}

class ServiceHandler {
  services: IServiceHandler;
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
    this.services = {
      canal(): void {
        new SetChannelServiceHandler(interaction);
      }
    }
    void this.execute();
  }

  public execute(): Function {
    return this.services[this.interaction.commandName];
  }
}

export default ServiceHandler;
