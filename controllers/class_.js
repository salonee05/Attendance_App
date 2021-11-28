const User = require("../models/user");
const Class = require("../models/class_");
const generator = require("generate-password");

/* get the classroom.ejs page for authenticated user */
exports.getClassroom = (req, res, next) => {
  const userId = req.params.userId.slice(1);
  User.findOne({ userId: userId }, function (err, foundUser) {
    if (foundUser.isAuth !== true) {
      res.redirect("/notAuth");
    } else {
      User.findOne({ userId: userId }, function (err, foundUser) {
        if (err) console.log(err);
        if (foundUser) {
          res.render("classrooms", {
            path: "/classrooms",
            user: foundUser,
          });
        }
      });
    }
  });
};

/* get the classPage.ejs file for the authenticated teacher to view attendance */
exports.getViewAttendance = (req, res, next) => {
  const code = req.params.classCode.slice(1);
  const userId = req.params.teacherId.slice(1);
  /*console.log(code);*/
  User.findOne({ userId: userId }, function (err, foundUser) {
    if (foundUser.isAuth !== true) {
      res.redirect("/notAuth");
    } else {
      Class.findOne({ code: code }, function (err, foundClass) {
        if (err) console.log(err);
        if (foundClass) {
          /*console.log(foundClass);
      console.log(typeof foundClass);*/
          res.render("classPage", {
            class1: foundClass,
            userId: userId,
          });
        }
      });
    }
  });
};

/* get attendancezPage.ejs for the authenticated teacher to take attendance */
exports.getTakeAttendance = (req, res, next) => {
  const classCode = req.params.classCode.slice(1);
  const teacherId = req.params.teacherId.slice(1);
  /*console.log(classCode);
  console.log(teacherId);*/
  User.findOne({ userId: teacherId }, function (err, foundUser) {
    if (foundUser.isAuth !== true) {
      res.redirect("/notAuth");
    } else {
      Class.findOne({ code: classCode }, function (err, foundClass) {
        if (err) console.log(err);
        if (foundClass) {
          /*console.log(foundClass);*/
          res.render("attendancePage", {
            class1: foundClass,
            teacherId: teacherId,
          });
        }
      });
    }
  });
};

/* update the attendance of the students and the total classes of the subject */
exports.markAttendance = (req, res, next) => {
  let presentStudentObjects = req.body.presentStudentObjects;
  let presentStudents = [];
  let attendance = [];
  if (typeof presentStudentObjects === "string") {
    const studentObject = JSON.parse(presentStudentObjects);
    presentStudents.push(studentObject.StudentId);
    attendance.push(studentObject.Attendance);
  } else {
    for (let i = 0; i < presentStudentObjects.length; i++) {
      const studentObject = JSON.parse(presentStudentObjects[i]);
      presentStudents.push(studentObject.StudentId);
      attendance.push(studentObject.Attendance);
    }
  }
  const totalAttendance = req.body.totalAttendance;
  const classCode = req.params.classCode.slice(1);
  const teacherId = req.params.teacherId.slice(1);
  /*console.log(presentStudentObjects);
  console.log(presentStudents);
  console.log(attendance);
  console.log(totalAttendance);
  console.log(classCode);
  console.log(teacherId);*/
  for (let i = 0; i < presentStudents.length; i++) {
    User.findOneAndUpdate(
      { userId: presentStudents[i], "classes.classCode": classCode },
      {
        $set: {
          "classes.$.attendance": String(Number(attendance[i]) + 1),
        },
      },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    Class.findOneAndUpdate(
      { code: classCode, "students.StudentId": presentStudents[i] },
      {
        $set: {
          "students.$.Attendance": String(Number(attendance[i]) + 1),
        },
      },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
  }

  User.updateMany(
    { "classes.classCode": classCode },
    {
      $set: {
        "classes.$.totalClasses": String(Number(totalAttendance) + 1),
      },
    },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );

  Class.findOneAndUpdate(
    { code: classCode },
    {
      $set: {
        totalClasses: String(Number(totalAttendance) + 1),
      },
    },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );

  console.log("Attendance updated");
  res.redirect("/classrooms/:" + teacherId);
};
