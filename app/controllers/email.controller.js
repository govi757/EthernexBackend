var nodemailer = require('nodemailer');
const appConfig = require('../../config/app.config');

var transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: appConfig.nodeMailerHost,
    auth: {
        user: appConfig.nodeMailerUserName,
        pass: appConfig.nodeMailerPassword
    },
    secure: true,
});



exports.sendMailToWezen = async (req, res) => {
    const htmlToSend = `
    <h1>${req.body.title||'Quotation Request'}</h1>
    <strong>email:</strong> ${req.body.email || 'NA'}, <br><strong>Phone Number:</strong> ${req.body.phoneNumber},<br><strong>Name:</strong> ${req.body.name}, <br><strong>Service:</strong> ${req.body.service||'NA'}, <br><strong>message:</strong> ${req.body.message||'Not Available'}<br><strong>DateTime:</strong> ${req.body.dateTime||'Not Available'}
    `

    this.sendEmail(htmlToSend, req, res);
}

exports.sendEmail = (htmlToSend, req, res) => {

    var mailOptions = {
        from: appConfig.nodeMailerEmailId,
        to: appConfig.companyEmailId,
        subject: req.body.title||'Quotation Request',
        html: htmlToSend
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send({
                message: 'erir'
            })
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send({
                message: 'success'
            })
        }
    });
}