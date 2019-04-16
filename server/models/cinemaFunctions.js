const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ================================================

let cinemaFunctionSchema = new Schema({
    name: { type: String, required: true },
    movieRoom: { type: Schema.Types.ObjectId, ref: 'CinemaRoom' },
    status: { type: Boolean, required: true, default: true },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    cinema: { type: Schema.Types.ObjectId, ref: 'Cinema' }, 
    date: { type: String, required: true },
    time: { type: String, required:true },
    ticketPrice: { type: Number, required: true, default: 50 }
});

// ================================================

module.exports = mongoose.model('CinemaFunction', cinemaFunctionSchema);