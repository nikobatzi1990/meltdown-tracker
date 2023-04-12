require('dotenv').config();

module.exports = {
  // development : {
    client: 'pg',
    connection: {
      host : process.env.HOST,
      port : process.env.PORT,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
    },
    searchPath: 'public',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  // }
}