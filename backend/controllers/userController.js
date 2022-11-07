const { userService } = require('../services');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await userService.insert(req.body);
        console.log(user)
        res.status(201).json({
            succeded: true,
            user
        })
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
        console.log(bcrypt.compare(password, user.password))

        if (!user || !bcrypt.compare(password, user.password))
            return res.status(401).json({
                succeded: false,
                error:"There is no such user"
            })

        console.log(user)
        res.status(201).json({
            succeded: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


module.exports = { createUser, loginUser }