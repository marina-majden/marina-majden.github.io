import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { experimentalApps, ExperimentalApp } from "@/data/lab";
import { useLanguage } from "@/components/LanguageContext";
import {
    PixelMoon,
    PixelBrush,
    PixelStar,
    MiniPixelHeart,
} from "@/components/PixelArt";
import {
    ArrowUpRight,
    Sparkles,
    Box,
    Network,
    Palette,
    Compass,
    Timer,
    Music,
} from "lucide-react";

export const BentoLab: React.FC = () => {
    const { lang } = useLanguage();

    const getAppIcon = (id: string) => {
        switch (id) {
            case "elementos":
                return <PixelMoon scale={0.75} className='scale-75' />;
            case "dreamlike":
                return <PixelBrush scale={0.75} className='scale-75' />;
            case "deltarune":
                return <PixelStar scale={0.8} className='scale-75' />;
            case "liquid":
                return <Box size={24} className='text-[var(--neon-blue)]' />;
            case "neural-network":
                return (
                    <Network size={24} className='text-[var(--neon-purple)]' />
                );
            case "chromalab":
                return (
                    <Palette size={24} className='text-[var(--neon-pink)]' />
                );
            case "color-chemist":
                return (
                    <Sparkles size={24} className='text-[var(--neon-yellow)]' />
                );
            case "flowchart":
                return (
                    <Compass size={24} className='text-[var(--neon-green)]' />
                );
            case "countdown":
                return (
                    <Timer size={24} className='text-[var(--neon-orange)]' />
                );
            case "plur":
                return <Music size={24} className='text-[var(--neon-blue)]' />;
            default:
                return <MiniPixelHeart scale={0.9} />;
        }
    };

    // Helper to render appropriate link (internal React Router vs external HTML app)
    const renderAppLink = (
        app: ExperimentalApp,
        children: React.ReactNode,
        className: string,
    ) => {
        if (app.route.startsWith("/pages/")) {
            return (
                <Link to={app.route} className={className}>
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={app.directUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={className}>
                {children}
            </a>
        );
    };

    // Map app by id
    const appsById: Record<string, ExperimentalApp> = {};
    experimentalApps.forEach((a) => {
        appsById[a.id] = a;
    });

    const elementos = appsById["elementos"];
    const dreamlike = appsById["dreamlike"];
    const liquid = appsById["liquid"];
    const chromalab = appsById["chromalab"];
    const deltarune = appsById["deltarune"];
    const neural = appsById["neural-network"];
    const chemist = appsById["color-chemist"];
    const flowchart = appsById["flowchart"];
    const countdown = appsById["countdown"];
    const plur = appsById["plur"];

    return (
        <section
            id='lab'
            className='py-20 px-4 md:px-8 relative overflow-hidden'>
            {/* Background Ambience */}
            <div className='absolute top-1/3 right-10 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,rgba(191,0,255,0.06)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10' />

            <div className='max-w-7xl mx-auto'>
                <Reveal>
                    <SectionTitle>
                        {lang === "hr"
                            ? "Laboratorij & Mini Webovi"
                            : "Lab & Micro-Sites"}
                    </SectionTitle>
                </Reveal>

                <Reveal delay={100}>
                    <p className='text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-12'>
                        {lang === "hr"
                            ? "Igralište za kreativno kodiranje, interaktivne eksperimente, 3D svjetove i slatke web projekte s vlastitim pixel art identitetom."
                            : "A creative coding playground of interactive experiments, 3D simulations, and cute websites with custom pixel art emblems."}
                    </p>
                </Reveal>

                {/* 12-Column Editorial Bento Grid */}
                <div className='bento-grid'>
                    {/* Bento Box 1: Elementos (Hero Featured - 7 cols) */}
                    {elementos && (
                        <div
                            className='bento-card col-span-12 lg:col-span-7 row-span-2 group min-h-[320px]'
                            style={
                                {
                                    "--bento-accent": "var(--neon-blue)",
                                } as React.CSSProperties
                            }>
                            {/* Radial Glow */}
                            <div className='absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,245,255,0.18)_0%,transparent_70%)] pointer-events-none' />

                            <div>
                                <div className='flex items-center justify-between gap-2 mb-3'>
                                    <span className='bento-eyebrow'>
                                        01 // Interactive Microsite
                                    </span>
                                    {elementos.badge && (
                                        <span className='px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[rgba(0,245,255,0.15)] text-[var(--neon-blue)] border border-[var(--neon-blue)]'>
                                            {elementos.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className='text-3xl font-heading font-extrabold text-white mb-2'>
                                    {elementos.title}
                                </h3>
                                <p className='text-sm text-slate-300 max-w-md leading-relaxed'>
                                    {elementos.description}
                                </p>
                            </div>

                            {/* Center Pixel Emblem */}
                            <div className='my-auto flex items-center justify-center py-4'>
                                {getAppIcon("elementos")}
                            </div>

                            <div className='flex items-center justify-between border-t border-white/10 pt-4 mt-4'>
                                <div className='flex flex-wrap gap-1.5'>
                                    {elementos.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {renderAppLink(
                                    elementos,
                                    <>
                                        <span>
                                            {lang === "hr"
                                                ? "Pokreni"
                                                : "Launch"}
                                        </span>
                                        <ArrowUpRight size={15} />
                                    </>,
                                    "btn btn-outline text-xs px-4 py-1.5 min-h-0",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 2: Dreamlike (Featured Medium - 5 cols) */}
                    {dreamlike && (
                        <div
                            className='bento-card col-span-12 lg:col-span-5 row-span-2 group min-h-[320px]'
                            style={
                                {
                                    "--bento-accent": "var(--neon-pink)",
                                } as React.CSSProperties
                            }>
                            <div className='absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,0,170,0.15)_0%,transparent_70%)] pointer-events-none' />

                            <div>
                                <div className='flex items-center justify-between gap-2 mb-3'>
                                    <span className='bento-eyebrow'>
                                        02 // Ambient Space
                                    </span>
                                    {dreamlike.badge && (
                                        <span className='px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[rgba(255,0,170,0.15)] text-[var(--neon-pink)] border border-[var(--neon-pink)]'>
                                            {dreamlike.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className='text-2xl font-heading font-extrabold text-white mb-2'>
                                    {dreamlike.title}
                                </h3>
                                <p className='text-sm text-slate-300 leading-relaxed'>
                                    {dreamlike.description}
                                </p>
                            </div>

                            <div className='my-auto flex items-center justify-center py-2'>
                                {getAppIcon("dreamlike")}
                            </div>

                            <div className='flex items-center justify-between border-t border-white/10 pt-4 mt-4'>
                                <div className='flex flex-wrap gap-1.5'>
                                    {dreamlike.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {renderAppLink(
                                    dreamlike,
                                    <>
                                        <span>
                                            {lang === "hr"
                                                ? "Istraži"
                                                : "Explore"}
                                        </span>
                                        <ArrowUpRight size={15} />
                                    </>,
                                    "btn btn-outline text-xs px-4 py-1.5 min-h-0",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 3: Liquid Cube (4 cols) */}
                    {liquid && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-4 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-blue)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("liquid")}
                                </div>
                                <span className='bento-eyebrow'>
                                    Physics • 3D
                                </span>
                                <h3 className='text-xl font-heading font-bold text-white'>
                                    {liquid.title}
                                </h3>
                                <p className='text-xs text-slate-300 line-clamp-2'>
                                    {liquid.description}
                                </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    WebGL Fluid
                                </span>
                                {renderAppLink(
                                    liquid,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-blue)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 4: ChromaLab (5 cols) */}
                    {chromalab && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-5 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-purple)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("chromalab")}
                                </div>
                                <span className='bento-eyebrow'>
                                    OKLCH • Color Science
                                </span>
                                <h3 className='text-xl font-heading font-bold text-white'>
                                    {chromalab.title}
                                </h3>
                                <p className='text-xs text-slate-300 line-clamp-2'>
                                    {chromalab.description}
                                </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    CSS @property
                                </span>
                                {renderAppLink(
                                    chromalab,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-purple)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 5: Deltarune Experience (3 cols) */}
                    {deltarune && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-3 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-yellow)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("deltarune")}
                                </div>
                                <span className='bento-eyebrow'>
                                    Pixel Art • Retro
                                </span>
                                <h3 className='text-xl font-heading font-bold text-white'>
                                    {deltarune.title}
                                </h3>
                                <p className='text-xs text-slate-300 line-clamp-2'>
                                    {deltarune.description}
                                </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    Retro 8-bit
                                </span>
                                {renderAppLink(
                                    deltarune,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-yellow)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 6: Neural Network (4 cols) */}
                    {neural && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-4 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-green)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("neural-network")}
                                </div>
                                <span className='bento-eyebrow'>
                                    Three.js • Bloom
                                </span>
                                <h3 className='text-xl font-heading font-bold text-white'>
                                    {neural.title}
                                </h3>
                                <p className='text-xs text-slate-300 line-clamp-2'>
                                    {neural.description}
                                </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    Synapse Graph
                                </span>
                                {renderAppLink(
                                    neural,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-green)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 7: Color Chemist (3 cols) */}
                    {chemist && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-3 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-pink)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("color-chemist")}
                                </div>
                                <span className='bento-eyebrow'>
                                    Palette Mixer
                                </span>
                                <h3 className='text-lg font-heading font-bold text-white'>
                                    {chemist.title}
                                </h3>
                                <p className='text-xs text-slate-300 line-clamp-2'>
                                    {chemist.description}
                                </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    Canvas tool
                                </span>
                                {renderAppLink(
                                    chemist,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-pink)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 8: Flowchart Labirint (2 cols or 3 cols) */}
                    {flowchart && (
                        <div
                            className='bento-card col-span-12 sm:col-span-6 lg:col-span-2 group'
                            style={
                                {
                                    "--bento-accent": "var(--neon-blue)",
                                } as React.CSSProperties
                            }>
                            <div>
                                <div className='bento-icon-circle'>
                                    {getAppIcon("flowchart")}
                                </div>
                                <span className='bento-eyebrow'>Logic</span>
                                <h3 className='text-base font-heading font-bold text-white'>
                                    {flowchart.title}
                                </h3>
                            </div>
                            <div className='mt-2 pt-2 border-t border-white/10 flex justify-between items-center'>
                                <span className='font-mono text-[10px] text-slate-400'>
                                    2D
                                </span>
                                {renderAppLink(
                                    flowchart,
                                    <ArrowUpRight size={15} />,
                                    "text-[var(--neon-blue)] hover:scale-125 transition-transform",
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bento Box 9: 3D Countdown & Plur (3 cols) */}
                    <div
                        className='bento-card col-span-12 sm:col-span-6 lg:col-span-3 group'
                        style={
                            {
                                "--bento-accent": "var(--neon-orange)",
                            } as React.CSSProperties
                        }>
                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='bento-icon-circle w-9 h-9 min-w-[36px] mb-0'>
                                    <Timer size={16} />
                                </div>
                                <div className='bento-icon-circle w-9 h-9 min-w-[36px] mb-0'>
                                    <Music size={16} />
                                </div>
                            </div>
                            <span className='bento-eyebrow'>
                                Audio & Time Sculptures
                            </span>
                            <h3 className='text-lg font-heading font-bold text-white mt-1'>
                                Countdown & Plur
                            </h3>
                            <p className='text-xs text-slate-300'>
                                {lang === "hr"
                                    ? "3D kinetički brojač vremena i audio-vizualni generativni eksperimenti."
                                    : "3D kinetic countdown sculpture and generative audio-visual soundscapes."}
                            </p>
                        </div>
                        <div className='mt-3 pt-3 border-t border-white/10 flex justify-between items-center gap-2'>
                            {countdown &&
                                renderAppLink(
                                    countdown,
                                    <span>Countdown ↗</span>,
                                    "font-mono text-[11px] text-[var(--neon-orange)] hover:underline",
                                )}
                            {plur &&
                                renderAppLink(
                                    plur,
                                    <span>Plur ↗</span>,
                                    "font-mono text-[11px] text-[var(--neon-blue)] hover:underline",
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoLab;
