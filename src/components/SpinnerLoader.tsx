import React from "react";

const Tiles: React.FC = () => {
    return (
        <div
            className='p-4 mx-auto w-36 h-36 will-change-auto grid grid-cols-3 gap-2'
            aria-hidden='true'>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-300'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150'></span>
            <span className='w-full h-full bg-lake-500/30 will-change-transform animate-tile'></span>
        </div>
    );
};

const Coil: React.FC = () => {
    return (
        <div
            className='relative p-4 mx-auto w-36 h-36 will-change-auto border border-red'
            aria-hidden='true'>
            <span className='absolute inset-0 bg-white  border-3 border-black/50 border-t-lake-500 rounded-full transform-gpu rotate-0 scale-1 '></span>
            <span className='absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-150 '></span>
            <span className='absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-300'></span>
            <span className='absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-450 '></span>
        </div>
    );
};

const Spinner: React.FC = () => {
    return (
        <div className='relative flex h-full item-center justify-center bg-transparent'>
            {/* Main Container Size */}
            <div className='relative h-32 w-32'>
                {/* Outer Ring - Slow Spin */}
                <div
                    className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-b-purple-500/50 border-r-lake-500/40'
                    style={{ animationDuration: "3s" }}></div>

                {/* Inner Ring - Fast Reverse Spin */}
                <div
                    className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-t-candy-500/50'
                    style={{
                        animationDuration: "2s",
                        animationDirection: "reverse",
                    }}></div>
            </div>
        </div>
    );
};

const SpinnerLoader: React.FC = () => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-deep-space'>
            <div className='relative'>
                {/* Main Container Size */}
                <div className='relative h-32 w-32'>
                    {/* Outer Ring - Slow Spin */}
                    <div
                        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-b-cyan-500/50 border-r-blue-500/40'
                        style={{ animationDuration: "3s" }}></div>

                    {/* Inner Ring - Fast Reverse Spin */}
                    <div
                        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-t-pink-500/50'
                        style={{
                            animationDuration: "2s",
                            animationDirection: "reverse",
                        }}></div>
                </div>

                {/* Glow Effect */}
                <div className='absolute inset-0 animate-pulse rounded-full bg-linear-to-tr from-cyan-500/10 via-transparent to-cyan-500/5 blur-sm'></div>
            </div>
        </div>
    );
};

export { Spinner, SpinnerLoader, Tiles, Coil };
