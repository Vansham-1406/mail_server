const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const newU = req.body.values;

    if (!newU || !newU.username || !newU.password || !newU.email) {
      return res
        .status(400)
        .json({ status: "error", msg: "Required fields are missing" });
    }

    const existingUser = await User.findOne({ username: newU.username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username already registered" });
    }

    // Create the new user object
    const newUser = {
      firstName: newU.firstName,
      lastName: newU.lastName,
      email: newU.email,
      username: newU.username,
      password: newU.password,
    };

    // Hash the password
    const hashPass = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashPass;

    // Save the new user to the database
    const createdUser = await User.create(newUser);
    console.log(createdUser);

    if (createdUser) {
      return res
        .status(201)
        .json({ response: createdUser, msg: "User Created" });
    } else {
      return res
        .status(500)
        .json({ status: "error", msg: "Failed to create user" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Username/Email and password are required" });
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    let user;

    if (isEmail) {
      user = await User.findOne({ email: username });
    } else {
      user = await User.findOne({ username: username });
    }

    if (user) {
      const checkPass = bcrypt.compareSync(password, user.password);

      if (checkPass) {
        const token = jwt.sign({ user }, process.env.secretKey, {
          expiresIn: "30000s",
        });
        return res.status(200).json({
          msg: "User logged in",
          user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
            token: token,
          },
        });
      } else {
        return res.status(400).json({ msg: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.setUp = async (req, res) => {
  try {
    const user = req.body;
    const login = await User.findOne({ email: user.email });
    if (login) {
      const hashPass = bcrypt.hashSync(user.password, 10);
      login.password = hashPass;

      const userUpdate = await User.findByIdAndUpdate(login.id, login, {
        new: true,
      });

      return res
        .status(201)
        .json({ response: userUpdate, msg: "Password Changed successfully" });
    } else {
      return res.status(400).json({ msg: "failed" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "failed", error: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const login = await User.findById(req.query.id);

    console.log(login);
  } catch (error) {}
};
