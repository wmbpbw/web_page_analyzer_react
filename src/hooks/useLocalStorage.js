import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in localStorage
 *
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if none exists in localStorage
 * @returns {Array} [storedValue, setValue] - State value and setter function
 */
function useLocalStorage(key, initialValue) {
    // Get value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Update localStorage when the state changes
    useEffect(() => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                storedValue instanceof Function ? storedValue(storedValue) : storedValue;

            // Save to localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;