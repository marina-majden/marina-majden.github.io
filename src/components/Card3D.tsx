import React, { useRef } from "react";
import { PixelHeart } from "./PixelArt";
import { showToast } from "./ToastHub";
import { useLanguage } from "./LanguageContext";

interface Card3DProps {
    onAction?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({ onAction }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { lang } = useLanguage();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        }
    };

    const handleClick = () => {
        showToast(
            lang === "hr"
                ? "Pikselizirano srce: naša je ljubav u stvaranju piksel-savršenih stranica! ♡"
                : "Pixelated Heart: our love is in creating pixel-perfect websites! ♡",
            "heart",
        );
        if (onAction) onAction();
    };

    return (
        <div
            ref={cardRef}
            id='interactiveCard3D'
            className='feature-card-3d cursor-pointer select-none'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role='region'
            aria-label='3D Interactive Pixel Heart Card'>
            {/* Top telemetry bar */}
            <div className='flex justify-between items-center mb-6'>
                <span className='font-mono text-[11px] text-[var(--neon-blue)] tracking-[0.14em] uppercase font-bold flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-[var(--neon-green)] shadow-[0_0_10px_var(--neon-green)] animate-pulse' />
                    {lang === "hr"
                        ? "Živo digitalno srce"
                        : "Live Digital Emblem"}
                </span>
                <span className='font-mono text-[10px] text-slate-400 uppercase tracking-widest'>
                    Zero-Asset • 60 FPS
                </span>
            </div>

            {/* Suspended Pixel Heart Stage */}
            <div className='flex justify-center items-center h-44 my-4'>
                <PixelHeart scale={1.05} />
            </div>

            {/* Typography Content */}
            <div className='mt-4'>
                <div className='font-mono text-xs text-[var(--neon-pink)] uppercase tracking-wider mb-2 font-bold'>
                    {lang === "hr"
                        ? "Srce Web Mašine"
                        : "Heart of the Web Machine"}
                </div>
                <h3 className='text-2xl lg:text-3xl font-heading font-extrabold text-white mb-3 leading-snug'>
                    {lang === "hr"
                        ? "Naša ljubav je u stvaranju piksel-savršenih stranica."
                        : "Our love is in creating pixel-perfect websites."}
                </h3>
                <p className='text-sm text-slate-300 leading-relaxed font-sans'>
                    {lang === "hr"
                        ? "Web mašina stvara iz čiste privrženosti ljudima. Spajamo taktilnu nostalgiju digitalne ere s modernom preciznošću, fluidnim animacijama i toplim korisničkim iskustvom."
                        : "The web machine creates out of pure love for humans. Blending early digital nostalgia with contemporary precision, tactile spring physics, and soulful web experiences."}
                </p>
            </div>

            {/* Bottom Bar */}
            <div className='flex justify-between items-center border-t border-[var(--border-subtle)] pt-4 mt-6'>
                <span className='font-mono text-xs font-bold text-[var(--neon-blue)] flex items-center gap-1.5'>
                    <span className='text-[var(--neon-pink)]'>♡</span> 100%
                    CRAFT
                </span>
                <button
                    type='button'
                    className='btn btn-outline text-xs px-3.5 py-1.5 min-h-0'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}>
                    {lang === "hr" ? "Otkrij više ✦" : "Discover ✦"}
                </button>
            </div>
        </div>
    );
};

export default Card3D;
