import React, { useState } from 'react';
import { FaExclamationTriangle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ErrorMessage = ({ title, message, error }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium text-red-800">{title}</h3>
                    <div className="mt-2 text-red-700">
                        <p>{message}</p>

                        {error && (
                            <div className="mt-3">
                                <button
                                    type="button"
                                    className="flex items-center text-sm text-red-800 hover:text-red-600 focus:outline-none"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? (
                                        <>
                                            <FaChevronUp className="mr-1" />
                                            Hide technical details
                                        </>
                                    ) : (
                                        <>
                                            <FaChevronDown className="mr-1" />
                                            Show technical details
                                        </>
                                    )}
                                </button>

                                {showDetails && (
                                    <pre className="mt-2 p-3 bg-red-100 rounded text-red-900 text-sm overflow-auto">
                    {error}
                  </pre>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;