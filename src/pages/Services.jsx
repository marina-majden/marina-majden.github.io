import React from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { img } from "motion/react-client";

// FIX: make third box bigger to fill screen on desktop
// todo: replace placeholder text with real deal

const Services = ({ t }) => (
    <section
        id='services'
        className='py-24 bg-linear-to-b- from-slate-900 to-slate-950'>
        <div className='container mx-auto px-6'>
            <Reveal>
                <SectionTitle>{t.services.title}</SectionTitle>
            </Reveal>
            <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-1 text-[10px] text-dynamic-cyan tracking-[0.3em] uppercase mb-4'>
                <span className='loader-pulse'></span>
                Interdisciplinarni studio
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {t.services.list.map((service, idx) => (
                    <Reveal
                        key={idx}
                        delay={idx * 150}
                        className='glass rounded-xl overflow-hidden group cursor-pointer'>
                        <div className='h-48 overflow-hidden relative'>
                            <img
                                src={service.imgUrl}
                                className={service.imgClass}
                                alt='Tech Art'
                            />
                            <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors'></div>
                        </div>
                        <div className='p-6'>
                            <div className='text-xs text-cyan-400 mb-2 uppercase tracking-wide'>
                                {idx + 1}
                            </div>
                            <h3 className='text-lg font-serif text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                                {service.title}
                            </h3>
                            <p className='text-sm text-gray-400 font-light'>
                                {service.desc}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
export default Services;
