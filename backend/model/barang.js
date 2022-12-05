// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const barang = mongoose.model('barang', {
    idTroli: String,
    title: {
        type: String,
        required: true,
    },
    price: Number,
    deskripsi: String,
    image: String,
});

module.exports = barang;