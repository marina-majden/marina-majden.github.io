import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import {
    PixelMoon,
    PixelBrush,
    PixelStar,
    PixelHeart,
    WMHeartLogo,
} from "@/components/PixelArt";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface ProjectItem {
    title: string;
    desc: string;
    full: string;
    stack: string[];
    url: string;
    urlShowcase: string;
}

interface ProjectsContent {
    title: string;
    viewProject: string;
    items: ProjectItem[];
}

interface ProjectsProps {
    t: {
        projects: ProjectsContent;
    };
    scrollToSection: (section: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { lang } = useLanguage();
    const items = t.projects.items;

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const currentProject = items[currentIndex];

    // Assign unique pixel art emblem per project
    const getProjectEmblem = (idx: number) => {
        switch (idx % 5) {
            case 0: // Lit Art
                return <PixelHeart scale={0.9} />;
            case 1: // Need Advice / Need Help
                return <PixelMoon scale={0.8} />;
            case 2: // Storybook
                return <PixelBrush scale={0.8} />;
            case 3: // Unplugged
                return <WMHeartLogo size='lg' />;
            case 4: // SongFinder
                return <PixelStar scale={0.85} />;
            default:
                return <PixelHeart scale={0.8} />;
        }
    };

    const accentColors = [
        "var(--neon-pink)",
        "var(--neon-blue)",
        "var(--neon-yellow)",
        "var(--neon-green)",
        "var(--neon-purple)",
    ];
    const activeAccent = accentColors[currentIndex % accentColors.length];

    return (
        <section
            id='projects'
            className='py-20 px-4 md:px-8 relative overflow-hidden'>
            {/* Ambient Nebula Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[radial-gradient(circle,rgba(191,0,255,0.09)_0%,rgba(0,245,255,0.06)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10' />

            <div className='max-w-6xl mx-auto'>
                <Reveal>
                    <SectionTitle>{t.projects.title}</SectionTitle>
                </Reveal>

                <Reveal delay={100}>
                    <p className='text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-12'>
                        {lang === "hr"
                            ? "Odabrani projekti, interaktivne studije slučaja i digitalne aplikacije prikazani kroz pixel art galeriju."
                            : "Selected showcase projects, interactive case studies, and digital applications illustrated through a pixel art gallery."}
                    </p>
                </Reveal>

                {/* Big Header Showcase Card Slider */}
                <div className='relative w-full max-w-5xl mx-auto'>
                    <div
                        className='p-6 md:p-10 rounded-3xl bg-[rgba(14,15,28,0.85)] border border-[var(--border-subtle)] backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_35px_rgba(0,245,255,0.12)] relative overflow-hidden transition-all duration-500'
                        style={{
                            boxShadow: `0 24px 64px rgba(0,0,0,0.8), 0 0 35px ${activeAccent}33`,
                        }}>
                        {/* Top glowing rule */}
                        <div
                            className='absolute top-0 left-0 right-0 h-1 transition-colors duration-500'
                            style={{
                                background: activeAccent,
                                boxShadow: `0 0 14px ${activeAccent}`,
                            }}
                        />

                        {/* Slide Counter & Category */}
                        <div className='flex items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4'>
                            <div className='flex items-center gap-3'>
                                <span className='font-mono text-xs font-bold text-[var(--neon-blue)] uppercase tracking-[0.16em] flex items-center gap-1.5'>
                                    <Sparkles size={13} />
                                    Showcase #
                                    {String(currentIndex + 1).padStart(
                                        2,
                                        "0",
                                    )}{" "}
                                    / {String(items.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Slider Controls */}
                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={prevProject}
                                    className='btn btn-icon w-9 h-9 text-sm'
                                    aria-label='Previous project'>
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={nextProject}
                                    className='btn btn-icon w-9 h-9 text-sm'
                                    aria-label='Next project'>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Showcase Body (Grid Layout: Content + Pixel Art Stage) */}
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                            {/* Left: Content Information (7 cols) */}
                            <div className='lg:col-span-7 flex flex-col justify-between'>
                                <div>
                                    <h3 className='text-3xl md:text-4xl font-heading font-extrabold text-white mb-3'>
                                        {currentProject.title}
                                    </h3>
                                    <p className='text-base text-[var(--neon-blue)] font-medium mb-4'>
                                        {currentProject.desc}
                                    </p>
                                    <p className='text-sm text-slate-300 leading-relaxed font-sans mb-6 line-clamp-4'>
                                        {currentProject.full}
                                    </p>
                                </div>

                                {/* Tech Stack Pills */}
                                <div className='flex flex-wrap gap-2 mb-8'>
                                    {currentProject.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className='px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-200'>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Action Buttons */}
                                <div className='flex flex-wrap gap-3.5 pt-2'>
                                    <Link
                                        to={currentProject.urlShowcase}
                                        className='btn btn-primary text-xs px-6 py-2.5'>
                                        <span>{t.projects.viewProject}</span>
                                        <span aria-hidden='true'>↗</span>
                                    </Link>

                                    {currentProject.url && (
                                        <a
                                            href={currentProject.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='btn btn-outline text-xs px-5 py-2.5 flex items-center gap-1.5'>
                                            <span>Live Web</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Pixel Art Gallery Stage (5 cols) */}
                            <div className='lg:col-span-5 flex flex-col items-center justify-center min-h-[260px] p-6 rounded-2xl bg-black/40 border border-white/10 shadow-inner relative'>
                                <div className='my-auto flex items-center justify-center transform transition-transform duration-500 hover:scale-110'>
                                    {getProjectEmblem(currentIndex)}
                                </div>

                                <span className='font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-4'>
                                    Pure CSS • Zero Asset
                                </span>
                            </div>
                        </div>

                        {/* Slider Progress Indicator Dots */}
                        <div className='flex justify-center items-center gap-2 mt-8 pt-4 border-t border-white/10'>
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        currentIndex === idx
                                            ? "w-8 bg-[var(--neon-blue)] shadow-[0_0_10px_var(--neon-blue)]"
                                            : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label={`Go to project slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
