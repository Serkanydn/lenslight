const jwt = require('jsonwebtoken')
const { userService } = require('../services')

class Auth {
    createToken = (userId) => {
        return jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
    }

    autenticateToken(req, res, next) {

        try {
            const token = req.cookies.jwt;

            if (!token) return res.redirect('/login');

            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) return res.redirect('/login');

                next();
            });

        } catch (error) {
            res.status(401).json({
                succeded: false,
                error: 'Not authorized'
            })
        }
    }
}


module.exports = new Auth();