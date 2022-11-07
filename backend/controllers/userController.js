const { userService } = require('../services');

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

module.exports = { createUser }