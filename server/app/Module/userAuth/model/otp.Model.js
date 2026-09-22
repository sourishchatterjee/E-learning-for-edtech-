const mongoose = require('mongoose');

const verifyEmail = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true]
    },
    otp: {
        type: Number,
        required: [true]
    },
    isOtpSend:{
        type:Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: '4m'
    }
})


const verifyEmailModel = mongoose.model('emilVerify', verifyEmail);
module.exports = verifyEmailModel;