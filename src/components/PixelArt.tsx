import React from "react";

export const PixelHeart: React.FC<{ className?: string; scale?: number }> = ({
    className = "",
    scale = 1,
}) => {
    return (
        <div
            className={`pixel-heart ${className}`}
            style={{
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
            aria-label='Pixel Heart'
            role='img'>
            <div className='heart-pixel' />
        </div>
    );
};

export const MiniPixelHeart: React.FC<{
    className?: string;
    scale?: number;
}> = ({ className = "", scale = 1 }) => {
    return (
        <div
            style={{
                position: "relative",
                width: 42,
                height: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
            className={className}
            aria-hidden='true'>
            <div className='mini-pixel-heart' />
        </div>
    );
};

export const PixelMoon: React.FC<{ className?: string; scale?: number }> = ({
    className = "",
    scale = 1,
}) => {
    return (
        <div
            style={{
                position: "relative",
                width: 140,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
            className={className}
            aria-label='Pixel Moon'
            role='img'>
            <div className='pixel-moon-art' />
        </div>
    );
};

export const PixelBrush: React.FC<{ className?: string; scale?: number }> = ({
    className = "",
    scale = 1,
}) => {
    return (
        <div
            style={{
                position: "relative",
                width: 140,
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
            className={className}
            aria-label='Pixel Paintbrush'
            role='img'>
            <div className='pixel-brush-art' />
        </div>
    );
};

export const PixelStar: React.FC<{ className?: string; scale?: number }> = ({
    className = "",
    scale = 1,
}) => {
    return (
        <div
            style={{
                position: "relative",
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
            className={className}
            aria-label='Pixel Star'
            role='img'>
            <div className='pixel-star-art' />
        </div>
    );
};

/**
 * WMHeartLogo: A bespoke pixel art monogram that forms a glowing heart
 * out of the intertwined letters "W" and "M" (Web Mashina).
 */
export const WMHeartLogo: React.FC<{
    className?: string;
    size?: "sm" | "md" | "lg";
}> = ({ className = "", size = "md" }) => {
    const scale = size === "sm" ? 0.65 : size === "lg" ? 1.3 : 1;
    return (
        <div
            className={`inline-flex items-center justify-center select-none ${className}`}
            style={{
                width: 52 * scale,
                height: 48 * scale,
                filter: "drop-shadow(0 0 10px rgba(0, 245, 255, 0.7)) drop-shadow(0 0 20px rgba(255, 0, 170, 0.5))",
            }}
            aria-label='WM Web Mashina Logo'
            role='img'>
            <svg
                width={52 * scale}
                height={48 * scale}
                viewBox='0 0 52 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='overflow-visible'>
                {/* Pixel Heart Grid with intertwined W / M letterform geometry */}
                {/* Outer Heart Contour Pixels */}
                <rect x='8' y='0' width='8' height='8' fill='#ff00aa' />
                <rect x='16' y='0' width='8' height='8' fill='#ff3cac' />
                <rect x='28' y='0' width='8' height='8' fill='#bf00ff' />
                <rect x='36' y='0' width='8' height='8' fill='#8158ff' />

                <rect x='0' y='8' width='8' height='8' fill='#ff00aa' />
                <rect x='8' y='8' width='8' height='8' fill='#ffffff' />
                <rect x='16' y='8' width='8' height='8' fill='#ff5c92' />
                <rect x='24' y='8' width='8' height='8' fill='#bf00ff' />
                <rect x='32' y='8' width='8' height='8' fill='#8158ff' />
                <rect x='40' y='8' width='8' height='8' fill='#00f5ff' />

                {/* Upper Lobe (M Peaks) */}
                <rect x='0' y='16' width='8' height='8' fill='#ff3cac' />
                <rect x='8' y='16' width='8' height='8' fill='#00f5ff' />
                <rect x='16' y='16' width='8' height='8' fill='#ffd24d' />
                <rect x='24' y='16' width='8' height='8' fill='#00ff88' />
                <rect x='32' y='16' width='8' height='8' fill='#00f5ff' />
                <rect x='40' y='16' width='8' height='8' fill='#00cef5' />

                {/* Mid Section (W / M Junction) */}
                <rect x='4' y='24' width='8' height='8' fill='#ff00aa' />
                <rect x='12' y='24' width='8' height='8' fill='#00f5ff' />
                <rect x='20' y='24' width='8' height='8' fill='#ff00aa' />
                <rect x='28' y='24' width='8' height='8' fill='#bf00ff' />
                <rect x='36' y='24' width='8' height='8' fill='#00f5ff' />

                {/* Lower Heart Section (W base) */}
                <rect x='8' y='32' width='8' height='8' fill='#ff00aa' />
                <rect x='16' y='32' width='8' height='8' fill='#00f5ff' />
                <rect x='24' y='32' width='8' height='8' fill='#ffd24d' />
                <rect x='32' y='32' width='8' height='8' fill='#00ff88' />

                {/* Heart Tip Pixel */}
                <rect x='20' y='40' width='10' height='8' fill='#00f5ff' />
            </svg>
        </div>
    );
};
