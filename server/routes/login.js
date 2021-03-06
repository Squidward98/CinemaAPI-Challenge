const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/users');

// ================================================

const app = express();

// =================================================

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        
        if(err) {
            return res.status(500).json({
                err: {
                    message: 'Server error.'
                }
            });
        }

        if(!userDB) {
            return res.status(500).json({
                err: {
                    message: 'User or password not found.'
                }
            });
        }

        if(!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(500).json({
                err: {
                    message: 'User or password not found.'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_DATE_TOKEN });

        res.json({
            userDB,
            token
        });

    });

});

// =================================================

module.exports = app;
