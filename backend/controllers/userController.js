const { userService, photoService } = require('../services');
const { auth } = require('../utils');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const user = await userService.insert(req.body);

        const token = auth.createToken(user._id);

        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 60 * 24
        // })

        // res.redirect('/users/dashboard');

        res.status(200).json({ user: user._id })

    } catch (error) {

        console.log(error)
        let errors = {};

        //Eğer aynı email varsa direk hata kodu fırlatıyor.
        if (error.code === 11000) {
            errors.email = 'The email is already registered';
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            })
        }

        res.status(400).json(
            errors,
        )
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userService.findOne("userName", userName);

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


const getDashboardPage = async (req, res) => {
    const photos = await photoService.find( 'user', res.locals.user)
    res.render('dashboard',
        {
            link: 'dashboard',
            photos
        }
    )
}

module.exports = { createUser, loginUser, getDashboardPage }