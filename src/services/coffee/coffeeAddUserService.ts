import { CommandInteraction } from "discord.js";

import { User } from "../../entities/user";

class CoffeeAddUserService {
  interaction: CommandInteraction;
  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;

    void this.execute();
  }

  private async execute () {
    const discordUser = this.interaction.options.getUser('usuario');

    if (discordUser.bot) {
      return await this.interaction.reply('\\❌ seleciona uma pessoa e não um bot seu animal');
    }

    const user = await User.repository.findOne({
      userId: discordUser.id,
    });

    if (user) {
      return await this.interaction.reply('\\❌ esse usuário já ta na lista caralho');
    }

    const dbUser = User.repository.create({
      name: discordUser.username,
      userId: discordUser.id
    });

    await User.repository.save(dbUser);

    return await this.interaction.reply(`beleza, adicionei o ${discordUser.toString()} lá na lista de limpeza do cafofo do café`)
  }
}

export default CoffeeAddUserService;