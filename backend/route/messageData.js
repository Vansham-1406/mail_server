const express = require("express")
const route = express.Router();

const {addMessage} = require("../controller/messageData")
const {getMessage} = require("../controller/messageData")
route.post("/data",addMessage)
route.get("/getData",getMessage)

module.exports = route