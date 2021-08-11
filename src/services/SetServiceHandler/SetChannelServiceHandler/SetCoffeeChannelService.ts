import { CommandInteraction } from "discord.js";
import { getMongoRepository } from "typeorm";

import { Channel } from "../../../entities/Channel";

class SetCoffeeChannelService {
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;

    void this.execute();
  }

  private async execute() {
    const channelRepository = getMongoRepository(Channel);

    const discordChannel = this.interaction.options.getChannel('canal')

    if (discordChannel.type !== 'GUILD_TEXT') {
      return this.interaction.reply('\\❌ seleciona um canal de texto aí seu animal')
    }

    await channelRepository.findOneAndUpdate(
      {
        name: this.interaction.options.getSubcommand(),
      },
      {
        $set: {
          name: this.interaction.options.getSubcommand(),
          channelId: discordChannel.id
        }
      },
      {
        upsert: true
      }
    );

    this.interaction.reply(`canal do ${this.interaction.options.getSubcommand()} definido como ${discordChannel.toString()} com sucesso`)
  }
}

export default SetCoffeeChannelService;