import React, { createContext, useState, useEffect, useContext } from 'react';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
    // Check if dark mode is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on localStorage or system preference
    const [darkMode, setDarkMode] = useState(
        storedTheme ? storedTheme === 'dark' : prefersDark
    );

    // Toggle theme function
    const toggleTheme = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    // Update localStorage and document class when theme changes
    useEffect(() => {
        // Update localStorage
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        // Update document class
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Context value
    const value = {
        darkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};