// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'sheltered_dev'
    },
    seeds: {
      directory: './seeds/'
    },
    directory: __dirname + '/migrations',
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'sheltered_test'
    },
    directory: __dirname + '/migrations',
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './seeds/'
    },
    directory: __dirname + '/migrations',
  }

};
