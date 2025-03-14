import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';

const UnauthorizedPage = () => {
    const { logout, userInfo } = useKeycloak();

    // Handle logout
    const handleLogout = () => {
        logout();
    };

    return (
        <div className="max-w-lg mx-auto text-center py-12">
            <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />

            <h1 className="text-4xl font-bold text-secondary-800 mb-4">Access Denied</h1>
            <h2 className="text-xl font-semibold text-secondary-700 mb-6">
                You don't have permission to access this page
            </h2>

            {userInfo && (
                <div className="mb-8 p-4 bg-secondary-50 rounded-lg">
                    <p className="text-secondary-600">
                        You are signed in as <span className="font-medium">{userInfo.name || userInfo.username}</span>
                        but don't have the required permissions for this action.
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    to="/"
                    className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    <FaHome className="mr-2" />
                    Go to Homepage
                </Link>

                <button
                    onClick={handleLogout}
                    className="inline-flex items-center bg-secondary-200 hover:bg-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-medium transition"
                >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;