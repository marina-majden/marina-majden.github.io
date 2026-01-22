import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

// TODO: Replace placeholder images and links with actual project data from src/data/data.js
const Projects = ({ t }) => (
    <section id='projects' className='py-24'>
        <div className='container mx-auto px-6'>
            <Reveal>
                <SectionTitle>{t.projects.title}</SectionTitle>
            </Reveal>
            <h1 className='font-serif text-5xl md:text-8xl leading-tight text-transparent bg-clip-text bg-linear-to-r from-white via-gray-100 to-gray-400 drop-shadow-lg'>
                Nevidljive veze <br />
                <span className='text-gradient italic'>digitalnog uma</span>
            </h1>
            <div className='grid lg:grid-cols-2 gap-8 mt-12'>
                {t.projects.items.map((project, idx) => (
                    <Reveal
                        key={idx}
                        delay={idx * 100}
                        className={idx === 0 ? "lg:col-span-2" : ""}>
                        <div
                            className={`group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl ${
                                idx === 0 ? "lg:flex lg:h-[400px]" : "h-[400px]"
                            }`}>
                            {/* Image Area */}
                            <div
                                className={`bg-slate-800 relative overflow-hidden ${
                                    idx === 0
                                        ? "lg:w-3/5 h-64 lg:h-full"
                                        : "h-1/2"
                                }`}>
                                <div className='absolute inset-0 bg-linear-to-b-to-br from-purple-900/40 to-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-700'>
                                    <span className="font-['Fira_Code'] text-slate-600 text-6xl opacity-20 font-bold">
                                        {idx + 1}
                                    </span>
                                </div>
                                <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm'>
                                    <button className='px-6 py-2 bg-white text-black rounded-full font-bold cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105'>
                                        {t.projects.viewProject}
                                        <Link
                                            to={project.urlShowcase}
                                            target='_blank'
                                            rel='noopener noreferrer'>
                                            <span className='ml-2 underline'>
                                                ↗
                                            </span>
                                        </Link>
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div
                                className={`p-8 flex flex-col justify-center ${
                                    idx === 0 ? "lg:w-2/5" : "h-1/2"
                                } relative z-10 bg-slate-900`}>
                                <h3 className='text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300'>
                                    {project.title}
                                </h3>
                                <p className='text-slate-400 mb-4 text-sm'>
                                    {project.desc}
                                </p>
                                <p className='text-slate-300 mb-6 hidden md:block text-sm opacity-80'>
                                    {project.full}
                                </p>

                                <div className='flex flex-wrap gap-2 mt-auto'>
                                    {project.stack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-slate-800 text-xs font-['Fira_Code'] text-cyan-200 rounded-full border border-slate-700 hover:border-cyan-500 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
export default Projects;
