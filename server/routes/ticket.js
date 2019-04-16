const express = require('express');
const Ticket = (require('../models/tickets'));
const { TicketController } = require('../controllers/ticketController');
const { authenticateToken } = require('../middlewares/authentications');

// ================================================

const app = express();

// ================================================

app.post('/buy/:roomId/:cinemaFunction', authenticateToken, (req, res) => {
    let ticket = new TicketController(req, res);
    ticket.create();
});

app.get('/buy/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    Ticket.findById(id, (err, ticketDB) => {

        if(err) {                                                                                                                                                                                                                                                                                                                                           
            return res.status(500).json({
                err: {
                    message: 'Server error.'
                }
            });
        }

        if(!ticketDB) {
            return res.status(400).json({
                err: {
                    message: 'Bad request.'
                }
            });
        }
        
        res.json(ticketDB);                                                                                                                                                                                                      
    })
    .populate('cinemaFunction', 'name date time cinema movieRoom movie');

});

// =================================================

module.exports = app;