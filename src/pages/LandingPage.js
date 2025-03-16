import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCode, FaLink, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import { useKeycloak } from '../context/KeycloakContext';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const { login, isAuthenticated } = useKeycloak();

    const handleLogin = () => {
        login();
    };

    const features = [
        {
            icon: <FaCode className="feature-icon" />,
            title: 'HTML Analysis',
            description: 'Quickly determine HTML version, structure, and document hierarchy.'
        },
        {
            icon: <FaLink className="feature-icon" />,
            title: 'Link Validation',
            description: 'Identify and validate internal and external links on any webpage.'
        },
        {
            icon: <FaChartBar className="feature-icon" />,
            title: 'Content Metrics',
            description: 'Analyze headings, content structure, and form elements with a single click.'
        },
        {
            icon: <FaShieldAlt className="feature-icon" />,
            title: 'Security Checks',
            description: 'Identify login forms and potential security issues on analyzed pages.'
        }
    ];

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Discover What's Behind the Web</h1>
                    <p className="hero-subtitle">
                        A powerful tool to analyze and inspect any webpage's structure, content, and more with a single click.
                    </p>

                    {isAuthenticated ? (
                        <Link to="/analyze" className="cta-button">
                            Start Analyzing
                        </Link>
                    ) : (
                        <button onClick={handleLogin} className="cta-button">
                            Log In to Start
                        </button>
                    )}
                </div>

                <div className="hero-image">
                    <div className="browser-mockup">
                        <div className="browser-header">
                            <div className="browser-actions">
                                <span className="browser-action red"></span>
                                <span className="browser-action yellow"></span>
                                <span className="browser-action green"></span>
                            </div>
                            <div className="browser-address-bar">
                                <FaSearch className="search-icon" />
                                <span>https://example.com</span>
                            </div>
                        </div>
                        <div className="browser-content">
                            <div className="analyzer-preview">
                                <div className="preview-line"></div>
                                <div className="preview-line short"></div>
                                <div className="preview-line medium"></div>
                                <div className="preview-bar"></div>
                                <div className="preview-grid">
                                    <div className="preview-cell"></div>
                                    <div className="preview-cell"></div>
                                    <div className="preview-cell"></div>
                                    <div className="preview-cell"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2>Why Use Web Analyzer?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Sign In</h3>
                        <p>Log in to access the full range of analysis tools and history tracking.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Enter URL</h3>
                        <p>Provide any website URL that you want to analyze.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Get Results</h3>
                        <p>Receive detailed insights about the webpage's structure and content.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Analyze the Web?</h2>
                <p>Start exploring websites with our powerful analysis tools today.</p>
                {isAuthenticated ? (
                    <Link to="/analyze" className="cta-button">
                        Go to Analyzer
                    </Link>
                ) : (
                    <button onClick={handleLogin} className="cta-button">
                        Log In Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default LandingPage;