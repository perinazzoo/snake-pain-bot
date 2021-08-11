import { CronJob } from 'cron'
import { getMongoRepository } from "typeorm";
import { Channel as DiscordChannel } from "discord.js";

import { User } from '../entities/user';
import { Channel } from '../entities/channel';
import random from '../utils/random';
import app from '../app';

class CoffeeJob {
  channel: DiscordChannel

  public start() {
    new CronJob('30 15 * * *', async () => {
      await this.execute();
    },
    null,
    true,
    'America/Sao_Paulo'
    )
  }

  private async execute() {
    try {
      const userRepository = getMongoRepository(User);
      const channelRepository = getMongoRepository(Channel);

      const { channelId } = await channelRepository.findOne({
        name: 'cafe'
      });

      const channel = app.client.channels.cache.get(channelId);
      this.channel = channel;

      let users = await userRepository.find({
        where: {
          $or: [{ doneThisRound: false }, { doneThisRound: null }]
        }
      });

      if (!users || users.length <= 0) {
        await userRepository.update({}, {
          doneThisRound: false
        })

        users = await userRepository.find({
          where: {
            $or: [{ doneThisRound: false }, { doneThisRound: null }]
          }
        });
      }

      const randomUser = random(users);

      const discordUser = await app.client.users.fetch(randomUser.userId);

      await userRepository.findOneAndUpdate(
        {
          userId: randomUser.userId,
        },
        {
          $set: {
            doneThisRound: true
          }
        }
      );

      channel.send(`o felizardo foi ${discordUser.toString()}`);
    } catch (err) {
      this.channel.send('erro ao sortear o caboclo, tentando novamente');
      this.execute();
    }
  }
}

export default CoffeeJob;
