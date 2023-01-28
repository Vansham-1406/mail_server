const express = require("express")
const route = express.Router();
const userData = require("../controller/userData")

route.post("/signup",userData.userRegister)
route.post("/login",userData.userLogin)
route.get("/getUser",userData.getUser)
route.put("/setup",userData.setUp)

module.exports = route