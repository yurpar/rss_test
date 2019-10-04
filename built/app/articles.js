const crypto = require('crypto');
let Parser = require('rss-parser');
const knex = require('../knex');
const sources = require('./sources');
let parser = new Parser();
const ARTICLES_TABLE = 'articles';
// table: articles
// hash, title, content, source
const hash = (str) => crypto.createHash('md5').update(str.toString()).digest("hex");
module.exports.getAll = (limit = 10) => knex(ARTICLES_TABLE)
    .select('_id', 'title', 'content')
    .orderBy('created_at', 'desc')
    .limit(limit);
module.exports.getBySource = (sourceName, limit = 10) => {
    const source = sources.getByName(sourceName);
    if (source && source.name) {
        return knex(ARTICLES_TABLE)
            .select('_id', 'title', 'content')
            .orderBy('created_at', 'desc')
            .where({ source_id: sourceName })
            .limit(limit);
    }
    else {
        return Promise.reject('SOURCE_NOT_FOUND');
    }
};
const save = (item, source_id) => {
    let { _id, guid, title, content } = item;
    if (!_id || _id === '') {
        const str = guid || `${source_id}\n${title}\n${content}`;
        _id = hash(str);
    }
    const itemToSave = {
        _id,
        title,
        content,
        item: JSON.stringify(item),
        source_id
    };
    return knex(ARTICLES_TABLE)
        .insert(itemToSave);
};
module.exports.save = save;
module.exports.remove = removeById = (_id) => knex(ARTICLES_TABLE)
    .delete({ _id });
module.exports.getByTitle = ({ title, source }) => knex(ARTICLES_TABLE)
    .select('title', 'content', '_id')
    .where({ title, source_id: source });
module.exports.getById = (id) => knex(ARTICLES_TABLE)
    .select('title', 'content', '_id')
    .where({ _id: id });
module.exports.updateFromSource = async (sourceName) => {
    const { rss } = sources.getByName(sourceName);
    let updated = 0;
    if (rss) {
        let feed = await parser.parseURL(rss);
        console.log(feed.title);
        for (let i = 0; i < feed.items.length; i++) {
            const item = feed.items[i];
            try {
                await save(item, sourceName);
                console.log(item.title + ':' + item.link);
                updated += 1;
            }
            catch (e) {
                console.log(e);
            }
        }
        ;
    }
    else {
        throw new Error('SOURCE_NOT_FOUND');
    }
    return { updated };
};
