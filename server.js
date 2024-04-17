const express = require('express')
const dbConnect = require('./config/dbconnect')
const app =  express()
const env = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRoute = require('./routes/authRoute')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require('./middleware/errorHandler')




dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("Message from server side")
})





app.use('/api/user',authRoute)
app.use(notFound)
app.use(errorHandler)






app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`); 
})