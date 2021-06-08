const { getMeetingList } = require('../controllers/meeting.controller');
const { getSubscriberList } = require('../controllers/subscriber.controller');
const { getCompanyDetails } = require('../controllers/user.controller');

module.exports = (app) => {
    const serviceController = require('../controllers/service.controller');
    const carouselController = require('../controllers/carousel.controller');
    const basicInfoController = require('../controllers/basicInfo.controller');
    const teamController = require('../controllers/team.controller');
    const faqController = require('../controllers/faq.controller');
    app.get('/api/services-list/:type', serviceController.getServiceList);
    app.get('/api/carousel-list/:screen', carouselController.getCarouselList);
    app.get('/api/basicinfo-list/:screen', basicInfoController.getBasicInformationsList);
    app.get('/api/basicinfo-list/', basicInfoController.getAllBasicInformationsList);
    app.get('/api/get-team-member-list/', teamController.getTeamMemberList);
    app.get('/api/get-faq-list/:type', faqController.getFAQList);
    app.get('/api/get-all-faq-list', faqController.getAllFAQList);
    app.get('/api/get-subscriber-list', getSubscriberList);
    app.get('/api/get-meeting-list', getMeetingList);
    app.get('/api/get-company-details', getCompanyDetails);
    
}