const router = require('express').Router();
const {getIndexPage,getAboutPage,getRegisterPage}=require('../controllers/pageController')


router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);



module.exports = router
