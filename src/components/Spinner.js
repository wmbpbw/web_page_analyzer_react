import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
    // Size mapping
    const sizeMap = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-2',
        lg: 'h-12 w-12 border-3',
        xl: 'h-16 w-16 border-4',
    };

    const sizeClass = sizeMap[size] || sizeMap.md;

    return (
        <div className={`${className} flex justify-center items-center`}>
            <div
                className={`${sizeClass} rounded-full border-primary-200 border-t-primary-600 animate-spin`}
            ></div>
        </div>
    );
};

export default Spinner;