import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useKeycloak } from '../context/KeycloakContext';
import Spinner from './Spinner';

/**
 * ProtectedRoute component to secure routes with Keycloak authentication
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string[]} [props.requiredRoles] - Optional array of roles required to access the route
 * @returns {React.ReactElement} - The protected route component
 */
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, loading, hasRole } = useKeycloak();
    const location = useLocation();

    // Show loading spinner while Keycloak initializes
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Spinner size="lg" />
            </div>
        );
    }

    // Check authentication
    if (!isAuthenticated) {
        // Redirect to login page, remembering the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check roles if required
    if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => hasRole(role));

        if (!hasRequiredRole) {
            // User doesn't have required roles, redirect to unauthorized page
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // User is authenticated and has required roles, render children
    return children;
};

export default ProtectedRoute;