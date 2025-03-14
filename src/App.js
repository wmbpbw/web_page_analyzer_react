import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './context/ThemeContext';
import { KeycloakProvider } from './context/KeycloakContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from "./components/ProtectedRoutes";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <KeycloakProvider>
          <ThemeProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-secondary-50">
                <Header />

                <main className="flex-grow container mx-auto px-4 py-8">
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />

                    {/* Protected routes */}
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

                    {/* Admin routes example */}
                    <Route
                        path="/admin"
                        element={
                          <ProtectedRoute requiredRoles={['admin']}>
                            <div>Admin Panel</div>
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