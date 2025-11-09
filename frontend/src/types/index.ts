export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  email: string;
  role: UserRole;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export const roleColors = {
  admin: {
    primary: 'from-indigo-500 to-purple-600',
    sidebar: 'bg-indigo-900',
    active: 'bg-indigo-600',
    hover: 'hover:bg-indigo-800',
  },
  teacher: {
    primary: 'from-blue-500 to-cyan-600',
    sidebar: 'bg-blue-900',
    active: 'bg-blue-600',
    hover: 'hover:bg-blue-800',
  },
  student: {
    primary: 'from-emerald-500 to-teal-600',
    sidebar: 'bg-emerald-900',
    active: 'bg-emerald-600',
    hover: 'hover:bg-emerald-800',
  },
} as const;