const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.userRegister = async (req, res) => {
  try {
    const newU = req.body.values;
    const newUser = {
      firstName: newU.firstName,
      lastName: newU.lastName,
      mobileNum: newU.mobileNum,
      username: newU.username,
      password: newU.password,
    };

    const hashPass = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashPass;

    const recieve = await User.create(newUser);
    console.log(recieve);
    if (recieve) {
      res.status(201).json({ response: recieve, msg: "User Created" });
    }
  } catch (error) {
    res.status(400).json({ status: error, msg: "user not registered" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { password } = req.body;
    let user;
    if (isNaN(req.body.username)) 
    {
      user = await User.findOne({ username: req.body.username });
    } 
    else 
    {
      user = await User.findOne({ mobileNum: req.body.username });
    }

    if (user) 
    {
      const checkPass = bcrypt.compareSync(password, user.password);
  
      const token = await jwt.sign({user},process.env.secretKey,{expiresIn:"300s"})
      if (checkPass) 
      {
        res.status(200).json({
          msg: "User logged in",
          user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNum: user.mobileNum,
            id: user._id,
            token : token
          },
        });
      } 
      else 
      {
        res.status(400).json({ check : "password",msg: "Incorrect password" });
      }
    } 
    else 
    {
      res.status(400).json({ check:"user",msg: "User not found" });
    }
  } 
  catch (error) 
  {
    res.status(400).json({ msg: "Error", error:error });
  }
};

exports.setUp = async (req,res) => 
{
  try 
  {
    const user = req.body;
    const login = await User.findOne({mobileNum : user.mobile})
    if(login)
    {
      const hashPass = bcrypt.hashSync(user.password, 10);
      login.password = hashPass;

      const userUpdate = await User.findByIdAndUpdate(login.id,login,{
        new : true
      })

      return res.status(201).json({response : userUpdate, msg : "Password Changed successfully"})
    }
    else
    {
      return res.status(400).json({msg:"failed"})
    }
  } 
  catch (error)
  {
    return res.status(400).json({msg:"failed",error : error})
  }
}

exports.getUser = async (req,res) => {
  try 
  {
    const login = await User.findById(req.query.id);

    console.log(login)
  } 
  catch (error) {
    
  }
}
