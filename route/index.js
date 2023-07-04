const express = require("express");
const { registerUser, loginUser } = require("../controlers/userAuth");
const {
  UserTasks,
  fetchPosts,
  deleteTask,
  changeTaskStatus,
} = require("../controlers/userTasks");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/dashboard", UserTasks);
router.get("/dashboard/fetchposts", fetchPosts);
router.post("/dashboard/deletetask", deleteTask);
router.post("/dashboard/changestatus", changeTaskStatus);

module.exports = router;
