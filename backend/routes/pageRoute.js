const router = require('express').Router();
const { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout } = require('../controllers/pageController')
const { auth } = require('../utils');

router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);
router.route('/login').get(getLoginPage);
router.route('/logout').get(getLogout);



module.exports = router
