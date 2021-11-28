const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
const roles = require("../_helpers/roles.js");
const classController = require("../controllers/class_");

/*get the classroom.ejs page for a user*/
router
  .use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })
  .get("/:userId", classController.getClassroom);

/* get classPage.ejs for viewing the attendance of the students */
router
  .use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })
  .get(
    "/view-attendance/:teacherId/:classCode",
    classController.getViewAttendance
  );

/* get attendancePage.ejs for taking the attendance of the students */
router
  .use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })
  .get(
    "/take-attendance/:teacherId/:classCode",
    classController.getTakeAttendance
  );

/* post the attendance taken by the teacher */
router
  .use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })
  .post(
    "/take-attendance/:teacherId/:classCode/mark-attendance",
    classController.markAttendance
  );

module.exports = router;

/*ignore these*/
/*router.post("/", authController.postSignin);*/
/*authRole(roles.Teacher, user), classController.postCreateClass*/
