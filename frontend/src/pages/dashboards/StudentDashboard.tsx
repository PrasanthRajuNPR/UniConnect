
import { BookOpen, Clock, Award, Bell } from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const stats = [
    { label: 'Attendance', value: '92%', icon: Clock, color: 'bg-blue-500' },
    { label: 'Assignments', value: '8/10', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Grade Average', value: 'A-', icon: Award, color: 'bg-purple-500' },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson' },
    { time: '10:30 AM', subject: 'Physics', teacher: 'Mrs. Smith' },
    { time: '12:00 PM', subject: 'English', teacher: 'Ms. Davis' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
      
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Classes</h2>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">{class_.subject}</p>
                  <p className="text-sm text-gray-600">{class_.teacher}</p>
                </div>
                <p className="text-blue-600 font-medium">{class_.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Announcements</span>
            </div>
          </h2>
          <div className="space-y-4">
            {[
              'Mathematics quiz tomorrow - Chapter 5',
              'Science project submission deadline extended',
              'Sports day registration open',
              'Parent-teacher meeting next week',
            ].map((announcement, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700"
              >
                {announcement}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { subject: 'Mathematics', task: 'Algebra Exercise', due: '2 days' },
            { subject: 'Physics', task: 'Lab Report', due: '3 days' },
            { subject: 'English', task: 'Essay Submission', due: '5 days' },
          ].map((assignment, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <p className="font-medium text-gray-800">{assignment.subject}</p>
              <p className="text-sm text-gray-600 mt-1">{assignment.task}</p>
              <p className="text-sm text-blue-600 mt-2">Due in {assignment.due}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;