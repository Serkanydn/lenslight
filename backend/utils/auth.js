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

    checkUser(req, res, next) {
        const token = req.cookies.jwt;

        if (!token) {
            res.locals.user = null;
            return next();

        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                return next();
            }

            const user = await userService.findById(decodedToken.userId);
            res.locals.user = user;
            next();
        });


    }
}


module.exports = new Auth();