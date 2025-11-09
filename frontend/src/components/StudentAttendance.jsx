import React, { useState } from "react";

const StudentAttendance = ({studentId}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  const fetchAttendance = async () => {
    if (!selectedDate) return alert("Please select a date");

    try {
      const response = await fetch(
        `http://localhost:5000/api/student/attendance/${studentId}?date=${selectedDate}`
      );
      const data = await response.json();
      setAttendanceStatus(data.status);
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Check Your Attendance</h1>

      {/* Date Input */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded-md"
      />

      <button
        onClick={fetchAttendance}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Check Attendance
      </button>

      {attendanceStatus && (
        <div
          className={`mt-4 text-lg font-semibold p-3 rounded-md ${
            attendanceStatus === "Present" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {attendanceStatus}
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
