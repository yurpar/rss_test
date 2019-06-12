const express = require('express');
const sources = require('./app/sources');
const articles = require('./app/articles');


const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Available methods: /sources, /sources/:name, /sources/:name/list, /sources/:name/update ')
})

app.get('/sources', (req, res) => {
    const resp = sources.list();
    res.send(resp);
})

app.get('/sources/:name',  (req, res) => {
    const resp = sources.getByName(req.params.name);
    res.send(resp);
})

app.put('/sources/:name/update', async (req, res) => {
    let resp = {
        status: 'success',
    };
    try {
        const result = await articles.updateFromSource(req.params.name);
        resp.result = result;
    } catch (err) {
        resp = {
            status: 'error',
            error: err.message
        }
    };
    res.send(resp);
});

app.get('/sources/:name/list', async (req, res) => {
    const resp = await articles.getBySource(req.params.name)
        .then(result => ({
            status: 'success',
            result}))
        .catch(err => ({
            status: 'error',
            error: err
        }));
    res.send(resp);
})

app.get('/article/:id', async (req, res) => {
    const resp = await articles.getById(req.params.id)
        .then(result => ({
            status: 'success',
            result}))
        .catch(err => ({
            status: 'error',
            error: err
        }));
    res.send(resp);
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

