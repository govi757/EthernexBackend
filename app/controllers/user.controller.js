const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken');
const { findOne } = require("../models/UserModel");
const databaseConfig = require("../../config/database.config");
const email = require('../controllers/email.controller');
const appConfig = require("../../config/app.config");

exports.signup = (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "Please enter all the credentials"
        });
    }
    let password = Math.random().toString(36).substring(7);
    // let password = 'abcd';
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber || '',
        password: createHash(password)
    });

    user.save().then(data => {
        const html = `<strong>Email: </strong>  ${req.body.email}<br><strong>Password: </strong>  ${password}`
        email.sendEmail(html, req, res)
        // res.send(data);
        
    }).catch(err => {
        res.status(500).send(
            {
                message: err
            }
        );
    })
};
exports.updateUser = async (req, res) => {
    UserModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.userId)}, {name: req.body.name}).then(updateProjectResponse => {
        res.send({
            message: "Success",
            body: updateProjectResponse
        })
    })
}
exports.login = (req, res) => {
    UserModel.findOne({ email: req.body.email }).then(student => {
        bcrypt.compare(req.body.password, student.password, function (err, passwordMatched) {
            if (passwordMatched == true) {
                let token = jwt.sign({ email: student.email }, databaseConfig.JWT_SECRET, { expiresIn: '100d' });
                console.log(student, "Studenet")
                req.session.userId = student._id;
                req.session.userName = student.name
                req.session.isLoggedin = 'True'
                req.session.userImage = req.body.photo
                req.session.save(function(err) {
                    // session saved
                    console.log('Saved session')
                  })
                res.send({
                    message: "Success",
                    token: token
                });
            } else {
                res.status(400).send({
                    message: "Password doesnot match"
                });
            }
        });
    }).catch(err => {
        res.status(500).send({
            message: "Server Error" || err
        })
    });
}
exports.logout = (req, res) => {
    var userIdSession = req.session.userId;
    var userNameSession = req.session.userName;
    if (userIdSession) {
        req.session.userId = null
    }
    if (userNameSession) {
        req.session.userName = null;
    }

    res.send({
        message: "Logout successfull"
    });
}
var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

exports.sendEmail = (req, res) => {

}
exports.getCompanyDetails = (req, res) => {
    const body = {
        emailId: appConfig.companyEmailId,
        address: appConfig.companyAddress,
        phoneNumber: appConfig.companyPhoneNumber,
        location: appConfig.companyLocation,
        videoUrl: appConfig.companyVideoUrl,
        facebookLink: appConfig.facebookLink,
        instaLink: appConfig.instaLink,
        linkedinLink: appConfig.linkedinLink,
        twitterLink: appConfig.twitterLink,
        youtubeLink: appConfig.youtubeLink
    }
    res.send({
        data: body
    })
}


exports.validateSession = (req, res) => {
    console.log(req.session.userId, req.session.isLoggedin, "Userid");
    if (!req.session.userId) {
        res.status(401).send({
            message: "Auth error"
        })
        return false
    }
    return true
}