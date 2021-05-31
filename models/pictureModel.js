const mongoose = require ('mongoose')
const { Schema } = require ('mongoose')
const tagModel = require ('./tagModel.js')

const pictureSchema = mongoose.Schema ({
    pictureName : String,
    creator : String,
    description : String,
    img : String,
    createdAt : {
        type : Date,
        default : new Date(),
    },
    themeLinked : String,
    tags : [
        {
        type : Schema.Types.ObjectId,
        ref : "tagModel"
        }
    ]   
})

module.exports = mongoose.model('pictureModel', pictureSchema)


