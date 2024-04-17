const User = require("../models/userModels")
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")


const authmiddleWare = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        try {
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                const user = await User.findById(decoded.id)
                req.user = user;
                next()
            }
        } catch (error) {
            throw new Error("Not authorized token expired, Please Login again")
        }
    }
    else{
        throw new Error("There is no token attach with header")
    }
    
})


const isAdmin = asyncHandler(async(req,res,next)=>{
        email=  req.user.email; 
        const adminUser = await User.findOne({email:email})
        if(adminUser.role !== "admin"){
            throw new Error("You are not an admin")
        }else{
            next()
        }
})

module.exports = {authmiddleWare,isAdmin}