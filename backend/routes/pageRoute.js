const router = require('express').Router();
const { getIndexPage, getAboutPage, getRegisterPage, getLoginPage } = require('../controllers/pageController')


router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);
router.route('/login').get(getLoginPage);



module.exports = router
