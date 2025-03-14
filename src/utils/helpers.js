/**
 * Format a URL for display by removing protocol and trailing slashes
 *
 * @param {string} url - The URL to format
 * @returns {string} - Formatted URL
 */
export const formatUrlForDisplay = (url) => {
    if (!url) return '';

    // Remove protocol
    let formatted = url.replace(/^(https?:\/\/)/, '');

    // Remove trailing slash
    formatted = formatted.replace(/\/$/, '');

    return formatted;
};

/**
 * Truncate a string with ellipsis if it exceeds maxLength
 *
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated string
 */
export const truncate = (str, maxLength = 50) => {
    if (!str) return '';

    if (str.length <= maxLength) {
        return str;
    }

    return str.substring(0, maxLength) + '...';
};

/**
 * Format a date string to a readable format
 *
 * @param {string} dateString - ISO date string
 * @param {string} format - Format type ('relative' or 'full')
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, format = 'relative') => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (format === 'relative') {
        // Calculate time difference in seconds
        const seconds = Math.floor((new Date() - date) / 1000);

        // Less than a minute
        if (seconds < 60) {
            return 'just now';
        }

        // Less than an hour
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }

        // Less than a day
        if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        // Less than a week
        if (seconds < 604800) {
            const days = Math.floor(seconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }

        // Default to full date
        return date.toLocaleDateString();
    }

    // Full date format
    return date.toLocaleString();
};

/**
 * Validate a URL
 *
 * @param {string} url - The URL to validate
 * @returns {boolean|string} - true if valid, 'add-https' if needs protocol, false if invalid
 */
export const validateUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        // Try adding https:// and checking again
        try {
            new URL(`https://${url}`);
            return 'add-https';
        } catch (err) {
            return false;
        }
    }
};

/**
 * Generate a random ID
 *
 * @param {number} length - Length of the ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length);
};