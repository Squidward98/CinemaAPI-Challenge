const{ Controller }  = require('./controller');
const Ticket = require('../models/tickets');
const CinemaRoom = require('../models/cinemaRooms');
const CinemaFunction = require('../models/cinemaFunctions');
const _ = require('underscore');

// ================================================

class TicketController extends Controller {

    create() {
        let body = _.pick(this.req.body, ['amount', 'cinemaFunction', 'user', 'price']);
        let functionId = this.req.params.cinemaFunction;
        let roomId = this.req.params.roomId;
        
        this._calculatePrice(functionId, roomId, body.amount, (price) => {
            body.price = price;

            CinemaRoom.findById(roomId, (err, roomDB) => {
                this._genericErrorRes(err, roomDB);
    
                if(roomDB.status !== false){
                    if(roomDB.capacity <= 0){
                        roomDB.status = false;
                        roomDB.save((err, roomDB) => {
                            this._genericErrorRes(err, roomDB);                 
                        });
                        return this.res.json({
                            err: {
                                message: 'Theres is no capacity in the movie room.'
                            }
                        });
                    } else {
                        roomDB.capacity = roomDB.capacity - body.amount;
                        if(roomDB.capacity <= 0) {
                            return this.res.json({
                                err: {
                                    message: 'Theres is no capacity in the movie room.'
                                }
                            });
                        }
                        else if(roomDB.capacity >= 0) {
                            roomDB.save((err, roomDB) => {    
                                this._genericErrorRes(err, roomDB);
                            });
                            let ticket = new Ticket(body);
                            ticket.save((err, ticketDB) => {
                                this._genericErrorRes(err, ticketDB);
                                this.res.json(ticketDB);                        
                            });
                        }
                    }  
                }
            });
        });
    }

    _calculatePrice(functionId, roomId, amount, callback) {
        CinemaFunction.findById(functionId, (err, cinemaFunctionDB) => {
            
            this._genericErrorRes(err, cinemaFunctionDB);

            CinemaRoom.findById(roomId, (err, roomDB) => {
                this._genericErrorRes(err, roomDB);
                if(roomDB.status === false) {
                    cinemaFunctionDB.status = false;
                    cinemaFunctionDB.save((err, cinemaFunctionDB) => {
                        this._genericErrorRes(err, cinemaFunctionDB);                 
                    });
                }
            });

            if(cinemaFunctionDB.status !== false){
                let price = cinemaFunctionDB.ticketPrice * amount;
                callback(price);
            } else {
                return this.res.json({
                    err: {
                        message: 'Cinema function not available.'
                    }
                });
            }
        });
    }
}

// =================================================

module.exports = {
    TicketController
}