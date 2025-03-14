import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FaHistory, FaLink, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import apiService from '../services/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import moment from 'moment';

const HistoryPage = () => {
    // Fetch recent analyses with React Query
    const { data, isLoading, isError, error, refetch } = useQuery(
        'recentAnalyses',
        () => apiService.getRecentAnalyses(20),
        {
            staleTime: 60000, // 1 minute
        }
    );

    // Handle empty state
    const hasNoData = !isLoading && !isError && (!data || !data.analyses || data.analyses.length === 0);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaHistory className="text-primary-600 mr-2 text-xl" />
                    <h1 className="text-2xl font-bold text-secondary-800">Analysis History</h1>
                </div>

                <button
                    onClick={() => refetch()}
                    className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 transition"
                >
                    Refresh
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : isError ? (
                <ErrorMessage
                    title="Failed to Load History"
                    message="We couldn't load your analysis history."
                    error={error?.error}
                />
            ) : hasNoData ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FaHistory className="text-secondary-400 text-5xl mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-secondary-700 mb-2">No Analysis History</h2>
                    <p className="text-secondary-500 mb-6">
                        You haven't analyzed any websites yet. Start by analyzing a URL.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                        Analyze a URL
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-secondary-200">
                        {data.analyses.map((analysis) => (
                            <li key={analysis.id}>
                                <Link
                                    to={`/analysis/${analysis.id}`}
                                    className="block hover:bg-secondary-50 p-4 transition"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                        <div className="mb-2 sm:mb-0">
                                            <div className="flex items-center">
                                                <FaLink className="text-primary-500 mr-2" />
                                                <h3 className="font-medium text-secondary-800 truncate" style={{ maxWidth: '400px' }}>
                                                    {analysis.url}
                                                </h3>
                                            </div>

                                            <div className="flex items-center mt-1 text-sm text-secondary-500">
                                                <FaCalendarAlt className="mr-1" />
                                                <span>{moment(analysis.created_at).format('MMM D, YYYY [at] h:mm A')}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-6">
                                            <div className="text-center">
                                                <div className="text-xs text-secondary-500 mb-1">HTML</div>
                                                <div className="font-medium text-secondary-700">
                                                    {analysis.html_version || 'Unknown'}
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-xs text-secondary-500 mb-1">Links</div>
                                                <div className="font-medium text-secondary-700">
                                                    {(analysis.internal_links?.count || 0) + (analysis.external_links?.count || 0)}
                                                </div>
                                            </div>

                                            <div className="hidden sm:block text-primary-600">
                                                <FaExternalLinkAlt />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;