
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme }) => {
  return (
    <button
      onClick={theme.toggle}
      className="p-2 rounded-lg transition-colors dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme.isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

export default ThemeToggle;