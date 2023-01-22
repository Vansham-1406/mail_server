const express = require("express")
const route = express.Router();
const {otpSignUp} = require("../controller/otpRoute")
const {otpLogin} = require("../controller/otpRoute")
route.post("/otpRegister",otpSignUp)
route.post("/otpLogin",otpLogin)

module.exports = route