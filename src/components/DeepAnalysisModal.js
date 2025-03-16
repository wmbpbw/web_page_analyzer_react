import React, { useState, useEffect } from 'react';
import {
    FaClock, FaCogs, FaSearch, FaUniversalAccess,
    FaFileAlt, FaShieldAlt, FaMobileAlt, FaShareAlt,
    FaServer, FaImage, FaCode, FaCookie
} from 'react-icons/fa';
import Spinner from './Spinner';
import apiService from '../services/api';

const DeepAnalysisModal = ({ isOpen, onClose, url, analysisId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('performance');

    useEffect(() => {
        if (isOpen && analysisId) {
            console.log("Fetching deep analysis for ID:", analysisId);
            fetchDeepAnalysis();
        }
    }, [isOpen, analysisId]);

    const fetchDeepAnalysis = async () => {
        try {
            setLoading(true);
            setError(null);
            // For testing/demo purposes, we can use mock data if the API isn't ready
            if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_USE_REAL_API) {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                setData(getMockData());
            } else {
                const result = await apiService.getDeepAnalysis(analysisId);
                setData(result);
            }
        } catch (err) {
            console.error("Error fetching deep analysis:", err);
            setError(err.message || 'Failed to fetch deep analysis data');
        } finally {
            setLoading(false);
        }
    };

    // If modal is not open, don't render anything
    if (!isOpen) return null;

    const renderTabContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Spinner size="lg" />
                    <p className="ml-4 text-secondary-600">Analyzing in depth...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    <h3 className="font-bold">Analysis Error</h3>
                    <p>{error}</p>
                    <button
                        onClick={fetchDeepAnalysis}
                        className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        if (!data) return null;

        // Adding all the missing case statements for the tabs
        switch (activeTab) {
            case 'performance':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Page Load Time"
                                value={`${data.performance.loadTime.toFixed(2)}s`}
                                description="Total time to load the page"
                            />
                            <MetricCard
                                title="Resource Size"
                                value={`${(data.performance.resourceSize / 1024).toFixed(2)} KB`}
                                description="Total size of all resources"
                            />
                            <MetricCard
                                title="Number of Requests"
                                value={data.performance.requests}
                                description="Total HTTP requests made"
                            />
                            <MetricCard
                                title="Time to First Byte"
                                value={`${data.performance.ttfb.toFixed(2)}ms`}
                                description="Time until first byte received"
                            />
                        </div>
                    </div>
                );
            case 'seo':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Title Tag"
                                value={data.seo.titleTag ? "Present" : "Missing"}
                                description="Presence of HTML title tag"
                            />
                            <MetricCard
                                title="Meta Description"
                                value={data.seo.metaDescription ? "Present" : "Missing"}
                                description="Presence of meta description"
                            />
                            <MetricCard
                                title="Heading Structure"
                                value={`${data.seo.headingsScore}/100`}
                                description="Proper use of H1-H6 tags"
                            />
                            <MetricCard
                                title="Keywords"
                                value={data.seo.keywordCount}
                                description="Number of target keywords found"
                            />
                        </div>
                    </div>
                );
            case 'accessibility':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="ARIA Attributes"
                                value={`${data.accessibility.ariaScore}/100`}
                                description="Proper use of ARIA attributes"
                            />
                            <MetricCard
                                title="Alt Text"
                                value={`${data.accessibility.altTextPercentage}%`}
                                description="Images with alt text"
                            />
                            <MetricCard
                                title="Color Contrast"
                                value={`${data.accessibility.contrastScore}/100`}
                                description="Text contrast with background"
                            />
                            <MetricCard
                                title="Keyboard Navigation"
                                value={`${data.accessibility.keyboardScore}/100`}
                                description="Support for keyboard navigation"
                            />
                        </div>
                    </div>
                );
            case 'content':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Word Count"
                                value={data.content.wordCount}
                                description="Total words on page"
                            />
                            <MetricCard
                                title="Readability"
                                value={`${data.content.readabilityScore}/100`}
                                description="Flesch-Kincaid readability score"
                            />
                            <MetricCard
                                title="Grammar Issues"
                                value={data.content.grammarIssues}
                                description="Detected grammar problems"
                            />
                            <MetricCard
                                title="Unique Content"
                                value={`${data.content.uniqueContentScore}/100`}
                                description="Content uniqueness score"
                            />
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="HTTPS"
                                value={data.security.https ? "Enabled" : "Disabled"}
                                description="Secure connection status"
                            />
                            <MetricCard
                                title="Mixed Content"
                                value={data.security.mixedContent ? "Present" : "None"}
                                description="HTTP resources on HTTPS page"
                            />
                            <MetricCard
                                title="Content Security"
                                value={data.security.contentSecurityPolicy ? "Configured" : "Missing"}
                                description="Content Security Policy header"
                            />
                            <MetricCard
                                title="XSS Protection"
                                value={data.security.xssProtection ? "Enabled" : "Disabled"}
                                description="Cross-site scripting protection"
                            />
                        </div>
                    </div>
                );
            case 'mobile':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Viewport"
                                value={data.mobile.viewport ? "Configured" : "Missing"}
                                description="Mobile viewport meta tag"
                            />
                            <MetricCard
                                title="Mobile Friendly"
                                value={`${data.mobile.mobileFriendlyScore}/100`}
                                description="Mobile responsiveness score"
                            />
                            <MetricCard
                                title="Touch Elements"
                                value={`${data.mobile.touchElementsScore}/100`}
                                description="Proper sizing for touch targets"
                            />
                            <MetricCard
                                title="Font Size"
                                value={`${data.mobile.fontSizeScore}/100`}
                                description="Readability of text on mobile"
                            />
                        </div>
                    </div>
                );
            case 'social':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Open Graph"
                                value={data.social.openGraph ? "Present" : "Missing"}
                                description="Facebook Open Graph meta tags"
                            />
                            <MetricCard
                                title="Twitter Cards"
                                value={data.social.twitterCards ? "Present" : "Missing"}
                                description="Twitter Card meta tags"
                            />
                            <MetricCard
                                title="Social Links"
                                value={data.social.socialLinksCount}
                                description="Links to social profiles"
                            />
                            <MetricCard
                                title="Share Buttons"
                                value={data.social.shareButtonsCount}
                                description="Social media share buttons"
                            />
                        </div>
                    </div>
                );
            case 'technology':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="CMS"
                                value={data.technology.cms || "Unknown"}
                                description="Content Management System"
                            />
                            <MetricCard
                                title="JavaScript Libraries"
                                value={data.technology.jsLibrariesCount}
                                description="Number of JS libraries detected"
                            />
                            <MetricCard
                                title="Server Technology"
                                value={data.technology.server || "Unknown"}
                                description="Web server software"
                            />
                            <MetricCard
                                title="Analytics"
                                value={data.technology.analytics ? "Present" : "None"}
                                description="Analytics tools detected"
                            />
                        </div>
                    </div>
                );
            case 'media':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Image Count"
                                value={data.media.imageCount}
                                description="Number of images on page"
                            />
                            <MetricCard
                                title="Image Size"
                                value={`${(data.media.totalImageSize / 1024).toFixed(2)} KB`}
                                description="Total size of all images"
                            />
                            <MetricCard
                                title="Video Count"
                                value={data.media.videoCount}
                                description="Number of videos on page"
                            />
                            <MetricCard
                                title="Lazy Loading"
                                value={data.media.lazyLoading ? "Enabled" : "Disabled"}
                                description="Lazy loading for media"
                            />
                        </div>
                    </div>
                );
            case 'schema':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Schema Types"
                                value={data.schema.typesCount}
                                description="Number of schema.org types"
                            />
                            <MetricCard
                                title="Organization Schema"
                                value={data.schema.organizationSchema ? "Present" : "Missing"}
                                description="Organization structured data"
                            />
                            <MetricCard
                                title="Product Schema"
                                value={data.schema.productSchema ? "Present" : "Missing"}
                                description="Product structured data"
                            />
                            <MetricCard
                                title="Local Business Schema"
                                value={data.schema.localBusinessSchema ? "Present" : "Missing"}
                                description="Local business structured data"
                            />
                        </div>
                    </div>
                );
            case 'cookies':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Cookie Count"
                                value={data.cookies.cookieCount}
                                description="Number of cookies set"
                            />
                            <MetricCard
                                title="Third-Party Cookies"
                                value={data.cookies.thirdPartyCookies}
                                description="Cookies from external domains"
                            />
                            <MetricCard
                                title="Cookie Banner"
                                value={data.cookies.cookieBanner ? "Present" : "Missing"}
                                description="Cookie consent notification"
                            />
                            <MetricCard
                                title="Secure Cookies"
                                value={`${data.cookies.secureCookiesPercentage}%`}
                                description="Cookies with secure flag"
                            />
                        </div>
                    </div>
                );
            case 'links':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard
                                title="Internal Links"
                                value={data.links.internalLinks}
                                description="Links to same domain"
                            />
                            <MetricCard
                                title="External Links"
                                value={data.links.externalLinks}
                                description="Links to other domains"
                            />
                            <MetricCard
                                title="Broken Links"
                                value={data.links.brokenLinks}
                                description="Links that return errors"
                            />
                            <MetricCard
                                title="SEO-Friendly URLs"
                                value={`${data.links.seoFriendlyUrlPercentage}%`}
                                description="Clean, descriptive URLs"
                            />
                        </div>
                    </div>
                );
            default:
                return <div>Select a category to view detailed analysis</div>;
        }
    };

    const tabs = [
        { id: 'performance', label: 'Performance', icon: <FaClock /> },
        { id: 'seo', label: 'SEO', icon: <FaSearch /> },
        { id: 'accessibility', label: 'Accessibility', icon: <FaUniversalAccess /> },
        { id: 'content', label: 'Content', icon: <FaFileAlt /> },
        { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
        { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt /> },
        { id: 'social', label: 'Social Media', icon: <FaShareAlt /> },
        { id: 'technology', label: 'Technology', icon: <FaServer /> },
        { id: 'media', label: 'Media', icon: <FaImage /> },
        { id: 'schema', label: 'Schema Markup', icon: <FaCode /> },
        { id: 'cookies', label: 'Cookies', icon: <FaCookie /> },
        { id: 'links', label: 'Link Analysis', icon: <FaCogs /> },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-secondary-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-secondary-800">Deep Analysis: {url}</h2>
                    <button
                        onClick={onClose}
                        className="text-secondary-500 hover:text-secondary-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="px-6 py-2 border-b border-secondary-200 overflow-x-auto">
                    <div className="flex space-x-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`py-2 px-4 flex items-center space-x-2 whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'text-primary-600 border-b-2 border-primary-600 font-medium'
                                        : 'text-secondary-600 hover:text-secondary-900'
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 overflow-y-auto flex-1">
                    {renderTabContent()}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-secondary-200 flex justify-between items-center bg-secondary-50">
                    <p className="text-sm text-secondary-500">
                        Analysis performed {new Date().toLocaleString()}
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-secondary-200 hover:bg-secondary-300 text-secondary-800 px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper component for metrics
const MetricCard = ({ title, value, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-2xl font-bold text-primary-600">{value}</p>
        <p className="text-sm text-secondary-500">{description}</p>
    </div>
);

// Mock data function for development/testing
function getMockData() {
    return {
        performance: {
            loadTime: 1.24,
            resourceSize: 1024 * 100, // 100KB
            requests: 15,
            ttfb: 320.5
        },
        seo: {
            metaTags: {
                title: "Example Website",
                description: "This is an example website for testing deep analysis",
                keywords: "example, test, deep analysis",
                robots: "index, follow"
            },
            images: {
                total: 12,
                missingAlt: 3
            },
            headerStructure: {
                proper: true
            },
            canonicalUrl: "https://example.com"
        },
        accessibility: {
            ariaAttributes: 8,
            contrastIssues: 2,
            keyboardNavigation: true
        },
        // Add mock data for other categories...
    };
}

export default DeepAnalysisModal;