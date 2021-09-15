const mongoose = require('mongoose')

const tagModel = require('../models/tagModel')
const pictureModel = require('../models/pictureModel')

// const createTag = async (req,res) => {
//     const currentTag = req.body
//     const newTag = new tagModel({...currentTag,creator : req.userId, createdAt: new Date().toISOString()})
//     try {

//         const addedtag = await newTag.save()
//         res.status(200).json(addedtag)
//     } catch (err) {
//         res.status(404).json({ message : err.message})
//     }

// }

const createTag = async (req,res) => {
    const currentTag = req.body
    const { pictureLink } = req.body
    const newTag = new tagModel({...currentTag,creator : req.userId, createdAt: new Date().toISOString()})
    try {
        const addedtag = await newTag.save()
        await pictureModel.findByIdAndUpdate( pictureLink, 
            { $push : { tags : addedtag._id  }}, 
            { new : true, useFindAndModify : false} ) 
        res.status(200).json(addedtag)
    } catch (err) {
        res.status(404).json({ message : err.message})
    }
}


const eraseTag = async (req, res) => {
    const id = req.params.tagId

    try {
        await tagModel.findByIdAndDelete(id)
        res.json({message : 'Tag deleted successfully'}); 
        
    } catch (err) {
        res.status(404).json({ message : err.message})
        
    }

}

const updatedTag = async (req, res)=>{
    // console.log('dans back controller : ', req.body)
    // console.log('dans back controller tagId :', req.params.tagId)
    const id = req.params.tagId
    // console.log('id',   id)
    const { message } = req.body
    const newtag = { message, _id : req.params.tagId}
    // console.log (newtag)
    try {
        const updatedTag = await tagModel.findByIdAndUpdate(id, newtag, { new:true})
        res.json(updatedTag);
    } catch (error) {
        res.status(404).json({ message : err.message})
    }
}

// const { id } = req.params
// const { pictureName, description,img, themeLinked, creator } = req.body
// if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

// const updatedPicture = { pictureName, description, img,themeLinked, creator, _id : req.params.id}
// await pictureModel.findByIdAndUpdate(id, updatedPicture, { new:true})



module.exports = {
    createTag: createTag,
    eraseTag: eraseTag,
    updatedTag: updatedTag
}

