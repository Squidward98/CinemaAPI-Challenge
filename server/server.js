require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//============================

const app = express()

//============================


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if(err) throw err;
    console.log('Database ONLINE');
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${ process.env.PORT }!`));