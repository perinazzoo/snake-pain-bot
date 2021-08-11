import { CommandInteraction } from "discord.js";
import { getMongoRepository } from "typeorm";

import { User } from "../../entities/user";

class CoffeeRemoveUserService {
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;

    void this.execute();
  }

  private async execute() {
    const userRepository = getMongoRepository(User);

    const discordUser = this.interaction.options.getUser('usuario');

    if (discordUser.bot) {
      return await this.interaction.reply('\\❌ seleciona uma pessoa e não um bot seu animal');
    }

    const user = await userRepository.findOne({
      userId: discordUser.id,
    });

    if (!user) {
      return await this.interaction.reply('\\❌ esse usuário não ta na lista caralho');
    }

    await userRepository.delete(user);

    return await this.interaction.reply(`beleza, removi o ${discordUser.toString()} lá da lista de limpeza do cafofo do café`)
  }
}

export default CoffeeRemoveUserService;