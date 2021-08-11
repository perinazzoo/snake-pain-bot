module.exports = {
  "type": "mongodb",
  "url": `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  "authSource": "admin",
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entities/**/*.ts"
  ],
  "migrations": [
    "src/database/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscribers/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/database/migration",
    "subscribersDir": "src/subscriber"
  }
}
