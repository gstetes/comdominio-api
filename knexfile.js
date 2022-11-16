module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'comdominio',
      user: 'postgres',
      password: 'root'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },
  // production: {
  //   client: 'mysql3',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
