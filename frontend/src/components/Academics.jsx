import React, { useEffect, useState } from "react";
import axios from "axios";
import './Academics.css'; 

const Academics = ({ studentId }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/subjects/${studentId}`, { withCredentials: true });
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [studentId]);

  return (
    <div className="academics-container">
      <h2 className="academics-title">Academic Subjects</h2>
      {loading ? (
        <div className="loading-spinner">
          <p>Loading subjects...</p>
        </div>
      ) : (
        <div className="subjects-table-container">
          <table className="subjects-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{subject}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No subjects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Academics;
