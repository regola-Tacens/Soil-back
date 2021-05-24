const mongoose = require('mongoose')
const express = require('express')

const themeModel = require('../models/themeModel')

const fetchTheme = async (req,res) => {
    
    try {
        const allThemes = await themeModel.find();
        res.status(200).json(allThemes)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message : err.message})
    }
}

const createTheme = async (req,res) => {
    const theme = req.body
    const newTheme = new themeModel({...theme, creator : req.userId, createdAt: new Date().toISOString()})
    try {
        const addedTheme = await newTheme.save()
        res.json( addedTheme )
    } catch (err) {
        res.status(404).json({ message : error})
    }

}

const updateTheme = async (req,res)=> {
    const  id  = req.params.themeId;
    const {themeName, description, headerImg} = req.body
    const updatedTheme = {themeName, description, headerImg, _id:id}
    try {
        await themeModel.findByIdAndUpdate(id, updatedTheme, { new : true})
        res.json(updatedTheme)
    } catch (error) {
        console.log(error)
    }
}

const eraseTheme = async (req, res) => {
    const id = req.params.themeId

    try{
        await themeModel.findByIdAndDelete(id)
        res.json({message : 'Post deleted successfully'}); 
    }catch(err) {
        console.log(err)
    }
}


module.exports = {
    createTheme: createTheme,
    fetchTheme : fetchTheme,
    updateTheme : updateTheme,
    eraseTheme : eraseTheme
}