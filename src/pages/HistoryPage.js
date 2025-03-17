import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FaHistory, FaLink, FaExternalLinkAlt, FaCalendarAlt, FaSync } from 'react-icons/fa';
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
        <div className="max-w-4xl mx-auto py-6">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex items-center">
                    <FaHistory className="text-primary-600 mr-3 text-2xl" />
                    <h1 className="text-2xl font-bold text-secondary-800">Analysis History</h1>
                </div>
            </div>

            {/* Refresh Button - Separated from header */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => refetch()}
                    className="flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 transition"
                >
                    <FaSync className="mr-2" />
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
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    {/* Data Table */}
                    <table className="min-w-full">
                        <thead className="bg-blue-50 border-b border-blue-100">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-secondary-600 uppercase tracking-wider">
                                URL
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-secondary-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-secondary-600 uppercase tracking-wider">
                                HTML Version
                            </th>
                            <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-secondary-600 uppercase tracking-wider">
                                Links
                            </th>
                            <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-secondary-600 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                        {data.analyses.map((analysis) => (
                            <tr key={analysis.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-100">
                                    <div className="flex items-center">
                                        <FaLink className="text-primary-500 mr-2 flex-shrink-0" />
                                        <span className="text-secondary-800 truncate" style={{ maxWidth: '250px' }}>
                                                {analysis.url}
                                            </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-100">
                                    <div className="flex items-center text-sm text-secondary-500">
                                        <FaCalendarAlt className="mr-1 flex-shrink-0" />
                                        <span>{moment(analysis.created_at).format('MMM D, YYYY [at] h:mm A')}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center border-b border-gray-100">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800">
                                            {analysis.html_version || 'Unknown'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center border-b border-gray-100">
                                        <span className="font-medium text-secondary-700">
                                            {(analysis.internal_links?.count || 0) + (analysis.external_links?.count || 0)}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center border-b border-gray-100">
                                    <Link
                                        to={`/analysis/${analysis.id}`}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-800 transition"
                                    >
                                        <FaExternalLinkAlt />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;