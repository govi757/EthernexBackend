const mongoose = require('mongoose');

const FAQModel = mongoose.Schema({
    title: String,
    description: String,
    type: String,
},
    {
        timeStamps: true
    });
module.exports = mongoose.model('FAQModel', FAQModel);