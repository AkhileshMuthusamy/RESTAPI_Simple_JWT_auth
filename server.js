const express = require('express');
const app = express();
const numCPUs = require('os').cpus().length;
console.log('CPUs:' + numCPUs);
const mongoose = require('mongoose');
const logger = require('morgan');
const { port, appUrl, databaseUrl } = require('./config');

mongoose.connect(databaseUrl, { useNewUrlParser: true }, () => {
    console.log('Connected to db!');
});

//Import Routes
const authRoute = require('./routes/auth');

app.use(logger('dev'));
//Route Middlewares
app.use('/api/user', authRoute);


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(port, () => {
    console.log(`Server listening on ${appUrl}`);
});
