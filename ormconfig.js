const env = process.env.NODE_ENV === 'production' ? {
    prefix: 'build',
    suffix: 'js'
} : {
    prefix: 'src',
    suffix: 'ts'
}

module.exports = {
  "type": "mongodb",
  "url": `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  "authSource": "admin",
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": false,
  "entities": [
    `${env.prefix}/entities/**/*.${env.suffix}`,
  ],
  "migrations": [
    `${env.prefix}/database/migrations/**/*.${env.suffix}`,
  ],
  "subscribers": [
    `${env.prefix}/subscribers/**/*.${env.suffix}`,
  ],
  "cli": {
    "entitiesDir": `${env.prefix}/entity`,
    "migrationsDir": `${env.prefix}/database/migration`,
    "subscribersDir": `${env.prefix}/subscriber`
  }
}
