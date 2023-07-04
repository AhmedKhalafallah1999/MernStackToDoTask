const UserTask = require("../modales/taskModale");
const User = require("../modales/userModale");
var mongoose = require("mongoose");

function UserTasks(req, res) {
  const { email, taskState } = req.body;
  // ......... validation
  User.findOne({ email })
    .then((user) => {
      // res._id = user._id;
      const userTask = new UserTask({
        title: taskState.text,
        user: user._id,
      });
      userTask
        .save()
        .then((result) => {
          user.tasks.push(result);
          user.save();
          console.log(result);
          res.status(201).json(result);
          console.log("User Data is save in DataBase");
        })
        .catch((err) => {
          res.status(404).json({ error: err.message });
        });
      // .then((user) => {
      //   user.tasks.push(userTask);
      //   user.save();
      //   console.log(user);
      //   res.status(201).json(user);
      //   console.log("Task Data is save in DataBase");
      //   console.log(user);
      // });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
function fetchPosts(req, res) {
  User.find()
    .then((result) => {
      res
        .status(200)
        .json({ messge: "The fetched Tasks id ", Tasks: result[0].tasks });
      // console.log(result[0].tasks);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
// Delete Task and Fetch Other
function deleteTask(req, res) {
  const { _id, email } = req.body;
  console.log(email, _id);

  // ......... validation
  User.updateOne(
    { email: email },
    {
      $pull: {
        tasks: {
          _id: new mongoose.Types.ObjectId(_id),
          // completed: false,
        },
      },
    }
  ).then((result) => {
    console.log(result);
  });
}

// Delete Task and Fetch Other
function changeTaskStatus(req, res) {
  const { _id, email, index } = req.body;
  console.log(email, _id, index);
  // ......... validation
  // User.updateOne(
  //   { email: email },
  //   {
  //     $pull: {
  //       tasks: {
  //         _id: new mongoose.Types.ObjectId(_id),
  //       },
  //     },
  //   }
  // ).then((result) => {
  //   console.log(result);
  // });
  User.findOne({ email: email })
    .then((doc) => {
      item = doc.tasks[index];
      console.log(item);
      item["completed"] = true;
      console.log(item["completed"]);
      doc.save();
    })
    .catch((err) => {
      console.log("Oh! Dark");
    });
}

module.exports = {
  UserTasks,
  fetchPosts,
  deleteTask,
  changeTaskStatus,
};
