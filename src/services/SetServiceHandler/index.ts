import { CommandInteraction } from 'discord.js';
import { IServiceHandler } from '..'
import SetChannelServiceHandler from './SetChannelServiceHandler';

class SetServices {
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

  private async execute(): Promise<void> {
    const service = this.services[this.interaction.options.getSubcommandGroup()];

    if (!service) {
      return await this.interaction.reply('foi mal aí, não achei esse comando');
    }

    service();
  }
}

export default SetServices;
