const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ================================================

let cinemaSchema = new Schema({
    name: { type: String, required: [true, 'Name is required.'] },
    status: { type: Boolean, required: true, default: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie', default: [] }], 
    movieRooms: [{ type: Schema.Types.ObjectId, ref: 'CinemaRoom', default: [] }],
    
});

// ================================================

module.exports = mongoose.model('Cinema', cinemaSchema);