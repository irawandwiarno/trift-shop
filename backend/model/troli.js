// import mongoose from 'mongoose'
const mongoose = require('mongoose');


const troli = mongoose.model('troli', {
    idUser: String,
    idBarang: String,
});


module.exports = troli;
// export default troli;