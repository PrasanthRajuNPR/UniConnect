import React from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, User, Shield } from 'lucide-react';
import { UserRole } from '../types';

interface LocationState {
  email: string;
  role: UserRole;
}

const Profile: React.FC = () => {
  const location = useLocation();
  const { email, role } = location.state as LocationState;

  const roleDisplayName = {
    admin: 'Administrator',
    teacher: 'Teacher',
    student: 'Student'
  }[role];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">User Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <User size={64} className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Mail className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">{email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Shield className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-gray-900 dark:text-white">{roleDisplayName}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Change Password
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Notification Preferences
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Privacy Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;