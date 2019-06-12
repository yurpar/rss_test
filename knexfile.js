// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite'
    }
  },

  production: {
    client: 'sqlite3',
      useNullAsDefault: true,
    connection: {
      filename: './prod.sqlite'
    }
  }

};
