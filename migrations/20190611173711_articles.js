
exports.up = knex =>
    knex.schema.createTable('articles', table => {
        table.text('_id', 32).unique().notNullable();
        table.text('title', 255);
        table.text('content', 255);
        table.text('item').notNullable();
        table.text('source_id').notNullable();
        table.timestamps(true, true);
        table.index(['title', 'content', 'source_id']);
    });

exports.down = knex =>
    knex.schema.dropTable('articles');
