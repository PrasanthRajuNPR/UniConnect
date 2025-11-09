import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignment = ({ studentId }) => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/student/marks/${studentId}`, { withCredentials: true })
      .then((response) => {
        setMarks(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to fetch marks.");
        setLoading(false);
      });
  }, [studentId]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
        🎓 Your Marks
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center text-xl font-medium">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-2xl overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-green-400 to-blue-600 text-white text-lg">
                <th className="px-6 py-4 text-left">📖 Subject</th>
                <th className="px-6 py-4 text-left">📅 Year</th>
                <th className="px-6 py-4 text-left">📊 Marks</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white text-gray-800">
              {marks.map((mark, index) => (
                <tr
                  key={index}
                  className={`text-lg ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100 transition`}
                >
                  <td className="px-6 py-4 rounded-l-2xl">{mark.subject}</td>
                  <td className="px-6 py-4">{mark.year}</td>
                  <td
                    className={`px-6 py-4 rounded-r-2xl font-bold ${
                      mark.marks >= 50 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {mark.marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAssignment;
