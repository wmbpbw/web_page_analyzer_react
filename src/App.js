import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KeycloakProvider, useKeycloak } from './context/KeycloakContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import Spinner from './components/Spinner';

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useKeycloak();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <KeycloakProvider>
                <ThemeProvider>
                    <Router>
                        <div className="flex flex-col min-h-screen bg-secondary-50">
                            <Header />

                            <main className="flex-grow">
                                <Routes>
                                    {/* Public routes */}
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/logout" element={<LogoutPage />} />
                                    <Route path="/unauthorized" element={<UnauthorizedPage />} />

                                    {/* Protected routes */}
                                    <Route
                                        path="/analyze"
                                        element={
                                            <ProtectedRoute>
                                                <HomePage />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/history"
                                        element={
                                            <ProtectedRoute>
                                                <HistoryPage />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/analysis/:id"
                                        element={
                                            <ProtectedRoute>
                                                <AnalysisPage />
                                            </ProtectedRoute>
                                        }
                                    />

                                    {/* Catch all */}
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    </Router>
                </ThemeProvider>
            </KeycloakProvider>
        </QueryClientProvider>
    );
}

export default App;