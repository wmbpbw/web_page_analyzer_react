import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaLock } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';
import Spinner from '../components/Spinner';

const LoginPage = () => {
    const { isAuthenticated, login, loading } = useKeycloak();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the path the user was trying to access
    const from = location.state?.from?.pathname || '/';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, loading, navigate, from]);

    // Handle login button click
    const handleLogin = () => {
        login();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="rounded-full bg-primary-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FaUser className="text-primary-600 text-3xl" />
                </div>

                <h1 className="text-2xl font-bold text-secondary-800 mb-4">
                    Sign In
                </h1>

                <p className="text-secondary-600 mb-8">
                    Please sign in to access the Web Analyzer application
                </p>

                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition"
                >
                    <FaSignInAlt className="mr-2" />
                    Sign in with Keycloak
                </button>

                <div className="mt-8 pt-6 border-t border-secondary-200">
                    <p className="text-sm text-secondary-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;