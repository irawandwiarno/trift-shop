const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
// const dataUser = require('./model/datauser.js');
// const bodyParser = require('body-parser');
const dbconn = require('./utils/db.js');
const dataUser = require('./model/datauser');
const bodyParser = require('body-parser');
const barang = require('./model/barang.js');
const troli = require('./model/troli.js');
const _ = require('underscore');
const multer = require('multer');
const path = require('path');


// import cors from 'cors';
// import express from 'express';
// import mongoose from 'mongoose';
// import expressLayouts from 'express-ejs-layouts';
// import dataUser from './model/datauser.js';
// import bodyParser from 'body-parser';
// import dbconn from './utils/db.js';
// import barang from './model/barang.js';
// import troli from './model/troli.js';
// import * as _ from 'underscore';
// import multer from 'multer';
// import path from 'path';

dbconn;
const app = express();
const port = 3000;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jfif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors({ origin: ['http://localhost:8082'], }));
app.get('/', async (req, res) => {
    const dataUsers = await dataUser.find();
    res.json(dataUsers);
    
});
app.get('/user/getOne', async (req, res) => {
    const {id} = req.query;
    const dataUsers = await dataUser.findById(id);
    res.json({
        status: "ok",
        message: "user ditemukan",
        data: dataUsers,
    });
});

app.get('/home', async (req, res) => {
    const dataBarang = await barang.find();
    res.json(dataBarang);
});

app.post('/barang', async (req, res) => {
    if (!req.file) {
        console.log("image harus di upload");
    }

    const title = req.body.title;
    const deskripsi = req.body.deskripsi;
    const price = req.body.price;
    const image = req.file.path;
    const barang1 = new barang({
        title: title,
        deskripsi: deskripsi,
        price: price,
        image: image,
    });
    barang1.save().then((res) => console.log(res));
    res.json({
        status: "Sukses",
        message: "sukses upload",
        data: barang1
    });
});


app.delete('/api/barang', async (req, res) => {
    const { id } = req.query;

    barang.findByIdAndDelete(id,(error,data) => {
        if (error) {
            console.log('error in deleting!');
            throw error;
        } else {
            res.json({
                status: "sukses",
                message: "Berhasil delete",
                data:data
            });
        }
    })
});

app.post('/api/addtroli', async (req, res) => {
    const addTroli = req.body;
    const troli1 = new troli(addTroli);
    troli1.save().then((result) => {
        // console.log(result)
        res.json(req.body);
    });
});

app.get('/api/troli', async (req, res) => {
    const { iduser } = req.query;
    const trolis = [];
    if (iduser != undefined) {
        const card = await troli.find({ idUser: iduser });
        // console.log(iduser);
        if (card.length > 0) {
            for (let i = 0; i < card.length; i++) {
                let idbarang = card[i].idBarang;
                let idtroli = card[i]._id;
                let barang1 = await barang.find({ _id: idbarang });
                let barang2 = barang1[0];
                barang2['idTroli'] = idtroli;
                trolis.push(barang2);
            }
            res.json({
                status: "sukses",
                message: "Card Ditemukan",
                data:trolis
            });
        } else {
            res.json({
                status: "sukses",
                message: "Cart Kosong",
                data:{}
            })
        }
    } else {
        res.json({
            status: "Gagal",
            message: "Id Tidak ada",
            data: {}
        });
    }
});


app.delete('/api/troli', async (req, res) => {
    const { id }  = req.query;
    // console.log(id);

    troli.findByIdAndDelete(id,(error,data) => {
        if (error) {
            console.log('error in deleting!');
            throw error;
        } else {
            console.log('user has been deleted', data);
            res.status(204).json(data);
        }
    })
});

app.post('/api-register', async (req, res) => {
    const body = req.body;
    const buatAkun = new dataUser(body);
    buatAkun.save().then((result) => {
        const data = {
            status: "sukses",
            message: "Register sukses",
            data: body
        };
        res.json(data);
    })
});

app.get('/api-login', async (req, res) => {
    const { Email, password } = req.query;
    
    if (Email != undefined && password != undefined) {
        const cari = await dataUser.findOne({ email: Email });
        // console.log(cari);

        if (cari != undefined) {
            if (cari.password == password) {
                res.json({
                    status: "sukses",
                    message: "User Ditemukan",
                    data: {
                        id: cari._id,
                        email: cari.email,
                        username: cari.username,
                        role: cari.role
                    }
                })
            } else {
                res.json({
                    status: "Gagal",
                    message: "Password Salah",
                    data: {}
                })
            }
        } else {
            res.json({
                status: "Gagal",
                message: "User Tidak Ada",
                data: {}
            })
        }
    } else {
        res.json({
            status: "Gagal",
            message: "Ga ada data yang lu kirim bodo",
            data: {}
        })
    }
});

app.get('/api/get-barang', async (req, res) => {
    const { id } = req.query;
    const cari = await barang.findById(id);
    // console.log(cari);
    // console.log(id);
    if (cari != undefined) {
        res.json({
            status: "sukses",
            message: "barang ditemukan",
            data: cari
        });
    } else {
        res.json({
            status: "gagal",
            message: "Tidak ditemukan",
            data: {}
        });
    }
});

app.put('/api/update-barang', async(req,res)=>{
    const body = req.body;
    const id = body.id;
    const deskripsi = body.deskripsi;
    const title = body.title;
    const price = body.price;

    const data = {
        title: title,
        price: price,
        deskripsi: deskripsi
    };

    const cari = await barang.findByIdAndUpdate(id, data).then((result) => {
        res.json({
            status: "sukses",
            message: "Berhasil meng-Update",
            data: result
        });
    });


    


    // data.save().then((result) => {
    //     res.json({
    //         status: "sukses",
    //         message: "Update sukses",
    //         data: data
    //     });
    // })
})

app.listen(port, () => {
    console.log(`open http://localhost:${port}`);
})


