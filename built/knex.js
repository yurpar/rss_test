const knex = require('knex');
const filename = (process.env.NODE_ENV === 'production') ?
    './prod.sqlite' :
    './dev.sqlite';
module.exports = knex({
    client: 'sqlite3',
    connection: {
        filename
    },
    useNullAsDefault: true
});
