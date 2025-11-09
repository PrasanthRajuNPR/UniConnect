export type UserRole = 'student' | 'teacher' | 'admin';

export const roleColors: Record<UserRole, { active: string; sidebar: string; hover: string }> = {
  student: { active: 'bg-green-500', sidebar: 'bg-green-200', hover: 'hover:bg-green-300' },
  teacher: { active: 'bg-blue-500', sidebar: 'bg-gray-800', hover: 'hover:bg-gray-700' },
  admin: { active: 'bg-blue-500', sidebar: 'bg-gray-800', hover: 'hover:bg-gray-700' },
};

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}