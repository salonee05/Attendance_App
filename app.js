const path = require("path");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://salonee05:Aditeegupta067@appcluster.cd3vw.mongodb.net/appDb",
  { useNewUrlParser: true }
);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.js");
const classRoutes = require("./routes/class_.js");

app.use("/", authRoutes);
app.use("/classrooms", classRoutes);

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
