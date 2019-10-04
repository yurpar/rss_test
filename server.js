const express = require('express');
const router = require('./app/routes')

const app = express();

app.use(router);

const port = 3000;


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

