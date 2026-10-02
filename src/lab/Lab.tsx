import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Layers, Sparkles, ExternalLink, Play } from "lucide-react";
import { CloudPlaceholder, GoldParticle } from "./Background.tsx";
import MegaProjectCard from "./MegaProjectCard.tsx";
import PlaygroundSection from "./PlaygroundSection.tsx";
import TasteTestSection from "./TasteTestSection.tsx";
import WorkflowSection from "./WorkflowSection.tsx";
import { experimentalApps } from "../data/lab.ts";

const Lab = () => {
    return (
        <div className='bg-slate-900 min-h-screen text-slate-100'>
            <Link
                to='/'
                className='absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-all hover:translate-x-[-5px] font-mono z-50'>
                <ArrowRight className='rotate-180' size={20} /> Povratak na
                portfolio
            </Link>

            {/* Header & Clouds */}
            <h1 className='text-5xl md:text-7xl font-bold text-white text-center pt-24 mb-6 flex items-center justify-center gap-4'>
                <FlaskConical
                    className='text-cyan-400 animate-pulse'
                    size={68}
                />
                <span className='bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                    Laboratorij
                </span>
            </h1>
            <p className='text-center text-slate-400 max-w-3xl mx-auto mb-16 px-6 text-lg leading-relaxed'>
                Istražite interaktivne eksperimente, slatke mini-web stranice, 3D vizuale i prototipove iz mog kreativnog koda.
            </p>

            <CloudPlaceholder className='top-1/4 left-1/4' delay={0} />
            <CloudPlaceholder className='top-1/3 right-1/4' delay={2} />
            <CloudPlaceholder className='bottom-1/4 left-1/3' delay={4} />
            <CloudPlaceholder className='bottom-1/3 right-1/3' delay={6} />
            {Array.from({ length: 30 }).map((_, index) => (
                <GoldParticle key={index} delay={(index * 0.17) % 5} />
            ))}

            {/* Apps & Cute Websites Gallery */}
            <section id='apps-gallery' className='relative py-16 px-6 md:px-12 bg-slate-950/60 border-y border-white/5'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 border border-cyan-500/20'>
                            <Sparkles size={14} /> Interactive Experiments
                        </div>
                        <h2 className='text-3xl md:text-5xl font-bold text-white mb-4'>
                            Cute Websites & Visual Toys
                        </h2>
                        <p className='text-slate-400 max-w-2xl mx-auto'>
                            Kolekcija samostalnih interaktivnih svjetova, WebGL simulacija i retro igračaka.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {experimentalApps.map((app) => (
                            <div
                                key={app.id}
                                className='group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex flex-col justify-between'>
                                <div>
                                    <div className='flex items-center justify-between gap-2 mb-3'>
                                        <span className='text-xs font-mono text-cyan-400 tracking-wider uppercase'>
                                            {app.subtitle}
                                        </span>
                                        {app.badge && (
                                            <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30'>
                                                {app.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                                        {app.title}
                                    </h3>
                                    <p className='text-slate-400 text-sm leading-relaxed mb-6'>
                                        {app.description}
                                    </p>
                                </div>

                                <div>
                                    <div className='flex flex-wrap gap-1.5 mb-6'>
                                        {app.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className='px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-xs font-mono border border-white/5'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className='flex items-center gap-3 pt-2 border-t border-white/5'>
                                        <Link
                                            to={app.route}
                                            className='flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-sm transition-all'>
                                            <Play size={14} className='fill-current' /> Pokreni
                                        </Link>
                                        <a
                                            href={app.directUrl}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10'
                                            title='Otvori u punom zaslonu / New tab'>
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* X-Ray Showcase */}
            <section
                id='xray'
                className='relative py-24 px-6 md:px-12 bg-slate-900 overflow-hidden'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4'>
                            <Layers className='text-rose-400' size={40} />
                            <span>Ispod haube</span>
                        </h2>
                    </div>
                    <MegaProjectCard />
                </div>
            </section>

            {/* Playground Section */}
            <PlaygroundSection />

            {/* Taste Test Section */}
            <TasteTestSection />

            {/* Workflow Section */}
            <WorkflowSection />
        </div>
    );
};

export default Lab;

