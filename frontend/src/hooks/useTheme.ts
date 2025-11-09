import { useState, useEffect } from 'react';
import { Theme } from '../types';

export function useTheme(): Theme {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark(!isDark),
  };
}