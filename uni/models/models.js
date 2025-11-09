const mongoose = require("mongoose");

//  Branch Schema (Predefined Subjects for Each Year)
const branchSchema = new mongoose.Schema({
  branchName: String, 
  years: [
    {
      year: Number, 
      subjects: [String],
    },
  ],
});

//  Admin Schema (Manages Teachers & Students)
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
});

//  Teacher Schema (Assigned to Multiple Branches & Years)
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branches: [
    {
      branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
      years: [
        {
          year: { type: Number, required: true }, 
          subjects: [{ type: String, required: true }]
        }
      ]
    }
  ]
});
//  Student Schema (References Branch & Year for Subjects)
const studentSchema = new mongoose.Schema({
  name: String,
  registerNumber: String, 
  email: String,
  password: String,
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, 
  year: Number,
});

//  Marks Schema (Linked with Students & Subjects)
const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: String,
  year: Number,
  marks: Number, 
});

//  Attendance Schema (Daily Attendance Tracking)
const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: Date,
  status: { type: String, enum: ["Present", "Absent"] },
});

const events = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  url: {
    type: String,
    required: true, 
  },
});


//  Create Models
const Branch = mongoose.model("Branch", branchSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Student = mongoose.model("Student", studentSchema);
const Marks = mongoose.model("Marks", marksSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);
const Event = mongoose.model("Event",events)
module.exports = { Branch, Admin, Teacher, Student, Marks, Attendance ,Event};

