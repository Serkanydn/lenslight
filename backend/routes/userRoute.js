const router = require('express').Router();
const { createUser,loginUser } = require('../controllers/userController');

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(loginUser)

module.exports = router