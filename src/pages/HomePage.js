import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FaLink, FaSearch } from 'react-icons/fa';
import apiService from '../services/api';
import AnalysisResult from '../components/AnalysisResult';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
    const [url, setUrl] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    // URL validation function
    const validateUrl = (inputUrl) => {
        try {
            // Try to create a URL object to validate it
            new URL(inputUrl);
            return true;
        } catch (err) {
            // If the URL is not valid, try adding https:// and checking again
            try {
                new URL(`https://${inputUrl}`);
                return 'add-https';
            } catch (err) {
                return false;
            }
        }
    };

    // React Query mutation for URL analysis
    const analysisMutation = useMutation(apiService.analyzeUrl, {
        onSuccess: (data) => {
            // If analysis ID is available, navigate to the analysis page
            if (data && data.id) {
                navigate(`/analysis/${data.id}`);
            }
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset validation error
        setValidationError('');

        // Validate URL
        const isValidUrl = validateUrl(url);

        if (isValidUrl === true) {
            // URL is valid, proceed with analysis
            analysisMutation.mutate(url);
        } else if (isValidUrl === 'add-https') {
            // URL needs https:// prefix
            const httpsUrl = `https://${url}`;
            setUrl(httpsUrl);
            analysisMutation.mutate(httpsUrl);
        } else {
            // URL is invalid
            setValidationError('Please enter a valid URL');
        }
    };

    return (
        <div className="container max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary-800 mb-6">
                    Web Page Analyzer
                </h1>
                <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                    Analyze any web page structure and content with a single click
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="url" className="text-secondary-700 font-medium text-lg">
                            Enter URL to analyze
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLink className="text-secondary-400" />
                            </div>
                            <input
                                id="url"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                    validationError ? 'border-red-500' : 'border-secondary-300'
                                }`}
                            />
                        </div>
                        {validationError && (
                            <p className="text-red-500 text-sm mt-1">{validationError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!url || analysisMutation.isLoading}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition text-lg"
                    >
                        {analysisMutation.isLoading ? (
                            <Spinner size="sm" />
                        ) : (
                            <>
                                <FaSearch className="mr-2" />
                                Analyze
                            </>
                        )}
                    </button>
                </form>
            </div>

            {analysisMutation.isError && (
                <div className="max-w-2xl mx-auto">
                    <ErrorMessage
                        title="Analysis Failed"
                        message={analysisMutation.error?.message || 'Failed to analyze the URL'}
                        error={analysisMutation.error?.error}
                    />
                </div>
            )}

            {analysisMutation.isSuccess && !analysisMutation.data?.id && (
                <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                    <AnalysisResult result={analysisMutation.data} />
                </div>
            )}
        </div>
    );
};

export default HomePage;