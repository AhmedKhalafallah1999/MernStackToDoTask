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
// fetch All tasks
function fetchPosts(req, res) {
  const email = req.body.email;
  // console.log(email);
  User.find({ email: email })
    .then((result) => {
      UserTask.find({ user: result[0]._id }).then((data) => {
        res
          .status(200)
          .json({ messge: "The fetched Tasks id ", data: data, result: result });
        // console.log(data);
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
// // fetch active Posts
function fetchActivePosts(req, res) {
  const email = req.body.email;
  // console.log(email);
  User.find({ email: email })
    .then((result) => {
      UserTask.find({ user: result[0]._id }).then((data) => {
        const filteredActiveTasks = data.filter(
          (item) => item.completed === false
        );
        res
          .status(200)
          .json({ messge: "The fetched Tasks id ", data: filteredActiveTasks });
        // console.log(data);
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
// // fetch completed Posts
function fetchCompletedPosts(req, res) {
  const email = req.body.email;
  console.log(email);
  User.find({ email: email })
    .then((result) => {
      UserTask.find({ user: result[0]._id }).then((data) => {
        const filteredCompletedTasks = data.filter(
          (item) => item.completed === true
        );
        res.status(200).json({
          messge: "The fetched Tasks id ",
          data: filteredCompletedTasks,
        });
        // console.log(data);
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
// Delete Task and Fetch Other
function deleteTask(req, res) {
  const { _id, email } = req.body;
  // console.log(email, _id);

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
  UserTask.findOneAndDelete(_id).then((result) => {
    res.status(200).json({ message: "Done Deleted Successfully" });
    console.log("result");
  });
}
function clearCompleted(req, res) {
  const { _id, email } = req.body;
  // console.log(email, _id);

  // ......... validation
  User.find({ email: email })
    .then((result) => {
      UserTask.deleteMany({ user: result[0]._id, completed: true })
        .then((data) => {
          res.status(200).json({ messge: "The fetched Tasks id " });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });

  // User.updateOne(
  //   { email: email },
  //   {
  //     $pull: {
  //       tasks: {
  //         // _id: new mongoose.Types.ObjectId(_id),
  //         completed: false,
  //       },
  //     },
  //   }
  // ).then((result) => {
  //   console.log(result);
  // });
  // UserTask.findByIdAndDelete(_id).then((result) => {
  //   res.status(200).json({ message: "Done Deleted Successfully" });
  //   console.log("result");
  // });
}

// Delete Task and Fetch Other
function changeTaskStatus(req, res) {
  const { _id, email, index } = req.body;
  // ......... validation
  UserTask.findOne({ _id })
    .then((doc) => {
      doc.completed = !doc.completed;
      doc.save();
      res.status(200).json({ message: "Done" });
    })
    .catch((err) => {
      console.log("Oh! Dark");
    });
}
// For Modify User Data
function modify(req, res) {
  const email = req.body.email;
  console.log(email);
  User.find({ email: email })
    .then((result) => {
      res.status(200).json({ messge: "The User Data ", data: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
// for updating User Data
function modifyUserInfoAndUpdate(req, res) {
  const { email, password, username, phone, birthday, oldEmail } =
    req.body.newData;

  console.log(email, "done", oldEmail);
  User.findOneAndUpdate(
    { email: oldEmail },
    {
      email: email,
      password: password,
      confirmpassword: password,
      phone: phone,
      username: username,
      birthday: birthday,
    }
  )
    .then((result) => {
      res
        .status(200)
        .json({ message: "User Update Successfully", data: email });
      // console.log(data);
    })
    .catch((err) => {
      res.status(404).json({ message: "Some thing wrong happened, try again" });
    });
}
module.exports = {
  UserTasks,
  fetchPosts,
  fetchActivePosts,
  fetchCompletedPosts,
  deleteTask,
  changeTaskStatus,
  clearCompleted,
  modify,
  modifyUserInfoAndUpdate,
};
