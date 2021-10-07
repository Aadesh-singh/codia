const mongoose = require('mongoose');

const signUp = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const signUpUsers = new mongoose.model('signInUsers', signUp);

module.exports = signUpUsers;