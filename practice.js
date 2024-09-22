const express = require("express")
const mongoose = require("mongoose");
const user = require("./models/user");

const app = express();

exports.createUser = async (req , resp)=>{
try {
    const {username , email , password} = req.body
    const userData = new user ({
        username,
        email,
        password,
        photo:req.file ? req.file.path:null,
    })
    await userData.save();
    resp.status(201).json(userData)
} catch (error) {
    resp.status(400).json({
        error:error.message
    })
}
}
exports.getUser=async(req , resp)=>{
    try {
        const serachedUser = user.findById(req.params.id)
        if (!serachedUser){
            resp.status(404).json({error:"User not found"})
        }
        resp.json(serachedUser)
    } catch (error) {
        resp.status(400).json({error:error.message})
    }
}
get.updateUser = (req , resp)=>{
    try {
        const{username , email,password}= req.body
        const updateData = {
            username,
            email,
            password,
            updateAt:Date.now(),
        };
        if(req.file){
            updateData.photo=req.file.path;
        }
        const userData = user.findById
    } catch (error) {
        
    }
}