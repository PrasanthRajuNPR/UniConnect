
import { Users, GraduationCap, Calendar, CreditCard } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Teachers', value: '124', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Students', value: '1,234', icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Upcoming Events', value: '8', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$45,678', icon: CreditCard, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              'New teacher registration: John Doe',
              'Updated course schedule for Grade 10',
              'Fee payment received from Student ID: 2024',
              'New event added: Annual Sports Day',
            ].map((activity, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Add New Teacher',
              'Add New Student',
              'Schedule Event',
              'Generate Reports',
            ].map((action, index) => (
              <button
                key={index}
                className="p-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;