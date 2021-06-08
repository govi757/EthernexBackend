const { Mongoose } = require("mongoose");
const MeetingModel = require("../models/MeetingModel");



exports.scheduleMeeting = (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "Please enter all the credentials"
        });
    }
    const user = new MeetingModel({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber || '',
        dateTime: req.body.dateTime,
        status: req.body.status || 'Created',
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


exports.updateMeeting = (req, res) => {
    if (req.body.teamMemberId !== null) {
        MeetingModel.findOneAndUpdate({_id: Mongoose.Types.ObjectId(req.body.teamMemberId)}, {name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber||'',imageUrl: req.body.imageUrl||'', dateTime: req.body.dateTime||''}, {useFindAndModify:true}).then(serviceUpdatedResponse => {
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

exports.deleteMeeting = async (req, res) => {
    MeetingModel.deleteOne({ _id: req.body.meetingId }).then(meeting => {
            res.send(meeting);
        }).catch(err => {
            res.status(500).send({
                message: "Server Error" || err
            })
        });
}


exports.getMeetingList= (req, res) => {
    MeetingModel.find().then(meeting => {
        res.send(meeting);
    }).catch(err => {
        res.status(500).send(
            {
                message: err || 'Error'
            }
        );
    })
}