const router = require('express').Router();
const { createUser, loginUser, getDashboardPage, getAllUsers, getAUser, follow, unFollow } = require('../controllers/userController');
const { auth } = require('../utils');

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(loginUser)

router.route('/dashboard')
    .get(auth.autenticateToken, getDashboardPage)

router.route('/').get(auth.autenticateToken, getAllUsers)
router.route('/:id').get(auth.autenticateToken, getAUser)

router.route('/:id/follow').put(auth.autenticateToken,follow)
router.route('/:id/unFollow').put(auth.autenticateToken,unFollow)

module.exports = router