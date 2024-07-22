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

exports.checkSave = async (req,res) => {
    try 
    {
        const messUpdate = await Message.findByIdAndUpdate(req.body._id,{...req.body,Saved : true}) 
        return res.status(204).json({msg : messUpdate, status : true})   
    } 
    catch (error) 
    {
        return res.status(401).json({msg : error, status : false})
    }
}

exports.checkSave1 = async (req,res) => {
    try 
    {
        const messUpdate = await Message.findByIdAndUpdate(req.body._id,{...req.body,Saved : false}) 
        return res.status(204).json({msg : messUpdate, status : false})   
    } 
    catch (error) 
    {
        return res.status(401).json({msg : error, status : false})
    }
}

exports.checkDel1 = async (req,res) => {
    try 
    {
        const messUpdate = await Message.findByIdAndUpdate(req.body._id,{...req.body,Deleted : false}) 
        console.log('2',messUpdate)
        return res.status(204).json({msg : messUpdate, status : false})   
    } 
    catch (error) 
    {
        return res.status(401).json({msg : error, status : false})
    }
}

exports.checkDel2 = async (req,res) => {
    try 
    {
        const messUpdate = await Message.findByIdAndUpdate(req.body._id,{...req.body,Deleted : true}) 
        console.log('2',messUpdate)
        return res.status(204).json({msg : messUpdate, status : false})   
    } 
    catch (error) 
    {
        return res.status(401).json({msg : error, status : false})
    }
}

exports.checkOpened = async (req,res) => {
    try 
    {
        const messUpdate = await Message.findByIdAndUpdate(req.body._id,{...req.body,Opened : true}) 
        console.log('2',messUpdate)
        return res.status(204).json({msg : messUpdate, status : false})   
    } 
    catch (error) 
    {
        return res.status(401).json({msg : error, status : false})
    }
}

exports.checkMessage = async (req,res) => {
    try 
    {
        const accept = await Message.findById(req.query.id)
    
        if(accept)
        {
            return res.status(200).json({status : true, response : accept})
        }
        else
        {
            return res.status(401).json({status : false, response : "Message not found"})
        }
    } 
    catch (error) 
    {
        return res.status(401).json({status : false, response : error || "Message not found"})
    }
}

exports.removeMess = async (req,res) => {
    console.log(req.query.id)
    try 
    {
        const msg = await Message.findByIdAndDelete(req.query.id)

        if(msg)
        {
            return res.status(204).send({msg : msg, status : true})
        }
        else
        {
            return res.status(400).json({status : false, msg : "Message not deleted"})
        }
    } 
    catch (error) 
    {
        return res.status(400).json({status : false, msg : "Message not deleted"})
    }
}

exports.sentData = async (req,res) => {
    console.log(req.body)
    try 
    {
        const Mess = await Message.find({From : req.query.id})
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