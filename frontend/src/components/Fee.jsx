import React from "react";

const FeePage = ({name,email,year}) => {
  const studentInfo = {
    name: "John Doe",
    studentId: "STU12345",
    course: "B.Tech",
    semester: "4th Semester",
    totalFee: 50000,
    paidFee: 35000,
    dueFee: 15000,
    status: "Pending", 
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Student Fee Details
        </h2>

        {/* Student Info */}
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-600">Email: {email}</p>
          <p className="text-sm text-gray-600">Course : {studentInfo.course}</p>
          <p className="text-sm text-gray-600">Year : {year}</p>
        </div>

        {/* Fee Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Total Fee:</span>
            <span className="font-semibold text-gray-900">₹{studentInfo.totalFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Paid:</span>
            <span className="font-semibold text-green-600">₹{studentInfo.paidFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Due:</span>
            <span className="font-semibold text-red-500">₹{studentInfo.dueFee}</span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-300 rounded-full h-4 mt-2">
            <div
              className="absolute h-full rounded-full"
              style={{
                width: `${(studentInfo.paidFee / studentInfo.totalFee) * 100}%`,
                backgroundColor: "#4CAF50",
              }}
            ></div>
          </div>
        </div>

        {/* Status */}
        <div
          className={`mt-4 text-white text-center py-2 rounded-md font-semibold ${getStatusColor(
            studentInfo.status
          )}`}
        >
          {studentInfo.status}
        </div>

        {/* Actions */}
        
      </div>
    </div>
  );
};

export default FeePage;
