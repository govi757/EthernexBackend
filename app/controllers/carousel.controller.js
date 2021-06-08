const CarouselModel = require('../models/CarouselModel');
const mongoose = require('mongoose');
const { unlinkAsync } = require('./imageUploadController');
const { validateSession } = require('./user.controller');
exports.addCarousel = async (req, res) => {
    console.log(req.session)
    const isValid = validateSession(req, res);
    if (isValid) {
        const Carousel = new CarouselModel({
            title: req.body.title,
            description: req.body.description,
            screen: req.body.screen || 'common',
            imageUrl: req.body.imageUrl || '',
            type: req.body.type || '',
        });

        Carousel.save().then(data => {
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


exports.updateCarousel = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        if (req.body.screenId !== null) {
            CarouselModel.findOne({ _id: mongoose.Types.ObjectId(req.body.carouselId) }).then(carousel => {
                const imageNameArr = carousel.imageUrl.split('/');
                const imageName = imageNameArr[imageNameArr.length - 1];
                CarouselModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.carouselId) }, { title: req.body.title, description: req.body.description, type: req.body.type || '', imageUrl: req.body.imageUrl || '' }, { useFindAndModify: true }).then(CarouselUpdatedResponse => {
                    if(req.body.imageUrl !== carousel.imageUrl) {
                        unlinkAsync('./public/images/' + imageName)
                    }
                    res.send({
                        message: 'Success',
                        data: CarouselUpdatedResponse
                    });
                }).catch(err => {
                    res.status(500).send(
                        {
                            message: err || 'Error'
                        }
                    );
                });
            })

        }
    }
}

exports.deleteCarousel = async (req, res) => {
    const isValid = await validateSession(req, res);
    if (isValid) {
        CarouselModel.findOne({ _id: mongoose.Types.ObjectId(req.body.carouselId) }).then(carousel => {
            const imageNameArr = carousel.imageUrl.split('/');
            const imageName = imageNameArr[imageNameArr.length - 1];
            CarouselModel.deleteOne({ _id: req.body.carouselId }).then(Carousel => {
                unlinkAsync('./public/images/' + imageName)
                res.send(Carousel);
            }).catch(err => {
                res.status(500).send({
                    message: "Server Error" || err
                })
            });
        })
    }
}

exports.getCarouselList = (req, res) => {
    console.log(req.params.screen);
    CarouselModel.find({ screen: req.params.screen }).then(Carousels => {
        res.send(Carousels);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}