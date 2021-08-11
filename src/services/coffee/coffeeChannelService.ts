import { CommandInteraction } from "discord.js";
import { getMongoRepository } from "typeorm";

import { Channel } from "../../entities/channel";

class CoffeeChannelService {
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;

    void this.execute();
  }

  private async execute() {
    const channelRepository = getMongoRepository(Channel);

    const discordChannel = this.interaction.options.getChannel('canal');

    if (discordChannel.type !== 'GUILD_TEXT') {
      return this.interaction.reply('\\❌ seleciona um canal de texto aí seu animal')
    }

    await channelRepository.findOneAndUpdate(
      {
        name: this.interaction.commandName,
      },
      {
        $set: {
          name: this.interaction.commandName,
          channelId: discordChannel.id
        }
      },
      {
        upsert: true
      }
    );

    this.interaction.reply(`vou gerenciar a limpeza do cafofo do café no canal ${discordChannel.toString()}`)
  }
}

export default CoffeeChannelService;