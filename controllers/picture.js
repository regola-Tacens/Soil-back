const mongoose = require('mongoose')
const express = require('express')

const pictureModel = require('../models/pictureModel')

const createPicture = async (req,res) => {
    const picture = req.body
    const newPicture = new pictureModel({...picture,creator : req.userId, createdAt: new Date().toISOString()})
    try {
        const addedPicture = await newPicture.save()
        res.json(addedPicture)
    } catch (err) {
        res.status(404).json({ message : error.message})
    }

}
const updatePicture = async (req,res) => {
    const { id } = req.params
    const { pictureName, description,img, themeLinked, creator } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPicture = { pictureName, description, img,themeLinked, creator, _id : req.params.id}
    await pictureModel.findByIdAndUpdate(id, updatedPicture, { new:true})
    res.json(updatedPicture);

}


const fetchPictures = async (req,res) => {
    const  {themeId} = req.params;
    try {

        const pictures = await pictureModel.find({themeLinked : themeId});
        res.status(200).json(pictures)

    } catch (err) {
        res.status(404).json({ message : err})
    }
}

const erasePicture = async (req,res) => {
    const { id } = req.params;
    try {
        await pictureModel.findByIdAndDelete(id)
        res.json({message : 'Picture deleted successfully'}); 
    } catch (err) {
        res.status(404).json({ message : err})
    }
}


const erasePicturesLinked = async (req, res) => {
    try {
        await pictureModel.deleteMany({themeLinked : req.params.themeId})
        res.json({message : 'Pictures deleted successfully'}); 
    } catch (err) {
        res.status(404).json({ message : err})
    }
}

const fetchAllTags = async (req,res) => {
    const pictureId = req.params.pictureId
    const allTags = await pictureModel.find({_id : pictureId}).populate("tags")

    res.status(200).json(allTags)
}

const eraseTagInPicture = async (req,res) => {
    const pictureId = req.params.pictureId
    const tagToErase = Object.keys(req.body)[0]
    // const newPicture = { tags : tags.filter(tag => tag !== tagToErase )}
    try {
             const updatedPicture = await pictureModel.findByIdAndUpdate(pictureId,{ $pull : { tags : tagToErase  }}, 
            { new : true, useFindAndModify : false})
            res.status(200).json(updatedPicture)

    } catch (err) {
        res.status(404).json({ message : err})
        
    }
    
}

module.exports = {
    createPicture: createPicture,
    fetchPictures: fetchPictures,
    erasePicturesLinked : erasePicturesLinked, 
    updatePicture: updatePicture,
    erasePicture : erasePicture,
    fetchAllTags : fetchAllTags,
    eraseTagInPicture : eraseTagInPicture
}

