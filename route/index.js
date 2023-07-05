const express = require("express");
const { registerUser, loginUser } = require("../controlers/userAuth");
const {
  UserTasks,
  fetchPosts,
  fetchActivePosts,
  fetchCompletedPosts,
  deleteTask,
  changeTaskStatus,
  clearCompleted,
  modify,
  modifyUserInfoAndUpdate
} = require("../controlers/userTasks");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/dashboard", UserTasks);
router.post("/dashboard/fetchposts", fetchPosts);
router.post("/dashboard/fetchactiveposts", fetchActivePosts);
router.post("/dashboard/fetchcompletedposts", fetchCompletedPosts);
router.post("/dashboard/deletetask", deleteTask);
router.post("/dashboard/clearcompletedtasks", clearCompleted);
router.post("/dashboard/changestatus", changeTaskStatus);
router.post("/modify", modify);
router.patch("/modifyinfoandupdate", modifyUserInfoAndUpdate);

module.exports = router;
