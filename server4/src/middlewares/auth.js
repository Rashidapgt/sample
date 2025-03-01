const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../models/usermodel')

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token)
            return res.status(400).json({message:"Authentication error"})
        const decoded=jwt.verify(token,process.env.jWT_secret)
        console.log(decoded)
        req.user=await User.findById(decoded.id)
        if(!req.user)
            return res.status(400).json({message:"User not found"})
        next()
    }
    catch(error){
        return res.status(500).json({message:"server error",error:error.message})
    }
}
exports.adminOnly=(req,res,next)=>{
    if(req.user.role!=='admin')
        return res.status(400).json({message:"Access denied"})
    next()
}
