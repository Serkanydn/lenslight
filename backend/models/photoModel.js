const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Photo', PhotoSchema)