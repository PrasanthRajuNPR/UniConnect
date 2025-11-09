import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface TeacherAssignMarksProps {
  teacherId: string | number;
}

interface Branch {
  branchId: string;
  branchName: string;
  years: Record<string, string[]>;
}

interface Student {
  _id: string;
  registerNumber: string;
  name: string;
}

const TeacherAssignMarks: React.FC<TeacherAssignMarksProps> = ({ teacherId }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchTeacherData = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teacher/get/${teacherId}`,
          { withCredentials: true }
        );

        console.log("Fetched Teacher Data:", response.data);

        const allBranches = response.data.branches || [];

        const branchMap: Record<string, Branch> = {};
        allBranches.forEach((item: any) => {
          const branchId = item.branchId._id;
          if (!branchMap[branchId]) {
            branchMap[branchId] = {
              branchId,
              branchName: item.branchId.branchName,
              years: {},
            };
          }
          item.years.forEach((y: any) => {
            branchMap[branchId].years[y.year] = y.subjects;
          });
        });

        console.log("Processed Branch Data:", branchMap);
        setBranches(Object.values(branchMap));
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeacherData();
  }, [teacherId]);

  useEffect(() => {
    if (selectedBranch) {
      const branch = branches.find((b) => b.branchId === selectedBranch);
      setAvailableYears(branch ? Object.keys(branch.years) : []);
      setSubjects([]);
    } else {
      setAvailableYears([]);
      setSubjects([]);
    }
    setSelectedYear("");
    setSelectedSubject("");
    setStudents([]);
  }, [selectedBranch, branches]);

  useEffect(() => {
    const fetchSubjects = async (): Promise<void> => {
      if (!selectedBranch || !selectedYear) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/teacher/get-subjects`,
          {
            params: {
              teacherId,
              branchId: selectedBranch,
              year: selectedYear,
            },
            withCredentials: true,
          }
        );

        console.log("Fetched Subjects:", response.data.subjects);
        setSubjects(response.data.subjects || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjects([]);
      }
    };

    fetchSubjects();
    setSelectedSubject("");
  }, [selectedBranch, selectedYear, teacherId]);

  useEffect(() => {
    if (selectedBranch && selectedYear) {
      const fetchStudents = async (): Promise<void> => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/teacher/students?branchId=${selectedBranch}&year=${selectedYear}`,
            { withCredentials: true }
          );
          setStudents(response.data);
          setMarks({});
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
      fetchStudents();
    } else {
      setStudents([]);
      setMarks({});
    }
  }, [selectedBranch, selectedYear]);

  const handleMarksChange = (studentId: string, value: string): void => {
    setMarks((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmitMarks = async (): Promise<void> => {
    if (!selectedSubject) {
      setMessage("Please select a subject!");
      return;
    }
    if (Object.keys(marks).length === 0) {
      setMessage("Please enter marks for at least one student.");
      return;
    }

    try {
      const markEntries = Object.keys(marks).map((studentId) => ({
        teacherId,
        studentId,
        subject: selectedSubject,
        year: selectedYear,
        marks: parseInt(marks[studentId], 10),
      }));

      await axios.post("http://localhost:5000/api/teacher/assign-marks", markEntries, {
        withCredentials: true,
      });

      setMessage("✅ Marks assigned successfully!");
      setMarks({});
    } catch (error) {
      console.error("Error assigning marks:", error);
      setMessage("❌ Failed to assign marks.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Assign Marks</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Branch Selection */}
      <label className="block font-medium">Select Branch:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={selectedBranch}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedBranch(e.target.value)
        }
      >
        <option value="">Select Branch</option>
        {branches.map((branch) => (
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedYear(e.target.value)
        }
        disabled={!selectedBranch}
      >
        <option value="">Select Year</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            Year {year}
          </option>
        ))}
      </select>

      {/* Subject Selection */}
      <label className="block font-medium">Select Subject:</label>
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={selectedSubject}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedSubject(e.target.value)
        }
        disabled={!selectedYear}
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {/* Marks Input for Multiple Students */}
      <label className="block font-medium mb-2">Enter Marks for Students:</label>
      {students.length === 0 ? (
        <p className="text-gray-500">No students available</p>
      ) : (
        students.map((student) => (
          <div key={student._id} className="flex items-center justify-between mb-2">
            <span className="text-sm">
              {student.registerNumber} - {student.name}
            </span>
            <input
              type="number"
              className="w-16 p-1 border rounded-md"
              value={marks[student._id] || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleMarksChange(student._id, e.target.value)
              }
            />
          </div>
        ))
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmitMarks}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        disabled={!selectedSubject || students.length === 0}
      >
        Submit Marks
      </button>
    </div>
  );
};

export default TeacherAssignMarks;
