import React from "react";

const BackgroundGlows: React.FC = () => {
    return (
        <div className='absolute w-screen h-screen top-1/2 left-1/2 z-0'>
            <div className='glow-blob glow-1 top-0 left-0 w-74 h-74 border-2 border-yellow-400 '></div>
            <div
                className='glow-blob glow-2 border-2 border-red-500 w-78 h-70 bottom-0 right-0'
                style={{ animationDelay: "-5s" }}></div>
            <div
                className='relative glow-blob glow-3 w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-500'
                style={{ animationDelay: "-10s" }}></div>
        </div>
    );
};

export default BackgroundGlows;
