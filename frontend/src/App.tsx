import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import VrPage from './components/VrPage';
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import AddEvent from "./pages/AddEvent";
import TeacherAttendance from "./components/TeacherAttendance";
import TeacherAssignMarks from "./components/TeacherAssignMarks";
import VoiceflowChat from "./components/VoiceflowChat"; // Import Chatbot Component
import StudentAttendance from "./components/StudentAttendance";
import EventList from "./components/EventList";
import Academics from "./components/Academics";
import FeePage from "./components/Fee";
import StudentAssignments from "./components/StudentAssignments";
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <VoiceflowChat /> {/* Load chatbot globally */}
      <Routes>
        {/* Pass `setUser` to Login so it can update the state */}
        <Route path="/" element={<Login setUser={setUser} />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<Layout role="admin" email={user?.email} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="teachers" element={<AddTeacher />} />
          <Route path="students" element={<AddStudent />} />
          <Route path="events" element={<AddEvent />} />
          <Route path="fees" element={<div>Fees Management</div>} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={<Layout role="teacher" email={user?.email || "teacher@example.com"} />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<TeacherAttendance teacherId={user?._id} />} />
          <Route path="assignments" element={<TeacherAssignMarks teacherId={user?._id}/>} />
        </Route>

        {/* Student Routes */}
        <Route path="/student/*" element={<Layout role="student" email={user?.email || "student@example.com"} />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="academics" element={<Academics studentId={user._id}/>} />
          <Route path="attendance" element={<StudentAttendance studentId={user?._id}/>} />
          <Route path="assignments" element={<StudentAssignments studentId={user?._id}/>} />
          <Route path="fee" element={<FeePage email={user?.email} name={user?.name} year={user?.year}/>} />
          <Route path="radio" element={<EventList/>} />
          <Route path="jobs" element={<div>Job Detection</div>} />
          <Route path="vr" element={<VrPage />} />
          <Route path="vr/campus" element={<div>Campus VR</div>} />
          <Route path="vr/class" element={<div>Class VR</div>} />
          <Route path="vr/labs" element={<div>Labs VR</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
