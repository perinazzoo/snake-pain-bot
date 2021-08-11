import 'dotenv/config'

import { Client, Intents } from 'discord.js';

import ServiceHandler from './services';

import database from './database';
import setupSlashCommands from './setupSlashCommands';
import CoffeeJob from './jobs/coffee';

class App {
  public readonly client: Client
  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    void this.execute();
  }

  private async execute() {
    try {
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

      await database.execute();

      await setupSlashCommands.execute();
      
      await this.client.login(process.env.TOKEN);

      const coffeeJob = new CoffeeJob();
      
      coffeeJob.start();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new App();
