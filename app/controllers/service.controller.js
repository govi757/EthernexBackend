const ServiceModel = require('../models/ServicesModel');
const mongoose = require('mongoose');
const { validateSession } = require('../controllers/user.controller');
exports.addService = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        const service = new ServiceModel({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type || 'basic',
            imageUrl: req.body.imageUrl || '',
            subType: req.body.subType || ''
        });

        service.save().then(data => {
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


exports.updateService = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        if (req.body.screenId !== null) {
            ServiceModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.serviceId) }, { title: req.body.title, description: req.body.description, type: req.body.type || 'basic', imageUrl: req.body.imageUrl || '', subType: req.body.subType || '' }, { useFindAndModify: true }).then(serviceUpdatedResponse => {
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
}

exports.deleteService = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        ServiceModel.deleteOne({ _id: req.body.serviceId }).then(service => {
            res.send(service);
        }).catch(err => {
            res.status(500).send({
                message: "Server Error" || err
            })
        });
    }
}

exports.getServiceList = (req, res) => {
    ServiceModel.find({ type: req.params.type }).then(services => {
        res.send(services);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}
