import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaSearch, FaHistory, FaBars, FaTimes } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';
import UserProfile from './UserProfile';

const Header = () => {
    const { isAuthenticated, login } = useKeycloak();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Only show navigation options on certain pages
    const showNavOptions = isAuthenticated && location.pathname !== '/';

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <FaSearch className="text-primary-600 text-2xl mr-2" />
                            <span className="text-xl font-bold text-secondary-800">Web Analyzer</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-secondary-600 hover:text-primary-600 focus:outline-none"
                        >
                            {mobileMenuOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {showNavOptions && (
                            <nav className="mr-6">
                                <ul className="flex space-x-6">
                                    <li>
                                        <NavLink
                                            to="/analyze"
                                            className={({ isActive }) =>
                                                `flex items-center text-secondary-600 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                                            }
                                        >
                                            <FaSearch className="mr-1" />
                                            Analyze
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/history"
                                            className={({ isActive }) =>
                                                `flex items-center text-secondary-600 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                                            }
                                        >
                                            <FaHistory className="mr-1" />
                                            History
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        )}

                        {isAuthenticated ? (
                            <UserProfile />
                        ) : (
                            <button
                                onClick={login}
                                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-secondary-200">
                        {showNavOptions && (
                            <nav className="mb-4">
                                <ul className="space-y-2">
                                    <li>
                                        <NavLink
                                            to="/analyze"
                                            className={({ isActive }) =>
                                                `flex items-center text-secondary-600 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                                            }
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <FaSearch className="mr-1" />
                                            Analyze
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/history"
                                            className={({ isActive }) =>
                                                `flex items-center text-secondary-600 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                                            }
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <FaHistory className="mr-1" />
                                            History
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        )}

                        {isAuthenticated ? (
                            <div className="py-2">
                                <UserProfile />
                            </div>
                        ) : (
                            <button
                                onClick={login}
                                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;