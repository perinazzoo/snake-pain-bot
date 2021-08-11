import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { commands } from './utils/commands'

class SetupSlashCommands {
  private rest: REST
  constructor() {
    this.rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    void this.execute();
  }

  private async execute(): Promise<void> {
    try {
      console.log('Started refreshing application (/) commands.');
  
      const commandsFromAPI = await this.rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
      )as Array<any>;
  
      await this.rest.put(
        Routes.guildApplicationCommandsPermissions(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commandsFromAPI.map((command) => ({
          id: command.id,
          permissions: [
            {
              id: process.env.MODERATOR_ROLE_ID,
              type: 1,
              permission: true,
            }
          ]
        }))}
      )
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new SetupSlashCommands();
