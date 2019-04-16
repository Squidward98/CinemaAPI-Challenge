const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ================================================

let ticketSchema = new Schema({
    amount: { type: Number, required: true, default: 1, require: true },
    cinemaFunction: { type: Schema.Types.ObjectId, ref: 'CinemaFunction', required: true},
    price: { type: Number, required: true, default: 50 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

// ================================================

module.exports = mongoose.model('Ticket', ticketSchema);