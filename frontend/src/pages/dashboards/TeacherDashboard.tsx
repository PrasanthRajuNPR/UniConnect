
import { Users, BookOpen, Clock } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Classes', value: '6', icon: Users, color: 'bg-blue-500' },
    { label: 'Assignments', value: '12', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Hours Today', value: '6.5', icon: Clock, color: 'bg-purple-500' },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', class: 'Grade 10-A' },
    { time: '10:30 AM', subject: 'Physics', class: 'Grade 11-B' },
    { time: '12:00 PM', subject: 'Chemistry', class: 'Grade 11-A' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">{class_.subject}</p>
                  <p className="text-sm text-gray-600">{class_.class}</p>
                </div>
                <p className="text-blue-600 font-medium">{class_.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h2>
          <div className="space-y-3">
            {[
              'Grade Mathematics Assignment - Grade 10',
              'Prepare Physics Quiz - Grade 11',
              'Update Attendance Records',
              'Parent-Teacher Meeting Preparation',
            ].map((task, index) => (
              <div
                key={index}
                className="flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;