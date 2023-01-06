const express = require("express")
const route = express.Router();
const userData = require("../controller/userData")

route.post("/signup",userData.userRegister)

module.exports = route