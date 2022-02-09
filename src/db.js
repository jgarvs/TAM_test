const mongoose = require('mongoose');

module.exports = {
        connect: DB_HOST => {
                // mongoose.set('useNewUrlParser', true);
                // mongoose.set('useFindAndModify', false);
                // mongoose.set('useCreateIndex', true);
                // mongoose.set('useUnifiedTopology', true);returnOriginal
                mongoose.set('returnOriginal', false);

                mongoose.connect(DB_HOST);

                mongoose.connection.on('error', err => {
                        console.log(err);
                        console.log('MongoDB connection error');
                        process.exit();
                })
        },

        close: () => {
                mongoose.connection.close();
        }
}