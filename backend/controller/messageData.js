const Message = require("../model/userMessage")

exports.addMessage = async (req,res) => {
    try 
    {
        const mess = req.body;
        const created = await Message.create(mess)
        if(created)
        {
            return res.status(200).json({msg : true,message : mess})
        }
        else
        {
            return res.status(400).json({msg : false, message : "failed"})
        }
    } 
    catch (error) 
    {
        return res.status(400).json({msg : false, message : error})
    }
}

exports.getMessage = async (req,res) => {
    console.log(req.query.id)
    
    try 
    {
        const Mess = await Message.find({To : req.query.id})
        if(Mess)
        {
            return res.status(200).send({ msg: "user", response: Mess });
        }
        else
        {
            return res.status(400).json({msg : "Failed",status : false})
        }
    } 
    catch (error) 
    {
        return res.status(400).json({msg : error,status : false})
    }
}