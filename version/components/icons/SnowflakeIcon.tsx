
import React from 'react';

const SnowflakeIcon = () => {
    const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.3,
        transform: `scale(${Math.random() * 0.8 + 0.2})`,
    };
    return (
        <div className="snowflake" style={style}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="5.64" y1="5.64" x2="18.36" y2="18.36"></line><line x1="5.64" y1="18.36" x2="18.36" y2="5.64"></line><line x1="12" y1="2" x2="14" y2="5"></line><line x1="12" y1="2" x2="10" y2="5"></line><line x1="12" y1="22" x2="14" y2="19"></line><line x1="12" y1="22" x2="10" y2="19"></line><line x1="2" y1="12" x2="5" y2="10"></line><line x1="2" y1="12" x2="5" y2="14"></line><line x1="22" y1="12" x2="19" y2="10"></line><line x1="22" y1="12" x2="19" y2="14"></line>
            </svg>
        </div>
    );
};

export default SnowflakeIcon;
