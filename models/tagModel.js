const mongoose = require ('mongoose')
const { Schema } = require ('mongoose')
const pictureModel = require ('../models/pictureModel.js')

const tagSchema = mongoose.Schema ({
    posX : Number,
    posY : Number,
    creator : String,
    message : String,
    createdAt : {
        type : Date,
        default : new Date(),
        },
    pictureLink : {
        type : Schema.Types.ObjectId,
        ref : "pictureModel"
    }
    })
    
 module.exports = mongoose.model('tagModel', tagSchema)

