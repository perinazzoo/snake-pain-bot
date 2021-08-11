import 'dotenv/config'

import { Client, Intents } from 'discord.js';

import ServiceHandler from './services/ServiceHandler';

import './setupSlashCommands';
import './database';

class App {
  public readonly client: Client
  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.execute();
  }

  private execute() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });

    
    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      const handler = new ServiceHandler(interaction)

      const service = handler.execute()

      if (!service) {
        return await interaction.reply('foi mal aí, não achei esse comando');
      }

      service();
    });
    
    this.client.login(process.env.TOKEN);
  }
}

export default new App();
