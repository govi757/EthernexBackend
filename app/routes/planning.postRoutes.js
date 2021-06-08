const appConfig = require('../../config/app.config');
const { sendMailToWezen } = require('../controllers/email.controller');
const { upload } = require('../controllers/imageUploadController');
const { scheduleMeeting, deleteMeeting } = require('../controllers/meeting.controller');
const { addSubscriber, deleteSubscriber } = require('../controllers/subscriber.controller');

module.exports = (app) => {
    const userController = require('../controllers/user.controller');
    const serviceController = require('../controllers/service.controller');
    const carouselController = require('../controllers/carousel.controller');
    const basicInfoController = require('../controllers/basicInfo.controller');
    const teamController = require('../controllers/team.controller');
    const faqController = require('../controllers/faq.controller');
    app.post('/api/signup', userController.signup);
    // app.post('/api/update-user', userController.updateUser);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
    // app.post('/api/add-screen', screenController.addScreen);
    // app.post('/api/update-screen', screenController.updateScreen);
    // app.post('/api/add-home-screen', homeScreenController.addScreen);
    // app.post('/api/update-home-screen', homeScreenController.updateScreen);
    app.post('/api/add-service', serviceController.addService);
    app.post('/api/update-service', serviceController.updateService);
    app.post('/api/delete-service', serviceController.deleteService);
    app.post('/api/add-carousel', carouselController.addCarousel);
    app.post('/api/update-carousel', carouselController.updateCarousel);
    app.post('/api/delete-carousel', carouselController.deleteCarousel);
    
    app.post('/api/add-basicinfo', basicInfoController.addBasicInformations);
    app.post('/api/update-basicinfo', basicInfoController.updateBasicInformations);
    app.post('/api/delete-basicinfo', basicInfoController.deleteBasicInformations);
    app.post('/api/add-team-member', teamController.addTeamMember);
    app.post('/api/update-team-member', teamController.updateTeamMember);
    app.post('/api/delete-team-member', teamController.deleteTeamMember);
    app.post('/api/add-faq', faqController.addFAQ);
    app.post('/api/update-faq', faqController.updateFAQ);
    app.post('/api/delete-faq', faqController.deleteFAQ);
    app.post('/api/send-email', sendMailToWezen);

    app.post('/api/add-subscriber', addSubscriber);
    app.post('/api/delete-subscriber', deleteSubscriber);
    app.post('/api/schedule-meeting', scheduleMeeting);
    app.post('/api/delete-meeting', deleteMeeting);
    
    app.post('/api/upload',upload.single('file'),function(req, res, next) {
        console.log(req.file);
        if(!req.file) {
          res.status(500);
          return next(err);
        }
        res.json({ fileUrl: appConfig.backendUrl + '/images/' + req.file.filename });
      })
}