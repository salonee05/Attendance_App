const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
const roles = require("../_helpers/roles.js");
const classController = require("../controllers/class_");

/*get the classroom.ejs page for a user*/
router.get("/:userId", classController.getClassroom);

/* get classPage.ejs for viewing the attendance of the students */
router.get(
  "/view-attendance/:teacherId/:classCode",
  classController.getViewAttendance
);

/* get attendancePage.ejs for taking the attendance of the students */
router.get(
  "/take-attendance/:teacherId/:classCode",
  classController.getTakeAttendance
);

/* post the attendance taken by the teacher */
router.post(
  "/take-attendance/:teacherId/:classCode/mark-attendance",
  classController.markAttendance
);

module.exports = router;

/*ignore these*/
/*router.post("/", authController.postSignin);*/
/*authRole(roles.Teacher, user), classController.postCreateClass*/
