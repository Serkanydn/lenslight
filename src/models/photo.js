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
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:'User'
    },
    url:{
        type:String,
        required: true
    },
    image_id:{
        type:String,
        
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Photo', PhotoSchema)