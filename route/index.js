const express = require("express");
const { registerUser, loginUser } = require("../controlers/userAuth");
const { UserTasks, fetchPosts } = require("../controlers/userTasks");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/dashboard", UserTasks);
router.get("/dashboard/fetchposts", fetchPosts);

module.exports = router;
