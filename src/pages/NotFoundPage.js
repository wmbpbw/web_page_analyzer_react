import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="max-w-lg mx-auto text-center py-12">
            <FaExclamationTriangle className="text-primary-500 text-6xl mx-auto mb-4" />

            <h1 className="text-4xl font-bold text-secondary-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-secondary-700 mb-6">Page Not Found</h2>

            <p className="text-secondary-600 mb-8">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;