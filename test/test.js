const chai = require('chai');
const sources = require('../app/sources');
const articles = require('../app/articles');

const expect = chai.expect;

describe('Sources', function() {
    describe('getByName', function() {
        it('should return "opennet" source object by name', function() {
            const result = sources.getByName('opennet');
            expect(result).to.be.eql({
                name: 'opennet',
                rss: 'http://www.opennet.ru/opennews/opennews_all.rss'
            });
        });
    });
});

const testId = 'd23946cf1fd5d58880ea7a1dd5b5ac9d';

describe('Articles', function () {
    describe('save, read, delete', function () {
        it('should save test item', async function () {
            let result = 'success';
            const item = {
                title: 'test',
                content: 'test'
            }
            await articles
                .save(item, 'test')
                .catch(err => {
                    console.log(err);
                    result = 'error';
                });
            expect(result).to.be.equal('success');
        });
        it('should get test item', async function () {
            let result = 'success';
            const [item] = await articles
                .getByTitle({title: 'test', source: 'test'})
                .catch(err => {
                    console.log(err);
                    result = 'error';
                });
            expect(result).to.be.equal('success');
            expect(item._id).to.be.equal(testId);
        });
        it('should get test item by id', async function () {
            let result = 'success';
            const [item] = await articles
                .getById(testId)
                .catch(err => {
                    console.log(err);
                    result = 'error';
                });
            expect(result).to.be.equal('success');
            expect(item._id).to.be.equal(testId);
            expect(item.title).to.be.equal('test');
        });
        it('should delete test item', async function () {
            let result = 'success';
            await articles.remove(testId)
                .catch(err => {
                    console.log(err);
                    result = 'error';
                });
            expect(result).to.be.equal('success');
        });
    })
})
