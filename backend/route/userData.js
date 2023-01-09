const express = require("express")
const route = express.Router();
const userData = require("../controller/userData")

route.post("/signup",userData.userRegister)
route.post("/login",userData.userLogin)

module.exports = route