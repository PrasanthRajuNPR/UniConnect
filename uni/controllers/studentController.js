const { Marks, Attendance, Student, Branch } = require("../models/models");
const mongoose = require("mongoose");
//  Get Student Details (Branch & Year)
exports.getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      branchId: student.branchId,
      year: student.year,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};



//  Get Student Attendance
exports.getStudentAttendance = async (req, res) => {
  const { studentId } = req.params;
  const { date } = req.query; // Date from frontend input

  if (!studentId || !date) {
    return res.status(400).json({ error: "Student ID and Date are required" });
  }

  try {

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      studentId: new mongoose.Types.ObjectId(String(studentId)),
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      studentId,
      date,
      status: attendance ? attendance.status : "Absent",
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Error fetching attendance", details: error.message });
  }
};

exports.getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    

    const marks = await Marks.find({ studentId });

    if (!marks.length) {
      return res.status(404).json({ message: "No marks found for this student." });
    }

    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks", error });
  }
};

exports.getStudentSubjects = async (req, res) => {
  try {
    const studentId = req.params.studentId;


    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });


    const branch = await Branch.findById(student.branchId);
    if (!branch) return res.status(404).json({ message: "Branch not found" });

    console.log("Branch:", branch);

    const yearData = branch.years.find((y) => y.year === student.year);
    if (!yearData) return res.status(404).json({ message: "Year data not found" });

    res.json({ subjects: yearData.subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
