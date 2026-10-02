import React, { useState, useEffect } from "react";
import { showToast } from "./ToastHub";
import { Sparkles, Copy, Palette } from "lucide-react";

export type ThemeId =
    | "default"
    | "lovecore"
    | "emerald-matrix"
    | "solar-sunset";

interface ThemeOption {
    id: ThemeId;
    label: string;
    colors: string[];
}

const themeOptions: ThemeOption[] = [
    {
        id: "default",
        label: "Cyber Neon",
        colors: ["#00f5ff", "#bf00ff", "#ff00aa"],
    },
    {
        id: "lovecore",
        label: "Lovecore Pink",
        colors: ["#ff3cac", "#ff758c", "#ff1361"],
    },
    {
        id: "emerald-matrix",
        label: "Emerald Matrix",
        colors: ["#00ff88", "#00d26a", "#20e3b2"],
    },
    {
        id: "solar-sunset",
        label: "Solar Sunset",
        colors: ["#ff9100", "#ff3d00", "#ff0077"],
    },
];

export const ThemeSwitcher: React.FC<{
    className?: string;
    compact?: boolean;
}> = ({ className = "", compact = false }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeId>("default");
    const [particlesActive, setParticlesActive] = useState<boolean>(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("wm-theme") as ThemeId;
        if (
            savedTheme &&
            ["default", "lovecore", "emerald-matrix", "solar-sunset"].includes(
                savedTheme,
            )
        ) {
            applyTheme(savedTheme, false);
        }
    }, []);

    const applyTheme = (themeId: ThemeId, notify = true) => {
        setCurrentTheme(themeId);
        if (themeId === "default") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("wm-theme", "default");
        } else {
            document.documentElement.setAttribute("data-theme", themeId);
            localStorage.setItem("wm-theme", themeId);
        }

        if (notify) {
            const themeLabel =
                themeOptions.find((t) => t.id === themeId)?.label || themeId;
            showToast(`Theme calibrated: ${themeLabel}`, "heart");
        }
    };

    const toggleParticles = () => {
        const nextState = !particlesActive;
        setParticlesActive(nextState);
        // Dispatch custom event for background particles controller if present
        window.dispatchEvent(
            new CustomEvent("toggle-particles", {
                detail: { enabled: nextState },
            }),
        );
        showToast(
            nextState
                ? "Cosmic particles active ✨"
                : "Cosmic particles paused",
            "star",
        );
    };

    const copyTokens = () => {
        const tokens = `:root {
  --neon-blue: #00f5ff;
  --neon-purple: #bf00ff;
  --neon-pink: #ff00aa;
  --neon-green: #00ff88;
  --neon-orange: #ff6b00;
  --neon-yellow: #ffd24d;
  --dark-bg: #07070e;
  --card-bg: rgba(13, 14, 25, 0.78);
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
}`;
        navigator.clipboard
            .writeText(tokens)
            .then(() => {
                showToast("Design tokens copied to clipboard! ✦", "success");
            })
            .catch(() => {
                showToast("Token sheet ready in console", "info");
            });
    };

    if (compact) {
        return (
            <div className={`flex items-center gap-1.5 ${className}`}>
                {themeOptions.map((t) => (
                    <button
                        key={t.id}
                        type='button'
                        onClick={() => applyTheme(t.id)}
                        className={`w-5 h-5 rounded-full border transition-transform duration-200 cursor-pointer ${
                            currentTheme === t.id
                                ? "scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{
                            background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
                        }}
                        title={t.label}
                        aria-label={`Select ${t.label} theme`}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`w-full max-w-5xl mx-auto my-6 p-3 md:p-4 rounded-2xl bg-[rgba(14,15,28,0.85)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-lg flex flex-wrap items-center justify-between gap-4 select-none ${className}`}>
            {/* Theme Presets */}
            <div className='flex items-center gap-2 flex-wrap'>
                <span className='font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--neon-blue)] flex items-center gap-1.5 mr-1'>
                    <Palette size={13} />
                    Theme:
                </span>
                {themeOptions.map((t) => {
                    const isActive = currentTheme === t.id;
                    return (
                        <button
                            key={t.id}
                            type='button'
                            onClick={() => applyTheme(t.id)}
                            className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                isActive
                                    ? "bg-[rgba(0,245,255,0.15)] text-white border border-[var(--neon-blue)] shadow-[0_0_12px_rgba(0,245,255,0.3)] scale-105"
                                    : "bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:border-white/30"
                            }`}>
                            <span
                                className='w-2.5 h-2.5 rounded-full inline-block'
                                style={{
                                    background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[2] || t.colors[1]})`,
                                    boxShadow: isActive
                                        ? `0 0 6px ${t.colors[0]}`
                                        : undefined,
                                }}
                            />
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Controls (Particles & Copy Tokens) */}
            <div className='flex items-center gap-2.5 ml-auto'>
                <button
                    type='button'
                    onClick={toggleParticles}
                    className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                        particlesActive
                            ? "bg-[rgba(0,255,136,0.12)] text-[var(--neon-green)] border-[rgba(0,255,136,0.3)] hover:bg-[rgba(0,255,136,0.2)]"
                            : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                    }`}>
                    <Sparkles size={12} />
                    <span>
                        {particlesActive ? "Particles: On" : "Particles: Off"}
                    </span>
                </button>

                <button
                    type='button'
                    onClick={copyTokens}
                    className='px-3 py-1 rounded-full font-mono text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:border-[var(--neon-blue)] hover:text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer'
                    title='Copy CSS Design Tokens'>
                    <Copy size={12} />
                    <span>Tokens</span>
                </button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
