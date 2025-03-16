import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center mb-4">
                            <FaSearch className="text-primary-400 text-2xl mr-2" />
                            <span className="text-xl font-bold text-white">Web Analyzer</span>
                        </Link>
                        <p className="text-secondary-300 mb-4 max-w-md">
                            A powerful tool to analyze any webpage's structure, content, and more with a single click.
                            Perfect for developers, SEO specialists, and web enthusiasts.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                <FaGithub size={20} />
                            </a>
                            <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    HTML Analysis
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    Link Validation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    Content Metrics
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    Security Checks
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                                    API
                                </a>
                            </li>
                            <li>
                                <Link to="/help" className="text-secondary-300 hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-secondary-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-secondary-300 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-secondary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-secondary-400 mb-4 md:mb-0">
                        &copy; {currentYear} Web Analyzer. All rights reserved.
                    </p>

                    <div className="flex space-x-4">
                        <Link to="/terms" className="text-secondary-400 hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link to="/help" className="text-secondary-400 hover:text-white transition-colors">
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;