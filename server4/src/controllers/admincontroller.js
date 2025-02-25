const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
require('dotenv').config()
const User=require('../models/usermodel')

exports.register=async(req,res)=>{
    try{
        console.log(req.body)
        const{username,email,password,role}=req.body
        const userexists=await User.findOne({username})
        if(userexists)
            return res.status(400).json({message:"user already exists"})
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedpassword,role})
        await user.save()
        return res.status(200).json({message:"user registered",data:user})
    }
    catch(error){
        return res.status(500).json({message:"server error",error:error.message})
    }
}


exports.login=async(req,res)=>{
    try{
        console.log(req.body)
        const{username,password}=req.body
        const user=await User.findOne({username})
        console.log(user.role)
        if(!user)
            return res.status(404).json({message:"No user found"})
        const isMatch=await bcrypt.compare(password,user.password)
        if (! isMatch)
            return res.status(400).json({message:"incorrect password"})
        const token=jwt.sign({id:user._id,username,role:user.role},process.env.jWT_secret,{expiresIn:'7d'})
        res.cookie('token',token,{httpOnly:true})
       return res.status(200).json({message:"Logged in succesfully",token})

    }
    catch (error){
        return res.status(500).json({message:"server error",error:error.message})
    }
}