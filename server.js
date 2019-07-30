const express = require('express');
const app = express();

const logger = require('morgan');

app.use(logger('tiny'));

const { port, appUrl } = require('./config');

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(port, () => {
    console.log(`Server listening on ${appUrl}`);
});
