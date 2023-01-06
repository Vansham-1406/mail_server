const express = require("express")
const route = express.Router();
const {otpSignUp} = require("../controller/otpRoute")
route.post("/otp",otpSignUp)

module.exports = route