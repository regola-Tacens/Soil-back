const mongoose = require ('mongoose')

const pictureSchema = mongoose.Schema ({
    pictureName : String,
    creator : String,
    description : String,
    img : String,
    createdAt : {
        type : Date,
        default : new Date(),
    },
    themeLinked : String   
})

module.exports = mongoose.model('pictureModel', pictureSchema)


