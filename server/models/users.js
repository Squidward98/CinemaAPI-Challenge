const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// ================================================

let roleValues = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} it is not a valid role...',
}
let Schema = mongoose.Schema;
let userSchema = new Schema({
    
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER_ROLE', enum: roleValues },
    status: { type: Boolean, default: true },

});

// ================================================

userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password

    return userObject;

}

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique...'});

// ================================================

module.exports = mongoose.model('User', userSchema);