const SubscribersModel = require("../models/SubscribersModel");


exports.addSubscriber = (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "Please enter all the credentials"
        });
    }
    const user = new SubscribersModel({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber || '',
        role: req.body.role
    });

    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            {
                message: err
            }
        );
    })
};


exports.updateSubscriber = (req, res) => {
    if (req.body.teamMemberId !== null) {
        SubscribersModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.teamMemberId)}, {name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber||'',imageUrl: req.body.imageUrl||'', role: req.body.role||''}, {useFindAndModify:true}).then(serviceUpdatedResponse => {
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

exports.deleteSubscriber = async (req, res) => {
    SubscribersModel.deleteOne({ _id: req.body.teamMemberId }).then(service => {
            res.send(service);
        }).catch(err => {
            res.status(500).send({
                message: "Server Error" || err
            })
        });
}


exports.getSubscriberList= (req, res) => {
    SubscribersModel.find().then(team => {
        res.send(team);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}