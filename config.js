const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qg6ww.mongodb.net/test?retryWrites=true&w=majority`,
        appUrl: `http://localhost:${port}`,
        port
    },
    staging: {
        databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qg6ww.mongodb.net/test?retryWrites=true&w=majority`,
        appUrl: `http://localhost:${port}`,
        port
    },
    testing: {
        databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qg6ww.mongodb.net/test?retryWrites=true&w=majority`,
        appUrl: `http://localhost:${port}`,
        port
    },
    production: {
        databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qg6ww.mongodb.net/test?retryWrites=true&w=majority`,
        appUrl: `http://localhost:${port}`,
        port
    }
}

module.exports = config[env];