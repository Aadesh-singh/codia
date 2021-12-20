const mongoose = require('mongoose');


const forgetPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean
    }
}, {
    timestamps: true
});

const ForgetPassword = mongoose.model('ForgetPassword', forgetPasswordSchema);

module.exports = ForgetPassword;