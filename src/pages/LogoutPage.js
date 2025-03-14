import React, { useEffect } from 'react';
import { useKeycloak } from '../context/KeycloakContext';
import Spinner from '../components/Spinner';

const LogoutPage = () => {
    const { logout, isAuthenticated, loading } = useKeycloak();

    // Trigger logout on component mount
    useEffect(() => {
        if (isAuthenticated && !loading) {
            // Short delay to ensure the component is fully rendered
            const timer = setTimeout(() => {
                logout();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, loading, logout]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
            <Spinner size="lg" />
            <p className="mt-4 text-secondary-600">
                Logging you out...
            </p>
        </div>
    );
};

export default LogoutPage;