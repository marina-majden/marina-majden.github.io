import React from "react";
// @ts-ignore - Assuming these are still .jsx files
import Reveal from "../components/Reveal.tsx";
// @ts-ignore
import SectionTitle from "../components/SectionTitle";
import { Translation } from "../types";

interface AboutProps {
    t: Translation;
}

const About: React.FC<AboutProps> = ({ t }) => {
    return (
        <section id='about' className='py-10 md:py-14 lg:py-20 bg-slate-900'>
            <div className='container mx-auto px-6 flex flex-col items-center space-y-12'>
                <Reveal className='animate-fadeIn'>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>

                <div className='max-w-3xl mx-auto space-y-6 text-lg text-slate-200 leading-relaxed font-sans'>
                    <Reveal className='animate-fadeIn' delay={200}>
                        <p className="text-offwhite font-heading">{t.about.p1}</p>
                    </Reveal>
                    <Reveal className='animate-fadeIn' delay={400}>
                        <p className="text-offwhite font-sans">{t.about.p2}</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
