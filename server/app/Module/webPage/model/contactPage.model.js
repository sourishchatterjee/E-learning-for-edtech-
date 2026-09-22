

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactModel = new schema({
    
    name:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:[true]
    },
    subject:{
        type:String,
        required:[true]
    },
    message:{
        type:String,
        required:[true]
    }
})


module.exports = mongoose.model('contactModel',contactModel);