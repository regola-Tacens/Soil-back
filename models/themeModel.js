const mongoose = require ('mongoose')

const themeSchema = mongoose.Schema ({
    themeName : String,
    creator : String,
    description : String,
    headerImg : String,
    createdAt : {
        type : Date,
        default : new Date(),
    },
    
})





module.exports = mongoose.model('themeModel', themeSchema)