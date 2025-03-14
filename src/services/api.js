import axios from 'axios';
import keycloak from '../config/keycloak';

// Get API base URL from environment variables or default to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';

// Create axios instance with common configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    async (config) => {
        // If Keycloak is initialized and user is authenticated
        if (keycloak.authenticated) {
            // Check if token needs to be refreshed
            const shouldRefresh = keycloak.isTokenExpired(30); // Refresh if expires in 30 seconds

            if (shouldRefresh) {
                try {
                    await keycloak.updateToken(30);
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                    // Force login if token refresh fails
                    keycloak.login();
                }
            }

            // Add token to request header
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle authentication errors
        if (error.response && error.response.status === 401) {
            // Unauthorized, force re-login
            keycloak.login();
            return Promise.reject({
                status: 401,
                message: 'Session expired. Please login again.',
            });
        }

        // Handle forbidden errors
        if (error.response && error.response.status === 403) {
            return Promise.reject({
                status: 403,
                message: 'You do not have permission to perform this action.',
            });
        }

        // Format other error responses
        const errorResponse = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'An unexpected error occurred',
            error: error.response?.data?.error || error.message,
        };

        return Promise.reject(errorResponse);
    }
);

// API service object
const apiService = {
    // Analyze a URL
    analyzeUrl: async (url) => {
        try {
            const response = await apiClient.post('/analyze', { url });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get analysis by ID
    getAnalysis: async (id) => {
        try {
            const response = await apiClient.get(`/analysis/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get recent analyses
    getRecentAnalyses: async (limit = 10) => {
        try {
            const response = await apiClient.get('/analyses', {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get current user's analyses
    getUserAnalyses: async (limit = 10) => {
        try {
            const response = await apiClient.get('/user/analyses', {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;