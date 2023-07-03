const UserTask = require("../modales/taskModale");
const User = require("../modales/userModale");
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
module.exports = {
  UserTasks,
};
