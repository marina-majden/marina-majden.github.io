import React from "react";

const SpinnerLoader: React.FC = () => {
    return (
        // Dodana tamna pozadina jer su boje svjetle (cyan)
        <div className='flex min-h-screen items-center justify-center bg-slate-950'>
            <div className='relative'>
                {/* Main Container Size */}
                <div className='relative h-32 w-32'>
                    {/* Outer Ring - Slow Spin */}
                    <div
                        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-b-cyan-500 border-r-cyan-500'
                        style={{ animationDuration: "3s" }}></div>

                    {/* Inner Ring - Fast Reverse Spin */}
                    <div
                        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-t-cyan-500'
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

export default SpinnerLoader;
