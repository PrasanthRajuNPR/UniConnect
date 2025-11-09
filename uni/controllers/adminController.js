const {Teacher} = require("../models/models");
const {Student} = require("../models/models");
const {Branch} = require("../models/models");

// Add a New Teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password, branches } = req.body;

    
    branches.forEach((branch) => {
      branch.years = branch.years.map((y) => ({
        year: y.year, 
        subjects: y.subjects || [] 
      }));
    });

    const newTeacher = new Teacher({ name, email, password, branches });
    await newTeacher.save();

    res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjectsByBranchAndYear = async (req, res) => {
  try {
    const { branchId, year } = req.query;

    if (!branchId || !year) {
      return res.status(400).json({ error: "Branch ID and Year are required" });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Find subjects for the selected year
    const yearData = branch.years.find((y) => y.year === parseInt(year));
    if (!yearData) {
      return res.status(404).json({ error: "Year not found in this branch" });
    }

    res.json({ subjects: yearData.subjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Add a New Student
exports.addStudent = async (req, res) => {
  try {
    const { name, registerNumber, email, password, branchId, year } = req.body;

    if (!name || !registerNumber || !email || !password || !branchId || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newStudent = new Student({ name, registerNumber, email, password, branchId, year });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: error.message });
  }
};

//  Fetch All Branches with Subjects
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const {Event} = require("../models/models");

//  Add an Event
exports.addEvent = async (req, res) => {
  try {
    const { title, description, date, branchId, url } = req.body;

    if (!title || !description || !date || !branchId || !url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log(req.body);
    const newEvent = await Event.create({ title, description, date, branchId, url });

    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Server error", e: error });
  }
};

//  Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("branchId", "branchName");
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};
