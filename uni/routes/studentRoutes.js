const express = require("express");
const mongoose = require("mongoose");
const { getStudentMarks, getStudentAttendance, getStudentDetails ,getStudentSubjects } = require("../controllers/studentController");
const { Attendance } = require("../models/models");

const router = express.Router();

//  Fetch Student Details
router.get("/:studentId", getStudentDetails);

//  Fetch Student Marks
router.get("/marks/:studentId", getStudentMarks);

//  Fetch Student Attendance for a Specific Date
router.get("/attendance/:studentId", getStudentAttendance);

// Route to fetch marks of a student
router.get("/marks/:studentId", getStudentMarks);

router.get("/subjects/:studentId", getStudentSubjects);

module.exports = router;
