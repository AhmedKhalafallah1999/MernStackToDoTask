const express = require("express");
const mongoose = require("mongoose");
const router = require("./route/index.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
// for using body parser, but we have't form data so we will not write
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// so,
app.use(bodyParser.json()); // application/json for incoming request for using in body request to extract them from into
app.use(cors());
//  To use and run on another server as a client differ
//  to clear the CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
  // so every request will be sent will hava these headers
});
app.use("/api", router);
mongoose
  .connect(
    "mongodb+srv://ahmedkhabdelshafy:Mennafawzy@cluster0.fg7mmud.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB connected");

    // Start the server only after successful connection to the database
    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Define routes and middleware here
// ...
