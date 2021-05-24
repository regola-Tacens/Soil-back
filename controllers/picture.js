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

const fetchPictures = async (req,res) => {
    const  {themeId} = req.params;
    try {

        const pictures = await pictureModel.find({themeLinked : themeId});
        res.status(200).json(pictures)

    } catch (err) {
        res.status(404).json({ message : err})
    }
}

const erasePicturesLinked = async (req, res) => {
    console.log('req.params.themeId',req.params.themeId)
    try {
        await pictureModel.deleteMany({themeLinked : req.params.themeId})
        res.json({message : 'Pictures deleted successfully'}); 
    } catch (err) {
        res.status(404).json({ message : err})
    }
}

module.exports = {
    createPicture: createPicture,
    fetchPictures: fetchPictures,
    erasePicturesLinked : erasePicturesLinked
}

