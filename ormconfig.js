const env = process.env.NODE_ENV === 'production' ? 'build' : 'src'
console.log(env)

module.exports = {
  "type": "mongodb",
  "url": `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  "authSource": "admin",
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": false,
  "entities": [
    `${env}/entities/**/*.ts`,
  ],
  "migrations": [
    `${env}/database/migrations/**/*.ts`,
  ],
  "subscribers": [
    `${env}/subscribers/**/*.ts`,
  ],
  "cli": {
    "entitiesDir": `${env}/entity`,
    "migrationsDir": `${env}/database/migration`,
    "subscribersDir": `${env}/subscriber`
  }
}
