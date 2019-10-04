// using name as id
// TODO consider to place sources in table
const sourceArr = [
    {
        name: 'meduza',
        rss: 'https://meduza.io/rss/all'
    }, {
        name: 'habr',
        rss: 'https://habr.com/en/rss/best/daily/?fl=ru%2Cen'
    }
];
module.exports.list = () => sourceArr.map(s => s.name);
module.exports.getByName = (name) => sourceArr.find(s => s.name === name) || {};
