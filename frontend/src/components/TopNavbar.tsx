import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronDown, LogOut, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { UserRole, roleColors, Theme } from '../types';

interface TopNavbarProps {
  role: UserRole;
  userEmail: string;
  theme: Theme;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ role, userEmail, theme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const colors = roleColors[role];

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('profile');
    setIsDropdownOpen(false);
  };

  return (
    <div className={`h-16 ${colors.active} fixed top-0 left-0 right-0 z-20 transition-colors duration-200`}>
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center space-x-3 text-white">
          <GraduationCap size={32} className="text-white" />
          <span className="text-xl font-bold">UniConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} />
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-100 dark:text-gray-100" />
              </div>
              <span className="text-gray-100 dark:text-gray-100 hidden md:inline">{userEmail}</span>
              <ChevronDown size={20} className="text-gray-100 dark:text-gray-100" />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1"
                >
                  <button
                    onClick={handleProfile}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;