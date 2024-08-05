'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/Background.module.css';
import ThemeToggleButton from './ThemeToggleButton';

const ThemeLayout = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`${styles.background} ${theme === 'light' ? styles.light : styles.dark}`}>
      <div className='fixed bottom-4 right-4'>
        <ThemeToggleButton theme={theme} onClickFn={toggleTheme} />
      </div>
      {children}
    </div>
  );
};

export default ThemeLayout;