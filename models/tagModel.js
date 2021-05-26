const mongoose = require ('mongoose')

const tagSchema = mongoose.Schema ({
    posX : Number,
    posY : Number,
    creator : String,
    message : String,
    createdAt : {
        type : Date,
        default : new Date(),
        },
    })
    
 module.exports = mongoose.model('tagModel', tagSchema)