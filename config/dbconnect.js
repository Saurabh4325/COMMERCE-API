const mongoose = require("mongoose")

const dbConnect = async ()=>{
    const uri = process.env.MONGODB_URL
    try {
    const conn =  await mongoose.connect(uri)
    console.log("Database connecteed Successfully");
    } catch (error) {
        console.log("Something is error",error)
    }
}
module.exports = dbConnect