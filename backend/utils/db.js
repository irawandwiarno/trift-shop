const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const dbcon = mongoose.connect('mongodb://127.0.0.1:27017/trift', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

module.exports = dbcon;

// export default dbcon;

