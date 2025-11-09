import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  ClipboardList,
  BookOpen,
  Radio,
  Briefcase,
  Headphones as VrHeadset,
  Menu,
  X,
} from 'lucide-react';
import { UserRole, roleColors } from '../types';

interface NavItem {
  label: string;
  icon: typeof Home;
  path: string;
}

const navConfigs: Record<UserRole, NavItem[]> = {
  admin: [
    { label: 'Home', icon: Home, path: '/admin' },
    { label: 'Teachers', icon: Users, path: '/admin/teachers' },
    { label: 'Students', icon: GraduationCap, path: '/admin/students' },
    { label: 'Events', icon: Calendar, path: '/admin/events' },
    { label: 'Fees', icon: CreditCard, path: '/admin/fees' },
  ],
  teacher: [
    { label: 'Home', icon: Home, path: '/teacher' },
    { label: 'Attendance', icon: ClipboardList, path: '/teacher/attendance' },
    { label: 'Assignments', icon: BookOpen, path: '/teacher/assignments' },
  ],
  student: [
    { label: 'Home', icon: Home, path: '/student' },
    { label: 'Academics', icon: BookOpen, path: '/student/academics' },
    { label: 'Attendance', icon: ClipboardList, path: '/student/attendance' },
    { label: 'Assignments', icon: BookOpen, path: '/student/assignments' },
    { label: 'Fee', icon: CreditCard, path: '/student/fee' },
    { label: 'Radio', icon: Radio, path: '/student/radio' },
    { label: 'Job Detection', icon: Briefcase, path: '/student/jobs' },
  ],
};

interface SidebarProps {
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = navConfigs[role];
  const colors = roleColors[role];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-md ${
                isActive
                  ? `${colors.active} text-white`
                  : role === 'student'
                  ? 'text-black'
                  : `text-gray-300 ${colors.hover}`
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      
      {role === 'student' && (
        <NavLink
          to="/student/vr"
          className={`flex items-center space-x-3 p-3 rounded-lg text-black ${colors.hover} mt-auto mb-12 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-md`}
          style={{ marginTop: '-15px' }}
        >
          <VrHeadset size={15} />
          <span>VR Mode</span>
        </NavLink>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobileMenuOpen?"":
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg ${colors.active} text-white`}
        >
          <Menu size={24} />
        </button>
      }
      

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block h-screen w-64 ${colors.sidebar} text-white p-6 fixed left-0 top-16`}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`lg:hidden fixed inset-y-16 left-0 w-64 ${colors.sidebar} text-white p-6 z-40`}
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;