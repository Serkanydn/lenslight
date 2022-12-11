const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User name area is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Only Alphanumaris characters']
    },
    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, 'Valid email is required']
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [4, 'At least 4 characters']
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
    {
        timestamps: true
    }
)

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });

})

module.exports = mongoose.model('User', UserSchema)