import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm'
import CoffeeJob from '../jobs/coffee'
class Database {
  private defaultOptions: ConnectionOptions
  constructor () {
    void this.execute()
  }

  private async execute (): Promise<void> {
    try {
      this.defaultOptions = await getConnectionOptions()
      await createConnection(this.defaultOptions)
      console.log('Banco de dados conectado com sucesso! 💺🎲')
      new CoffeeJob();
    } catch (err) {
      console.log('Erro ao conectar ao banco de dados 💺🎲❌: \n\n', err)
    }
  }
}

export default new Database()