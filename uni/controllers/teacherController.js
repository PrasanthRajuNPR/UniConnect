const {Marks} = require("../models/models");
const {Teacher,Attendance,Student,Branch} = require("../models/models");
const mongoose = require("mongoose");
//  Update Student Marks
exports.updateMarks = async (req, res) => {
  try {
    const { studentId, subject, year, marks } = req.body;
    await Marks.create({ studentId, subject, year, marks });
    res.status(200).json({ message: "Marks updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Update Attendance
exports.updateAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    await Attendance.create({ studentId, date, status });
    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeacherDetails= async (req, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId(String(req.params.teacherId));
    const teacher = await Teacher.findById(objectId).populate("branches.branchId");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    res.json({ branches: teacher.branches });
  } catch (error) {
    res.status(500).json({ error: "Error fetching teacher data", details: error.message });
  }
}
exports.getStudents=async (req, res) => {
  console.log("API Hit: /students");
  console.log("Full Request Query:", req.query);

  const { branchId, year } = req.query;
  console.log(" Extracted branchId:", branchId, " | year:", year);

  if (!branchId || !year) {
    return res.status(400).json({ error: "Branch ID and Year are required" });
  }

  try {
    const students = await Student.find({
      branchId: new mongoose.Types.ObjectId(String(branchId)), 
      year: parseInt(year), 
    }).select("name registerNumber");

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students", details: error.message });
  }
}

exports.assignMarks=async (req, res) => {
  const marksArray = req.body;
  

  try {
    for (const markDetails of marksArray) {
     const { teacherId, studentId, subject, year, marks } = markDetails;
     if (!teacherId || !studentId || !subject || !year || !marks === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("Mark Details:", markDetails);
      const teacher = await Teacher.findById(teacherId);
    
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    
    const assignedBranch = teacher.branches.find((b) =>
      b.branchId.equals(student.branchId)
    );
    
    console.log("success")
    if (!assignedBranch) {
      return res.status(403).json({ error: "Unauthorized: Cannot assign marks" });
    }
    //  Save Marks
    const newMarks = new Marks({ studentId, subject, year:parseInt(year), marks });
    await newMarks.save();
    }
    

    res.json({ message: "Marks assigned successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error assigning marks", details: error.message });
  }
}
exports.updateAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  if (!studentId || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const attendance = new Attendance({ studentId, date, status });
    await attendance.save();
    res.json({ message: "Attendance updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating attendance", details: error.message });
  }
}


exports.getSubjectsForStudent = async (req, res) => {
  try {
    const { teacherId, studentId } = req.query;


    const student = await Student.findById(studentId).select("branchId year");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    const teacher = await Teacher.findById(teacherId).exec();
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }


    const branchData = teacher.branches.find(
      (b) => b.branchId.toString() === student.branchId.toString()
    );

    if (!branchData) {
      return res.status(404).json({ message: "Teacher not assigned to this branch" });
    }

    const yearData = branchData.years.find((y) => y.year === student.year);
    if (!yearData) {
      return res.status(404).json({ message: "Teacher not assigned to this year" });
    }

    return res.status(200).json({ subjects: yearData.subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSubjectsForYear = async (req, res) => {
  try {
    const { teacherId, branchId, year } = req.query;

    

    const branch = await Branch.findById(branchId).select("years");
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    console.log("Branch Data:", branch);

    const branchSubjects = branch.years.find((y) => y.year == year)?.subjects || [];
    console.log("Branch Subjects:", branchSubjects);
    console.log("Query Params:", req.query);

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }


    const yearsArray = teacher.branches.flatMap(branch => branch.years);
    console.log("teacher : ",teacher.branches);
    console.log("Years Array:", yearsArray);
    const assignedSubjects = teacher.branches
      .find((b) => b.branchId.toString() === branchId)
      ?.years.find((y) => y.year == year)?.subjects || [];
    console.log("Assigned Subjects:", assignedSubjects);

    const matchedSubjects = branchSubjects.filter((subject) => assignedSubjects.includes(subject));

    return res.status(200).json({ subjects: matchedSubjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
