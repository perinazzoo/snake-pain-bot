import { CronJob } from 'cron'
import { getMongoRepository } from "typeorm";

import { User } from '../entities/user';
import { Channel } from '../entities/channel';
import random from '../utils/random';
import app from '../app';

class CoffeeJob {
  constructor() {
    this.execute();
  } 

  private execute() {
    new CronJob('* * * * *', async () => {
      const userRepository = getMongoRepository(User);
      const channelRepository = getMongoRepository(Channel);

      const { channelId } = await channelRepository.findOne({
        name: 'cafe'
      });

      const channel = app.client.channels.cache.get(channelId);

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

      channel.send(`o sorteado foi ${discordUser.toString()}`);
    },
    null,
    true,
    'America/Sao_Paulo'
    )
  }
}

export default CoffeeJob;
