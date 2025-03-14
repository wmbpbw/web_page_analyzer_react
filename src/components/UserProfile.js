import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaHistory, FaCog, FaChevronDown } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';

const UserProfile = () => {
    const { userInfo, logout } = useKeycloak();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle logout
    const handleLogout = () => {
        setIsMenuOpen(false);
        logout();
    };

    // Get user avatar text (first letter of name or username)
    const getAvatarText = () => {
        if (userInfo?.name) {
            return userInfo.name.charAt(0).toUpperCase();
        }
        if (userInfo?.username) {
            return userInfo.username.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Get display name
    const getDisplayName = () => {
        return userInfo?.name || userInfo?.username || 'User';
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
            >
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                    {getAvatarText()}
                </div>
                <span className="hidden md:block font-medium text-secondary-700 max-w-[120px] truncate">
          {getDisplayName()}
        </span>
                <FaChevronDown className={`text-secondary-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-secondary-200">
                    <div className="px-4 py-2 border-b border-secondary-200">
                        <div className="font-medium text-secondary-800">{getDisplayName()}</div>
                        <div className="text-sm text-secondary-500 truncate">{userInfo?.email}</div>
                    </div>

                    <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-secondary-700 hover:bg-secondary-50 transition"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaUser className="mr-2 text-secondary-500" />
                        My Profile
                    </Link>

                    <Link
                        to="/history"
                        className="flex items-center px-4 py-2 text-secondary-700 hover:bg-secondary-50 transition"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaHistory className="mr-2 text-secondary-500" />
                        My Analyses
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-secondary-700 hover:bg-secondary-50 transition"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaCog className="mr-2 text-secondary-500" />
                        Settings
                    </Link>

                    <div className="border-t border-secondary-200 mt-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-secondary-700 hover:bg-secondary-50 transition"
                        >
                            <FaSignOutAlt className="mr-2 text-secondary-500" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;