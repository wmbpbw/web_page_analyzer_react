import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaHistory, FaSignInAlt } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';
import UserProfile from './UserProfile';

const Header = () => {
    const { isAuthenticated, login } = useKeycloak();

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <Link to="/" className="flex items-center">
                            <FaSearch className="text-primary-600 text-2xl mr-2" />
                            <span className="text-xl font-bold text-secondary-800">Web Analyzer</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-between">
                        <nav className="mr-6">
                            <ul className="flex space-x-6">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `flex items-center text-secondary-600 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                                        }
                                    >
                                        <FaSearch className="mr-1" />
                                        Analyze
                                    </NavLink>
                                </li>
                                {isAuthenticated && (
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
                                )}
                            </ul>
                        </nav>

                        {isAuthenticated ? (
                            <UserProfile />
                        ) : (
                            <button
                                onClick={() => login()}
                                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                            >
                                <FaSignInAlt className="mr-1" />
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;