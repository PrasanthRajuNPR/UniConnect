const express = require("express");
const mongoose = require("mongoose");
const { Teacher, Student, Attendance, Marks } = require("../models/models");
const {getTeacherDetails,getStudents,assignMarks,updateAttendance,getSubjectsForStudent,getSubjectsForYear} = require("../controllers/teacherController")
const router = express.Router();

//  Fetch Teacher Data with Assigned Branches & Years
router.get("/get/:teacherId",getTeacherDetails );

//  Fetch Students Based on Selected Branch & Year
router.get("/students", getStudents);

//  Assign Marks to a Student
router.post("/assign-marks", assignMarks);

//  Submit Attendance
router.post("/update-attendance", updateAttendance);

router.get("/student-subjects",getSubjectsForStudent);

router.get("/get-subjects",getSubjectsForYear);

module.exports = router;
