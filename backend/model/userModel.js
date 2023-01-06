const mongoose = require("mongoose")

const User = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    mobileNum:{type:Number,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    token:{type:String}
})

const model = mongoose.model("user-data",User);

module.exports = model

