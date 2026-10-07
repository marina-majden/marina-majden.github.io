import React, { useRef } from "react";

const FeatureCard3D: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Sprječavamo animaciju ako korisnik preferira smanjeni pokret
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (!wrapperRef.current || !cardRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        cardRef.current.style.transition = "none";
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "rotateX(0) rotateY(0) translateY(0)";
        // Koristimo fallback vrijednost za spring easing u slučaju da globalna varijabla nije dostupna
        cardRef.current.style.transition =
            "transform 0.5s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))";
    };

    return (
        <>
            <style>
                {`
                    .feature-card-3d-wrapper {
                        perspective: 1200px;
                        transform-style: preserve-3d;
                    }
                    
                    .feature-card-3d {
                        position: relative;
                        background: linear-gradient(135deg, rgba(30, 32, 50, 0.8), rgba(15, 16, 25, 0.9));
                        border: 1px solid var(--border-medium, rgba(0, 245, 255, 0.24));
                        border-radius: var(--radius-xl, 32px);
                        box-shadow: var(--shadow-lg, 0 24px 64px rgba(0, 0, 0, 0.7), 0 0 35px rgba(191, 0, 255, 0.15));
                        transform-style: preserve-3d;
                        transition: transform 0.1s ease-out, box-shadow var(--duration-base, 280ms) var(--ease-smooth, cubic-bezier(0.16, 1, 0.3, 1));
                        will-change: transform;
                    }
                    
                    .feature-card-3d::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        border-radius: inherit;
                        background: radial-gradient(circle at top left, var(--neon-blue-soft, rgba(0, 245, 255, 0.12)), transparent 60%);
                        pointer-events: none;
                        transform: translateZ(-1px);
                    }

                    .card-content-3d {
                        transform: translateZ(40px);
                    }

                    .pixel-heart-hero {
                        position: relative;
                        width: 18px;
                        height: 18px;
                        background: transparent;
                        box-shadow: 
                            18px 0 var(--neon-pink, #ff00aa), 36px 0 var(--neon-pink, #ff00aa), 72px 0 var(--neon-purple, #bf00ff), 90px 0 var(--neon-purple, #bf00ff),
                            0 18px var(--neon-pink, #ff00aa), 18px 18px #ffffff, 36px 18px var(--neon-pink, #ff00aa), 54px 18px var(--neon-purple, #bf00ff), 72px 18px var(--neon-purple, #bf00ff), 90px 18px var(--neon-blue, #00f5ff), 108px 18px var(--neon-blue, #00f5ff),
                            0 36px var(--neon-pink, #ff00aa), 18px 36px var(--neon-pink, #ff00aa), 36px 36px var(--neon-purple, #bf00ff), 54px 36px var(--neon-purple, #bf00ff), 72px 36px var(--neon-blue, #00f5ff), 90px 36px var(--neon-blue, #00f5ff), 108px 36px var(--neon-blue, #00f5ff),
                            18px 54px var(--neon-pink, #ff00aa), 36px 54px var(--neon-purple, #bf00ff), 54px 54px var(--neon-purple, #bf00ff), 72px 54px var(--neon-blue, #00f5ff), 90px 54px var(--neon-blue, #00f5ff),
                            36px 72px var(--neon-purple, #bf00ff), 54px 72px var(--neon-purple, #bf00ff), 72px 72px var(--neon-blue, #00f5ff),
                            54px 90px var(--neon-purple, #bf00ff);
                        animation: floatPixelHeart 4s ease-in-out infinite;
                    }

                    @keyframes floatPixelHeart {
                        0%, 100% { transform: translateY(0) rotate(-2deg); filter: drop-shadow(0 0 15px var(--neon-pink-glow, rgba(255, 0, 170, 0.45))); }
                        50% { transform: translateY(-15px) rotate(2deg); filter: drop-shadow(0 0 25px var(--neon-blue-glow, rgba(0, 245, 255, 0.45))); }
                    }

                    .badge-dot-live {
                        width: 8px; height: 8px;
                        border-radius: 50%;
                        background: var(--neon-green, #00ff88);
                        box-shadow: 0 0 8px var(--neon-green, #00ff88);
                        animation: pulseDot 2s infinite;
                    }

                    @keyframes pulseDot {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.8); }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .feature-card-3d { transform: none !important; }
                        .pixel-heart-hero, .badge-dot-live { animation: none !important; }
                    }
                `}
            </style>

            <div
                ref={wrapperRef}
                className='feature-card-3d-wrapper w-full max-w-md mx-auto aspect-square'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <div
                    id='interactiveCard3D'
                    ref={cardRef}
                    className='feature-card-3d w-full h-full p-8 flex flex-col justify-between items-center text-center'>
                    <div className='card-content-3d w-full flex justify-between items-start'>
                        <span className='font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/50'>
                            id: core_engine
                        </span>
                        <span className='font-mono text-[10px] bg-white/10 text-white px-2 py-1 rounded'>
                            Machinae pro populo
                        </span>
                    </div>

                    <div className='card-content-3d flex-grow flex items-center justify-center pt-8 pr-24 pb-24'>
                        <div
                            className='pixel-heart-hero'
                            aria-label='Pulsating Pixel Heart'></div>
                    </div>

                    <div className='card-content-3d w-full border-t border-white/10 pt-4 mt-8 flex justify-between items-center'>
                        <div className='text-left'>
                            <h4 className='text-white text-lg font-semibold m-0 font-sans'>
                                essence.exe
                            </h4>
                            <span className='text-xs text-[#00ff88] font-mono'>
                                Executing smoothly
                            </span>
                        </div>
                        <button
                            className='bg-transparent text-[#ff00aa] border border-[rgba(255,0,170,0.38)] shadow-[inset_0_0_10px_rgba(255,0,170,0.12),0_0_10px_rgba(255,0,170,0.12)] px-4 py-2 text-xs rounded-full font-bold font-sans hover:bg-[rgba(255,0,170,0.12)] hover:shadow-[inset_0_0_15px_rgba(255,0,170,0.45),0_0_20px_rgba(255,0,170,0.45)] hover:-translate-y-[2px] transition-all duration-150'
                            aria-label='Extract Source'>
                            Gift
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureCard3D;
