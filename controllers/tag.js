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



module.exports = {
    createTag: createTag,
}

