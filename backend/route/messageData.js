const express = require("express")
const route = express.Router();

const {checkSave,checkSave1,getMessage,addMessage,checkDel1,checkDel2,checkOpened} = require("../controller/messageData")

route.post("/data",addMessage)
route.get("/getData",getMessage)
route.put("/checkSave",checkSave)
route.put("/checkSaveTrue",checkSave1)
route.put("/checkDel1",checkDel1)
route.put("/checkDel2",checkDel2)
route.put("/checkOpened",checkOpened)

module.exports = route