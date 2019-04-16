const express = require('express');
const CinemaRoom = (require('../models/cinemaRooms'));
const Cinema = (require('../models/cinemas'));
const CinemaFunction = (require('../models/cinemaFunctions'));
const { authenticateToken } = (require('../middlewares/authentications'));

// ================================================

const app = express();

// ================================================

app.get('/cinemas/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    Cinema.findById(id, (err, cinemaDB) => {

        if(err) {                                                                                                                                                                                                                                                                                                                                           
            return res.status(500).json({
                err: {
                    message: 'Server error.'
                }
            });
        }

        if(!cinemaDB) {
            return res.status(400).json({
                err: {
                    message: 'Bad request.'
                }
            });
        }
        
        res.json(cinemaDB);                                                                                                                                                                                                      
    })
    .populate('movieRooms', 'capacity name')
    .populate('movies', 'title category classificationByAge movieDirector status');

});

app.get('/rooms/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    CinemaRoom.findById(id, (err, roomDB) => {

        if(err) {                                                                                                                                                                                                                                                                                                                                           
            return res.status(500).json({
                err: {
                    message: 'Server error.'
                }
            });
        }

        if(!roomDB) {
            return res.status(400).json({
                err: {
                    message: 'Bad request.'
                }
            });
        }
        
        res.json(roomDB);                                                                                                                                                                                                      
    })
    .populate('movies', 'title synopsis classificationByAge category')
    .populate('cinema', 'name');

});

app.get('/functions/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    CinemaFunction.findById(id, (err, functionDB) => {

        if(err) {                                                                                                                                                                                                                                                                                                                                           
            return res.status(500).json({
                err: {
                    message: 'Server error.'
                }
            });
        }

        if(!functionDB) {
            return res.status(400).json({
                err: {
                    message: 'Bad request.'
                }
            });
        }
        
        res.json(functionDB);                                                                                                                                                                                                      
    })
    .populate('movieRoom', 'name capacity')
    .populate('cinema', 'name')
    .populate('movie', 'title');

});

// =================================================

module.exports = app;