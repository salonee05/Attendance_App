const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
const classController = require("../controllers/class_");
const { check, body } = require("express-validator");

/* get the home or sign in page */
router.get("/", function (req, res) {
  const error = [];
  res.render("home", { error: error });
});

/* post the sign in of the user */
router.post("/", authController.postSignin);

/* get 401 error page */
router.get("/notAuth", function (req, res) {
  res.render("401");
});

/* log out the user */
router.post("/logout", authController.logout);

module.exports = router;

/*register code to be ignored right now*/
/*router.get("/register", function (req, res) {
  res.render("register");
});

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userFound) => {
          if (userFound) {
            return Promise.reject("A user with the email already exists!");
          }
        });
      }),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Please enter a password with minimum length 3"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);*/
