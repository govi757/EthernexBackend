const mongoose = require('mongoose');

const CarouselModel = mongoose.Schema({
    title: String,
    description: String,
    screen: String,
    imageUrl: String,
    type: String,
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('CarouselModel', CarouselModel);