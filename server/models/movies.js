const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ================================================

let movieSchema = new Schema({
    title: { type: String, required: [true, 'Name is required.'] },
    synopsis: { type: String, required: false },
    movieDirector: { type: String, required: true },
    cast: { type: String, required: true },
    classificationByAge: {type: String, required: true }, 
    status: { type: Boolean, required: true, default: true },
    category: { type: String, required: true },
});

// ================================================

module.exports = mongoose.model('Movie', movieSchema);