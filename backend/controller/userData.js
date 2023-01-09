const User = require("../model/userModel");
const bcrypt = require("bcrypt");
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
    if (isNaN(req.body.username)) {
      user = await User.findOne({ username: req.body.username.toLowerCase() });
    } else {
      user = await User.findOne({ mobileNum: req.body.username });
    }

    console.log(user);
    if (user) 
    {
      const checkPass = bcrypt.compareSync(password, user.password);
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
