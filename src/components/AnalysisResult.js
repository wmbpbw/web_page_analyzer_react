import React from 'react';
import { FaLink, FaFileCode, FaFont, FaHeading, FaExternalLinkAlt, FaLink as FaInternalLink, FaSignInAlt } from 'react-icons/fa';
import moment from 'moment';

const AnalysisResult = ({ result }) => {
    if (!result) {
        return <div className="text-center text-secondary-500">No result available</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-secondary-200">
                <div className="flex items-center mb-2 sm:mb-0">
                    <FaLink className="text-primary-600 mr-2" />
                    <h2 className="text-xl font-semibold text-secondary-800 truncate">
                        {result.url}
                    </h2>
                </div>
                {result.created_at && (
                    <div className="text-sm text-secondary-500">
                        Analyzed {moment(result.created_at).fromNow()}
                    </div>
                )}
            </div>

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
                        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading, index) => (
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
        </div>
    );
};

export default AnalysisResult;