const User = require('../models/userModels')
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/jwtToken')
const { validateMongodbId } = require('../utils/validateMongodbId')



// createUser
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        // create new user
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const mobile = req.body.mobile;
        const password = req.body.password;
        const newUser = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            mobile: mobile,
            password: password
        })

        res.send(newUser)
    }
    else {


        throw new Error('User Already Exist')
    }
})

// login
const loginUserCtrl = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordsMatched(password)) {
        console.log("send Successfully")
        res.json(
            {
                id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                password: findUser.password,
                mobile: findUser.mobile,
                token: generateToken(findUser._id)
            })

    } else {

        throw new Error("invalid credential")
    }
});


// update a user
const updateaUser = asyncHandler(async(req, res)=>{
    const {id} = req.user
    validateMongodbId(id)
    try {
        const updateUser = await User.findByIdAndUpdate({_id:id},{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            mobile:req.body.mobile
        },{new:true})
        res.json(updateUser)

    } catch (error) {
        throw new Error("Your User is not update")
    }
})


// fetch all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error("Some thing is error")
    }
})


// fetch single users
const getaUser = asyncHandler(async (req, res) => {
    // console.log(req.params.id)
    const { id } = req.params
    validateMongodbId(id)

    try {
        const getaUser =await User.findById({_id: id})
        console.log("getaUser")
        res.json(getaUser)
    } catch (error) {
        throw new Error("Error to fetch single User")
    }
})



const deleteaUser = asyncHandler(async (req, res) => {
    // console.log(req.params.id)
    const { id } = req.params
    validateMongodbId(id)
    try {
        const getaUser =await User.findByIdAndDelete({_id: id})
        res.json(getaUser)
    } catch (error) {
        throw new Error("User not deleted")
    }
})


const blockUser = asyncHandler(async(req,res)=>{
    const {id}=  req.params;
    validateMongodbId(id)
    try {
        const block = await User.findByIdAndUpdate(id,{
            isBlocked:true
        },{new:true})


        res.json({
            message:"User Blocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})


const unblockUser = asyncHandler(async(req,res)=>{
    const {id}=  req.params;
    validateMongodbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(id,{
            isBlocked:false
        },{new:true})


        res.json({
            message:"User UnBlocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})




module.exports = { createUser, loginUserCtrl,updateaUser, getallUser, getaUser,deleteaUser,blockUser,unblockUser }