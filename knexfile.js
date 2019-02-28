const migrationsDirectory = './migrations'
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'central_ledger',
      password: 'password',
      database: 'wordpress'

    },
    migrations: {
      directory: migrationsDirectory,
      tableName: 'migration',
    },
  },



};
