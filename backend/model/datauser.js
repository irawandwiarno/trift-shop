//Membuat schema
const mongoose = require('mongoose');
// import mongoose from 'mongoose';


const dataUser = mongoose.model('dataUser', {
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = dataUser;
// export default dataUser;