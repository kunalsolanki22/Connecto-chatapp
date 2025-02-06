const { addMessage, getAllMessage } = require("../controller/messageController.js")

const router = require("express").Router();

router.post("/addMsg/",addMessage);
router.post("/getmsg/",getAllMessage);

module.exports = router;
  