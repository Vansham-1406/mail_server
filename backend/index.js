const express = require("express")
const app = express(); 
const cors = require("cors")
const mongoose = require("mongoose")
const otpRoute = require("./route/otpRoute")
const userData = require("./route/userData")
const messageData = require("./route/messageData")

app.use(cors())
app.use(express.json({limit:'50mb'}))
require('dotenv').config()

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGOOSE,
function (err) 
{
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
  }
)

app.use("/message",messageData)
app.use("/user",userData)
app.use("/",otpRoute)

app.listen(8450,()=>{
    console.log("Connected to port 8450")
})