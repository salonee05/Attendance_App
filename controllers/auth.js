const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { validationResult } = require("express-validator");
const generator = require("generate-password");
const roles = require("../_helpers/roles.js");

/* function for posting the sign in of the user */
exports.postSignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  /* contains errors if there are any and later is passed to home.ejs file */
  const error = [];
  /* find the user with given email id and rediercts to classroom.ejs page if credentials are valid else redirects to sign in page with error alert */
  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      error.push("There seems to be an error. Please try again.");
      console.log(err);
      res.render("home", { error: error });
    } else if (foundUser === null) {
      error.push("Invalid username/password");
      res.render("home", { error: error });
    } else {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        if (result == true) {
          console.log("Successfully logged in");
          res.redirect("/classrooms/:" + foundUser.userId);
        } else {
          error.push("Invalid username/password");
          res.render("home", { error: error });
        }
      });
    }
  });
};

















/* to be ignored right now */
/*exports.postSignup = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userId = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const role = req.body.checkboxValue;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("register", {
      path: "/register",
      pageTitle: "Register",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  return bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const id = generator.generate({
        length: 10,
        numbers: true,
      });
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        userId: id,
        email: email,
        password: hashedPassword,
        role: role,
        classes: [],
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/");
    });
};*/
