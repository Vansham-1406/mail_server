const mongoose = require("mongoose")

const Message = mongoose.Schema({
    From : {type : String, required : true},
    To : {type:String,required:true},
    Saved : {type:Boolean,required:true},
    Deleted : {type:Boolean,required:true},
    Body : {type:String,required:true},
    Subject : {type:String,required:true},
    Opened : {type:Boolean,required:true},
    postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"user-datas"},
    Time : {type:String,required:true}
})

const model = mongoose.model("messageData",Message);

module.exports = model