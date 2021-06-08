const mongoose = require('mongoose');

const ServicesModel = mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('ServicesModel', ServicesModel);