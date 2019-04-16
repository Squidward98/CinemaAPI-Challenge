const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ================================================

let cinemaRoomSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie', default: [] }], 
    cinema: { type: Schema.Types.ObjectId, ref: 'Cinema' }
});

// ================================================

module.exports = mongoose.model('CinemaRoom', cinemaRoomSchema);