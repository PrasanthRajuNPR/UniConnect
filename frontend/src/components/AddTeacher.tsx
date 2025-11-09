import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Year {
  year: number;
  subjects: string[];
}

interface Branch {
  _id: string;
  branchName: string;
  years: Year[];
}

interface TeacherBranch {
  branchId: string;
  years: Year[];
}

interface FormData {
  name: string;
  email: string;
  password: string;
  branches: TeacherBranch[];
}

const AddTeacher: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    branches: [],
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get<Branch[]>(
          "http://localhost:5000/api/admin/branches",
          { withCredentials: true }
        );
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  // Update subjects based on selected branch and years
  useEffect(() => {
    if (!selectedBranch || selectedYears.length === 0) {
      setSubjects([]);
      return;
    }

    const branch = branches.find((b) => b._id === selectedBranch);
    const yearSubjects =
      branch?.years
        .filter((y) => selectedYears.includes(y.year))
        .flatMap((y) => y.subjects) || [];
    setSubjects(yearSubjects);
  }, [selectedBranch, selectedYears, branches]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(e.target.value);
    setSelectedYears([]);
    setSubjects([]);
    setSelectedSubject("");
  };

  const handleYearChange = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleSubjectSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const addBranch = () => {
    if (!selectedBranch || selectedYears.length === 0 || !selectedSubject) {
      setMessage("Please select a branch, at least one year, and a subject.");
      return;
    }

    const newBranch: TeacherBranch = {
      branchId: selectedBranch,
      years: selectedYears.map((year) => ({
        year,
        subjects: [selectedSubject],
      })),
    };

    setFormData((prev) => ({
      ...prev,
      branches: [...prev.branches, newBranch],
    }));

    setSelectedBranch("");
    setSelectedYears([]);
    setSubjects([]);
    setSelectedSubject("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/add-teacher", formData);
      setMessage("Teacher added successfully!");
      setFormData({ name: "", email: "", password: "", branches: [] });
    } catch (error) {
      setMessage("Error adding teacher");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Teacher</h2>
      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Branch Dropdown */}
        <select
          value={selectedBranch}
          onChange={handleBranchSelect}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Branch</option>
          {branches.length > 0 ? (
            branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branchName}
              </option>
            ))
          ) : (
            <option disabled>Loading branches...</option>
          )}
        </select>

        {/* Year Selection */}
        <div className="space-y-2">
          <label className="block font-medium">Select Years:</label>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((year) => (
              <label key={year} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={year}
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearChange(year)}
                  className="w-4 h-4"
                />
                <span>{year} Year</span>
              </label>
            ))}
          </div>
        </div>

        {subjects.length > 0 && (
          <select
            value={selectedSubject}
            onChange={handleSubjectSelect}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={addBranch}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Branch + Year + Subject
        </button>

        <ul className="list-disc pl-6 mt-2 text-sm">
          {formData.branches.map((b, index) => (
            <li key={index}>
              {branches.find((br) => br._id === b.branchId)?.branchName} - Years:{" "}
              {b.years.map((y) => `${y.year} (${y.subjects.join(", ")})`).join(", ")}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
