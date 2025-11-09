const express = require("express");
const { addTeacher, addStudent, getBranches, addEvent,getEvents,getSubjectsByBranchAndYear} = require("../controllers/adminController");

const router = express.Router();

router.post("/add-teacher", addTeacher);
router.post("/add-student", addStudent);
router.get("/branches", getBranches);
router.get("/subjects", getSubjectsByBranchAndYear);


// 🔹 Route to add an event
router.post("/add-event", addEvent);

// 🔹 Route to get all events
router.get("/events", getEvents);

module.exports = router;
