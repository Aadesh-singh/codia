const mongoose = require('mongoose');

const signIn = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const signInUser = new mongoose.model('signInUser', signIn);

module.exports = signInUser;