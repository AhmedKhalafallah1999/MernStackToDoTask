const express = require("express");
const { registerUser, loginUser } = require("../controlers/userAuth");
const { UserTasks } = require("../controlers/userTasks");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/dashboard", UserTasks);

module.exports = router;
