const router = require('express').Router();
const { createUser } = require('../controllers/userController');

router.route('/register')
    .post(createUser)

module.exports = router