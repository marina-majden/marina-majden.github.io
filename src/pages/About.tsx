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
        <section id='about' className='py-24 bg-slate-900'>
            <div className='container mx-auto px-6'>
                <Reveal className='fade-in'>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>

                <div className='max-w-3xl mx-auto space-y-6 text-lg text-slate-400 leading-relaxed font-sans'>
                    <Reveal className='fade-in' delay={200}>
                        <p>{t.about.p1}</p>
                    </Reveal>
                    <Reveal className='fade-in' delay={400}>
                        <p>{t.about.p2}</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
