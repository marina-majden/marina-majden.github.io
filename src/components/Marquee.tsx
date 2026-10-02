import React from "react";

interface MarqueeProps {
    phrase?: string;
    speed?: number; // in seconds
    className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
    phrase = "in * love * in * pixel *",
    speed = 22,
    className = "",
}) => {
    // Generate repeated segments so the marquee is seamlessly endless
    const items = Array.from({ length: 8 });

    return (
        <div
            className={`marquee-container py-4 my-6 select-none border-y border-[var(--border-subtle)] bg-[rgba(14,15,28,0.45)] backdrop-blur-sm ${className}`}
            aria-hidden='true'>
            <div
                className='marquee-track'
                style={{ animationDuration: `${speed}s` }}>
                {items.map((_, i) => (
                    <span
                        key={i}
                        className='inline-flex items-center gap-6 mx-4 font-mono font-bold text-sm md:text-base lg:text-lg tracking-[0.25em] uppercase text-slate-300'>
                        <span className='hover:text-white transition-colors duration-200'>
                            in
                        </span>
                        <span className='text-[var(--neon-pink)] drop-shadow-[0_0_8px_var(--neon-pink)] text-base'>
                            ✦
                        </span>
                        <span className='text-[var(--neon-pink)] font-extrabold hover:text-white transition-colors duration-200'>
                            love
                        </span>
                        <span className='text-[var(--neon-blue)] drop-shadow-[0_0_8px_var(--neon-blue)] text-base'>
                            ✦
                        </span>
                        <span className='hover:text-white transition-colors duration-200'>
                            in
                        </span>
                        <span className='text-[var(--neon-purple)] drop-shadow-[0_0_8px_var(--neon-purple)] text-base'>
                            ✦
                        </span>
                        <span className='text-[var(--neon-blue)] font-extrabold hover:text-white transition-colors duration-200'>
                            pixel
                        </span>
                        <span className='text-[var(--neon-green)] drop-shadow-[0_0_8px_var(--neon-green)] text-base'>
                            ✦
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
