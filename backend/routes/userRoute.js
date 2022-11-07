const router = require('express').Router();
const { createUser, loginUser, getDashboardPage } = require('../controllers/userController');
const { auth } = require('../utils');

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(loginUser)

router.route('/dashboard')
    .get(auth.autenticateToken, getDashboardPage)

module.exports = router