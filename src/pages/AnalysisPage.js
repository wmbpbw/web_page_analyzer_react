import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import apiService from '../services/api';
import AnalysisResult from '../components/AnalysisResult';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const AnalysisPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch analysis data with React Query
    const { data, isLoading, isError, error } = useQuery(
        ['analysis', id],
        () => apiService.getAnalysis(id),
        {
            enabled: !!id,
            staleTime: 300000, // 5 minutes
        }
    );

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mr-4 text-secondary-600 hover:text-primary-600"
                >
                    <FaArrowLeft size={18} />
                </button>
                <h1 className="text-2xl font-bold text-secondary-800">Analysis Result</h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : isError ? (
                <ErrorMessage
                    title="Failed to Load Analysis"
                    message={`We couldn't load the analysis details. ${error?.message || ''}`}
                    error={error?.error}
                />
            ) : !data ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-xl font-semibold text-secondary-700 mb-2">Analysis Not Found</h2>
                    <p className="text-secondary-500 mb-6">
                        The analysis you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                        Analyze a New URL
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <a
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700"
                        >
                            Visit Website <FaExternalLinkAlt className="ml-1" size={14} />
                        </a>
                    </div>

                    <AnalysisResult result={data} />
                </div>
            )}
        </div>
    );
};

export default AnalysisPage;