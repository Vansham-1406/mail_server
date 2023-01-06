const User = require("../model/userModel");
const bcrypt = require("bcrypt");
exports.userRegister = async (req, res) => {
  try 
  {
        const newU = req.body.values
        const newUser = {
        firstName : newU.firstName,
        lastName : newU.lastName,
        mobileNum : newU.mobileNum,
        username : newU.username,
        password : newU.password,
        }
    
        const hashPass = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashPass
    
        const recieve = await User.create(newUser)
        console.log(recieve)
        if(recieve)
        {
            res.status(201).json({response : recieve, msg : "User Created"})
        }
  } 
  catch (error) 
  {
    res.status(400).json({ status: error, msg: "user not registered" });
  }
};
