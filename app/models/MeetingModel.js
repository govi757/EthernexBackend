const mongoose = require('mongoose');

const MeetingModel = mongoose.Schema({
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
    },
    phoneNumber: {
        
    },
    dateTime: {
        type: String
    },
    status: {type: String}
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('MeetingModel', MeetingModel);