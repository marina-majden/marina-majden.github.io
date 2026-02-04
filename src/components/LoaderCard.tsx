import React from "react";

const LoaderCard: React.FC = () => {
    return (
        <div className='flex min-h-screen w-full items-center justify-center bg-gray-900 p-4'>
            {/* Main Container */}
            <div className='mx-auto w-[600px] overflow-hidden rounded-xl bg-gray-950 drop-shadow-2xl'>
                {/* Title Bar */}
                <div className='relative flex items-center rounded-t-xl bg-[#202020] p-5 text-white'>
                    {/* Window Controls */}
                    <div className='absolute left-3 flex space-x-2'>
                        <span className='h-3.5 w-3.5 rounded-full bg-[#ff605c] transition-all hover:scale-125 hover:bg-[#ff3b36]'></span>
                        <span className='h-3.5 w-3.5 rounded-full bg-[#ffbd44] transition-all hover:scale-125 hover:bg-[#ffaa33]'></span>
                        <span className='h-3.5 w-3.5 rounded-full bg-[#00ca4e] transition-all hover:scale-125 hover:bg-[#00b44e]'></span>
                    </div>

                    {/* Title Text */}
                    <div className='relative flex-1 animate-pulse text-center text-lg font-semibold text-white'>
                        <div className='text-xl'>Loading...</div>
                    </div>

                    {/* Progress Bar Container (Bottom of Title Bar) */}
                    <div className='absolute bottom-0 left-0 h-1 w-full rounded-t-xl bg-[#333333]'>
                        <div className='animate-progressBar h-full w-[30%] bg-[#00e600]'></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className='flex h-[450px] items-center justify-center bg-[#121212] p-8'>
                    <div className='space-y-6 text-center'>
                        {/* Spinner */}
                        <div className='mx-auto h-24 w-24 animate-spin rounded-full border-4 border-gray-700 border-t-[#00e600]'></div>

                        {/* Main Text */}
                        <div className='animate-fadeIn text-4xl font-semibold text-[#00e600] opacity-90'>
                            Almost There...
                        </div>

                        {/* Subtext */}
                        <div
                            className='animate-fadeIn text-sm text-[#9e9e9e] opacity-80'
                            style={{ animationDelay: "0.3s" }}>
                            <p>We're getting everything ready for you...</p>
                            <p>Sit tight for just a moment.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='bg-[#202020] p-4 text-center font-mono text-xs text-gray-400'>
                    <p>Appreciate your patience. Almost there!</p>
                </div>
            </div>
        </div>
    );
};

export default LoaderCard;
