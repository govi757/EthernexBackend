const mongoose = require('mongoose');

const SubscriberModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    phoneNumber: {
        
    },
    role: {
        type: String
    }
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('SubscriberModel', SubscriberModel);