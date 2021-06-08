const mongoose = require('mongoose');

const ServicesModel = mongoose.Schema({
    title: String,
    description: String,
    type: String,
    imageUrl: String,
    subType: String
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('ServicesModel', ServicesModel);