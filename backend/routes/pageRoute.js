const router = require('express').Router();
const {getIndexPage,getAboutPage}=require('../controllers/pageController')


router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);



module.exports = router
