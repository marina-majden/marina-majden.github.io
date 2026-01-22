import React from "react";

const BackgroundGlows: React.FC = () => {
    return (
        <div className='absolute background-glows z-0'>
            <div className='relative glow-blob glow-2 animate-neon-glow w-74 h-74 top-1/2 right-0 '></div>
            <div
                className='glow-blob glow-1 animate-pulse-dynamic w-78 h-70 bottom-0 right-0'
                style={{ animationDelay: "-5s" }}></div>
            <div
                className='glow-blob glow-3 w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                style={{ animationDelay: "-10s" }}></div>
        </div>
    );
};

export default BackgroundGlows;
