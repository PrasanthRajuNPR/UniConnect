import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// 👇 Define types for form data and branch objects
interface FormData {
  name: string;
  registerNumber: string;
  email: string;
  password: string;
  branchId: string;
  year: string;
}

interface Branch {
  _id: string;
  branchName: string;
}

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    registerNumber: "",
    email: "",
    password: "",
    branchId: "",
    year: "",
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [message, setMessage] = useState<string>("");

  // ✅ Fetch Branches from Backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get<Branch[]>(
          "http://localhost:5000/api/admin/branches",
          { withCredentials: true }
        );

        console.log("Fetched Branches:", response.data);
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setMessage("Failed to load branches.");
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, registerNumber, email, password, branchId, year } = formData;
    if (!name || !registerNumber || !email || !password || !branchId || !year) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-student",
        formData,
        { withCredentials: true }
      );

      console.log("Student Created:", response.data);
      setMessage("Student added successfully!");

      setFormData({
        name: "",
        registerNumber: "",
        email: "",
        password: "",
        branchId: "",
        year: "",
      });
    } catch (error: any) {
      console.error("Error adding student:", error.response?.data || error);
      setMessage(error.response?.data?.error || "Error adding student.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Student</h2>
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
          type="text"
          name="registerNumber"
          placeholder="Register Number"
          value={formData.registerNumber}
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

        {/* Dropdown for selecting Branch */}
        <select
          name="branchId"
          value={formData.branchId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
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

        {/* Year Input */}
        <input
          type="number"
          name="year"
          placeholder="Year (1-4)"
          min="1"
          max="4"
          value={formData.year}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
