const { userService } = require('../services');
const { auth } = require('../utils');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const user = await userService.insert(req.body);
        
        const token = auth.createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        })

        res.redirect('/users/dashboard');

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userService.findBy("userName", userName);

        if (!user || !bcrypt.compare(password, user.password))
            return res.status(401).json({
                succeded: false,
                error: "There is no such user"
            })

        const token = auth.createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        })

        res.redirect('/users/dashboard');
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


const getDashboardPage = (req, res) => {
    res.render('dashboard',
        {
            link: 'dashboard'
        }
    )
}

module.exports = { createUser, loginUser, getDashboardPage }