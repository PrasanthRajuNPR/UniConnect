import { useState, useEffect } from "react";
import axios from "axios";

const TeacherAttendance = ({ teacherId }) => {
  const [branches, setBranches] = useState([]);
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        console.log("Fetching teacher data for ID:", teacherId);
        const response = await axios.get(`http://localhost:5000/api/teacher/get/${teacherId}`);
        
        const allBranches = response.data.branches;

        
        const branchMap = {};
        allBranches.forEach((item) => {
          const branchId = item.branchId._id;
          if (!branchMap[branchId]) {
            branchMap[branchId] = {
              branchId,
              branchName: item.branchId.branchName,
              years: [],
            };
          }
          branchMap[branchId].years.push(...item.years.map((y) => y.year));
        });

        
        const uniqueBranchList = Object.values(branchMap);
        setUniqueBranches(uniqueBranchList);
        setBranches(allBranches);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeacherData();
  }, [teacherId]);

  
  useEffect(() => {
    if (selectedBranch) {
      const branch = uniqueBranches.find((b) => b.branchId === selectedBranch);
      if (branch) {
        setAvailableYears([...new Set(branch.years)]); 
      }
    } else {
      setAvailableYears([]);
    }
    setSelectedYear(""); 
    setStudents([]);
  }, [selectedBranch, uniqueBranches]);

  
  useEffect(() => {
    if (selectedBranch && selectedYear) {
      const fetchStudents = async () => {
        try {
          console.log("Fetching students for Branch:", selectedBranch, "Year:", selectedYear);
          const response = await axios.get(
            `http://localhost:5000/api/teacher/students?branchId=${selectedBranch}&year=${selectedYear}`
          );
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
      fetchStudents();
    } else {
      setStudents([]); 
    }
  }, [selectedBranch, selectedYear]);

  
  const handleAttendanceSubmit = async () => {
    if (!selectedStudent) {
      setMessage("Please select a student.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/teacher/update-attendance", {
        studentId: selectedStudent,
        date: new Date(),
        status: attendanceStatus,
      });
      setMessage("Attendance marked successfully!");
      setSelectedStudent(""); 
    } catch (error) {
      console.error("Error marking attendance:", error);
      setMessage("Error marking attendance.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Mark Attendance</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Branch Selection (Now Unique) */}
      <label className="block font-medium">Select Branch:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        <option value="">Select Branch</option>
        {uniqueBranches.map((branch) => (
          <option key={branch.branchId} value={branch.branchId}>
            {branch.branchName}
          </option>
        ))}
      </select>

      {/* Year Selection */}
      <label className="block font-medium">Select Year:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        disabled={!selectedBranch || availableYears.length === 0}
      >
        <option value="">Select Year</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            Year {year}
          </option>
        ))}
      </select>

      {/* Student Selection */}
      <label className="block font-medium">Select Student:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        disabled={!selectedYear || students.length === 0}
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.registerNumber} - {student.name}
          </option>
        ))}
      </select>

      {/* Attendance Selection */}
      <label className="block font-medium">Mark Attendance:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={attendanceStatus}
        onChange={(e) => setAttendanceStatus(e.target.value)}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      {/* Submit Button */}
      <button
        onClick={handleAttendanceSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default TeacherAttendance;
