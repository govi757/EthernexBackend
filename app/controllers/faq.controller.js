const FAQModel = require("../models/FAQModel");
const mongoose = require('mongoose');
exports.addFAQ = (req, res) => {
    console.log(req.body);
    if (!req.body.title || !req.body.description ) {
        return res.status(400).send({
            message: "Please enter all the credentials"
        });
    }
    const faq = new FAQModel({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type || '',
    });

    faq.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            {
                message: err
            }
        );
    })
};


exports.updateFAQ = (req, res) => {
    if (req.body.FAQId !== null) {
        FAQModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.FAQId)}, {title: req.body.title, description: req.body.description, type: req.body.type || '',}, {useFindAndModify:true}).then(serviceUpdatedResponse => {
            res.send({
                message: 'Success',
                data: serviceUpdatedResponse
            });
        }).catch(err => {
            res.status(500).send(
                {
                    message: err || 'Error'
                }
            );
        });
    }
}

exports.deleteFAQ = async (req, res) => {
    FAQModel.deleteOne({ _id: req.body.FAQId }).then(service => {
            res.send(service);
        }).catch(err => {
            res.status(500).send({
                message: "Server Error" || err
            })
        });
}


exports.getFAQList= (req, res) => {
    FAQModel.find({type: req.params.type}).then(team => {
        res.send(team);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}

exports.getAllFAQList= (req, res) => {
    FAQModel.find().then(team => {
        res.send(team);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}