import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm'
import CoffeeJob from '../jobs/coffee'
class Database {
  private defaultOptions: ConnectionOptions

  public async execute (): Promise<void> {
    try {
      this.defaultOptions = await getConnectionOptions()
      await createConnection(this.defaultOptions)
      console.log('Database connected! πΊπ²')
      new CoffeeJob();
    } catch (err) {
      console.log('Error connecting to database πΊπ²β: \n\n', err)
    }
  }
}

export default new Database()