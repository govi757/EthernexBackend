const mongoose = require('mongoose');

const BasicInformationsModel = mongoose.Schema({
    title: String,
    description: String,
    screen: String,
    imageUrl: String,
    description1: String,
    description2: String,
    description3: String,
    description4: String,
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('BasicInformationsModel', BasicInformationsModel);