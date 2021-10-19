import { CronJob } from 'cron'
import { Channel as DiscordChannel } from "discord.js";

import { User } from '../entities/user';
import { Channel } from '../entities/channel';
import random from '../utils/random';
import app from '../app';

class CoffeeJob {
  channel: DiscordChannel

  public start() {
    new CronJob('30 15 * * 1,2,3,4,5', async () => {
      await this.execute();
    },
    null,
    true,
    'America/Sao_Paulo'
    )
  }

  private async execute() {
    try {
      const { channelId } = await Channel.repository.findOne({
        name: 'cafe'
      });

      this.channel = app.client.channels.cache.get(channelId);

      if (!this.channel.isText()) {
          throw new Error('Canal padrão não é um canal de texto.')
      }

      let users = await User.repository.find({
        where: {
          $or: [{ doneThisRound: false }, { doneThisRound: null }]
        }
      });

      if (!users || users.length <= 0) {
        await this.channel.send('a lista dos caboclo chegou ao fim, resetando...')
        await User.repository.update({}, {
          doneThisRound: false
        }) 

        users = await User.repository.find({
          where: {
            $or: [{ doneThisRound: false }, { doneThisRound: null }]
          }
        });
      }

      const randomUser = random(users);

      const discordUser = await app.client.users.fetch(randomUser.userId);

      await User.repository.findOneAndUpdate(
        {
          userId: randomUser.userId,
        },
        {
          $set: {
            doneThisRound: true
          }
        }
      );

    //   console.log(`🐽 seu dia de limpeza chegou ${discordUser.toString()}`);
      await this.channel.send(`🐽 seu dia de limpeza chegou ${discordUser.toString()}`);
    } catch (err) {
      if (this.channel.isText()) {
        await this.channel.send('erro ao sortear o caboclo, tentando novamente');
      }
      this.execute();
    }
  }
}

export default CoffeeJob;
