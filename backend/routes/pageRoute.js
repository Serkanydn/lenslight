const router = require('express').Router();
const { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout, getContactPage,sendMail } = require('../controllers/pageController')
const { auth } = require('../utils');

router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);
router.route('/login').get(getLoginPage);
router.route('/logout').get(getLogout);
router.route('/contact').get(getContactPage);
router.route('/contact').post(sendMail);


 
module.exports = router
