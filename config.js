const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        databaseUrl: 'mongodb://localhost/----',
        appUrl: `http://localhost:${port}`,
        port
    },
    staging: {
        databaseUrl: 'mongodb://localhost/----',
        appUrl: `http://localhost:${port}`,
        port
    },
    testing: {
        databaseUrl: 'mongodb://localhost/----',
        appUrl: `http://localhost:${port}`,
        port
    },
    production: {
        databaseUrl: 'mongodb://localhost/----',
        appUrl: `http://localhost:${port}`,
        port
    }
}

module.exports = config[env];