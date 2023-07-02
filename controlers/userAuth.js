const User = require("../modales/userModale");

function registerUser(req, res) {
  const { email, password, confirmPassword, username, phone, birthday } =
    req.body;
  console.log(req.body);
  // ......... validation
  const user = new User({
    email,
    password,
    confirmPassword,
    username,
    phone,
    birthday,
  });

  user
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
      console.log("User Data is save in DataBase");
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        res.status(200).json({ name: user.name });
        // return res.redirect("/dashboard");
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}
module.exports = {
  registerUser,
  loginUser,
};
