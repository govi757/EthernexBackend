const BasicInformationsModel = require('../models/BasicInformationsModel');
const mongoose = require('mongoose');
const { validateSession } = require('./user.controller');
exports.addBasicInformations = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        const BasicInformations = new BasicInformationsModel({
            title: req.body.title,
            description: req.body.description,
            screen: req.body.screen || 'common',
            imageUrl: req.body.imageUrl || '',
            description1: req.body.description1 || '',
            description2: req.body.description2 || '',
            description3: req.body.description3 || '',
            description4: req.body.description4 || '',

        });

        BasicInformations.save().then(data => {
            console.log("success")
            res.send(data);
        }).catch(err => {
            console.log(JSON.stringify(err))
            res.status(500).send(
                {
                    message: err || 'Error'
                }
            );
        })
    }
}


exports.updateBasicInformations = async (req, res) => {
    // const isValid = await validateSession(req, res);
    // if (isValid) {
        if (req.body.basicInformationsId !== null) {
            BasicInformationsModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.basicInformationsId) }, {
                title: req.body.title,
                description: req.body.description,
                type: req.body.type || 'basic',
                imageUrl: req.body.imageUrl || '',
                description1: req.body.description1,
                description2: req.body.description2,
                description3: req.body.description3,
                description4: req.body.description4,

            }, { useFindAndModify: true }).then(BasicInformationsUpdatedResponse => {
                res.send({
                    message: 'Success',
                    data: BasicInformationsUpdatedResponse
                });
            }).catch(err => {
                res.status(500).send(
                    {
                        message: err || 'Error'
                    }
                );
            });
        }
    // }
}

exports.deleteBasicInformations = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        BasicInformationsModel.deleteOne({ _id: req.body.basicInformationsId }).then(BasicInformations => {
            res.send(BasicInformations);
        }).catch(err => {
            res.status(500).send({
                message: "Server Error" || err
            })
        });
    }
}

exports.getBasicInformationsList = (req, res) => {
    BasicInformationsModel.find({ screen: req.params.screen }).then(BasicInformationss => {
        res.send(BasicInformationss);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}

exports.getAllBasicInformationsList = (req, res) => {
    BasicInformationsModel.find().then(BasicInformationss => {
        res.send(BasicInformationss);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}