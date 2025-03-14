import React, { createContext, useState, useContext, useEffect } from 'react';
import keycloak from '../config/keycloak';

// Create context
const KeycloakContext = createContext(null);

// Initial auth state
const initialAuthState = {
    isAuthenticated: false,
    token: null,
    tokenParsed: null,
    userInfo: null,
    keycloak: null,
    initialized: false,
    loading: true,
};

export const KeycloakProvider = ({ children }) => {
    const [authState, setAuthState] = useState(initialAuthState);

    // Initialize Keycloak
    useEffect(() => {
        const initKeycloak = async () => {
            try {
                // Init with onLoad: 'check-sso' to check if the user is already authenticated
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                    checkLoginIframe: false,
                    pkceMethod: 'S256' // Use PKCE for enhanced security
                });

                if (authenticated) {
                    // Update auth state with user info
                    setAuthState({
                        isAuthenticated: true,
                        token: keycloak.token,
                        tokenParsed: keycloak.tokenParsed,
                        userInfo: {
                            id: keycloak.subject,
                            username: keycloak.tokenParsed.preferred_username,
                            email: keycloak.tokenParsed.email,
                            name: keycloak.tokenParsed.name,
                            roles: keycloak.tokenParsed.realm_access?.roles || []
                        },
                        keycloak,
                        initialized: true,
                        loading: false,
                    });

                    // Setup token refresh
                    setupTokenRefresh();
                } else {
                    // User is not authenticated
                    setAuthState({
                        ...initialAuthState,
                        keycloak,
                        initialized: true,
                        loading: false,
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
                setAuthState({
                    ...initialAuthState,
                    keycloak,
                    initialized: true,
                    loading: false,
                });
            }
        };

        initKeycloak();
    }, []);

    // Setup token refresh
    const setupTokenRefresh = () => {
        // Set up token refresh
        setInterval(() => {
            keycloak.updateToken(70)
                .then((refreshed) => {
                    if (refreshed) {
                        // Token was refreshed
                        setAuthState(prevState => ({
                            ...prevState,
                            token: keycloak.token,
                            tokenParsed: keycloak.tokenParsed
                        }));
                    }
                })
                .catch(() => {
                    // Failed to refresh token, logout
                    keycloak.logout();
                });
        }, 60000); // Check every minute
    };

    // Login function
    const login = () => {
        keycloak.login();
    };

    // Logout function
    const logout = () => {
        keycloak.logout();
    };

    // Check if user has specific role
    const hasRole = (role) => {
        return authState.userInfo?.roles?.includes(role) || false;
    };

    // Value provided to consumers
    const contextValue = {
        ...authState,
        login,
        logout,
        hasRole
    };

    return (
        <KeycloakContext.Provider value={contextValue}>
            {children}
        </KeycloakContext.Provider>
    );
};

// Custom hook to use Keycloak auth
export const useKeycloak = () => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloak must be used within a KeycloakProvider');
    }
    return context;
};