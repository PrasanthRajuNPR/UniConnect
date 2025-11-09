import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { UserRole } from '../types';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  role: UserRole;
  email: string;
}

const Layout: React.FC<LayoutProps> = ({ role, email }) => {
  const theme = useTheme();

  return (
    <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${
      theme.isDark ? 'dark' : ''
    }`}>
      <TopNavbar role={role} userEmail={email} theme={theme} />
      <Sidebar role={role} />
      <div className="flex-1 lg:ml-64">
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;