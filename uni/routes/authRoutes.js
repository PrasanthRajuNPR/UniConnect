const express = require("express");
const router = express.Router();
const {Admin} = require("../models/models");
const {Teacher} = require("../models/models");
const {Student} = require("../models/models");

//  Login Route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email
    , password
    , role);
  try {
    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ email });
    } else if (role === "student") {
      user = await Student.findOne({ email });
    }
    
    console.log(user.password+" "+password);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user});
  } catch (error) {
    res.status(400).json({ message: "Server error", error:error.message });
  }
});

module.exports = router;
