const mongoose = require ('mongoose')
const express = require ('express')
const bcrypt =require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const userModel = require ('../models/userModels')


const signup =async (req, res) => {
    console.log('req body in controller back end', req.body)
    const  { firstName, lastName, email, password } = req.body

    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.status(400).json({message : 'user already exists'})
        const hashedPassword = await bcrypt.hash(password,12)

        const result = await userModel.create ({ email, password : hashedPassword, name:`${firstName} ${lastName}`})
        const token = jwt.sign({ email : result.email, id : result._id}, 'test', {expiresIn: '1h'})
        res.status(200).json({result : result, token    })
    } catch (err) {
        res.status(500).json({message:'something went wrong'})
    }
}

const signin = async (req, res) => {
    const { email, password}= req.body
    try {
        const existingUser = await userModel.findOne({email})
        if(!existingUser) return res.status(404).json({message : ' User does not exist'})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if( !isPasswordCorrect) return res.status(400).json({message : 'invalid credentials'})

        const token = jwt.sign({ email : existingUser.email, id : existingUser._id}, 'test', {expiresIn :'1h'})
        res.status(200).json({result : existingUser, token})

    } catch (err){
        res.status(500).json({message :'something went wrong'})
    }
}

module.exports = {
    signup : signup,
    signin : signin
}