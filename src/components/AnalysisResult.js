import React, { useState } from 'react';
import { FaLink, FaFileCode, FaFont, FaHeading, FaExternalLinkAlt, FaLink as FaInternalLink, FaSignInAlt, FaSearchPlus, FaExternalLinkSquareAlt } from 'react-icons/fa';
import moment from 'moment';
import DeepAnalysisModal from './DeepAnalysisModal';

const AnalysisResult = ({ result }) => {
    const [showDeepAnalysisModal, setShowDeepAnalysisModal] = useState(false);

    if (!result) {
        return <div className="text-center text-secondary-500">No result available</div>;
    }

    const handleOpenDeepAnalysis = () => {
        console.log("Opening deep analysis modal for:", result.id);
        setShowDeepAnalysisModal(true);
    };

    const handleCloseDeepAnalysis = () => {
        setShowDeepAnalysisModal(false);
    };

    return (
        <div className="space-y-6">
            {/* Header Section with URL and Timestamp */}
            <div className="pb-4 border-b border-secondary-200">
                {/* URL Display with Visit Website Link */}
                <div className="flex items-start mb-3">
                    <FaLink className="text-primary-600 mr-2 flex-shrink-0 mt-1" />
                    <div>
                        {<h2 className="text-xl font-semibold text-secondary-800 break-all">
                            {result.url}
                        </h2>}
                        {/*<a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 mt-1"
                        >
                            <FaExternalLinkSquareAlt className="mr-1" />
                            <span>Visit Website</span>
                        </a>*/}
                    </div>
                </div>

                {/* Timestamp and Deep Analysis Button */}
                <div className="flex flex-wrap items-center justify-between">
                    <div className="text-sm text-secondary-500 mr-4">
                        {result.created_at ? (
                            <span>Analyzed {moment(result.created_at).fromNow()}</span>
                        ) : (
                            <span>Analyzed a few seconds ago</span>
                        )}
                    </div>
                    <button
                        onClick={handleOpenDeepAnalysis}
                        className="flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition mt-2 sm:mt-0"
                    >
                        <FaSearchPlus className="mr-2" />
                        <span>Deep Analysis</span>
                    </button>
                </div>
            </div>

            {/* Analysis Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* HTML Version */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <FaFileCode className="text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-secondary-800">HTML Version</h3>
                    </div>
                    <p className="text-secondary-700">{result.html_version || 'Unknown'}</p>
                </div>

                {/* Page Title */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <FaFont className="text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-secondary-800">Page Title</h3>
                    </div>
                    <p className="text-secondary-700 break-words">{result.title || 'No title'}</p>
                </div>

                {/* Headings */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <FaHeading className="text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-secondary-800">Headings</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => (
                            <div key={heading} className="text-center p-2 bg-white rounded border border-secondary-200">
                                <div className="font-semibold text-secondary-800">{heading.toUpperCase()}</div>
                                <div className="text-xl text-primary-600">
                                    {result.headings?.[heading] || 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <FaLink className="text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-secondary-800">Links</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FaInternalLink className="text-primary-500 mr-2" />
                                <span className="text-secondary-700">Internal</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-medium text-primary-600">{result.internal_links?.count || 0}</span>
                                {result.internal_links?.inaccessible > 0 && (
                                    <div className="text-xs text-red-500">
                                        {result.internal_links.inaccessible} inaccessible
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FaExternalLinkAlt className="text-primary-500 mr-2" />
                                <span className="text-secondary-700">External</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-medium text-primary-600">{result.external_links?.count || 0}</span>
                                {result.external_links?.inaccessible > 0 && (
                                    <div className="text-xs text-red-500">
                                        {result.external_links.inaccessible} inaccessible
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <FaSignInAlt className="text-primary-600 mr-2" />
                    <h3 className="text-lg font-medium text-secondary-800">Login Form</h3>
                </div>
                <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full mr-2 ${result.has_login_form ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <p className="text-secondary-700">
                        {result.has_login_form ? 'Page contains a login form' : 'No login form detected'}
                    </p>
                </div>
            </div>

            {/* Deep Analysis Modal */}
            {showDeepAnalysisModal && (
                <DeepAnalysisModal
                    isOpen={showDeepAnalysisModal}
                    onClose={handleCloseDeepAnalysis}
                    url={result.url}
                    analysisId={result.id}
                />
            )}
        </div>
    );
};

export default AnalysisResult;