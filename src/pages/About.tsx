import React from "react";
import { motion } from "framer-motion";
// @ts-ignore - Assuming these are still .jsx files
import Reveal from "../components/Reveal.tsx";
// @ts-ignore
import SectionTitle from "../components/SectionTitle";
import { Translation } from "../types";
import Split from "@/components/Split.tsx";

interface AboutProps {
    t: Translation;
}

const AnimatedLine = ({ text, index }: { text: string; index: number }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden" }}
            variants={container}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            custom={index}
            className='flex flex-wrap justify-center gap-x-3 text-2xl md:text-4xl lg:text-5xl font-bold font-heading text-slate-300 mb-8'>
            {words.map((word, idx) => (
                <motion.span
                    variants={child}
                    key={idx}
                    className='hover:text-cyan-400 transition-colors duration-300 cursor-default'>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

const About: React.FC<AboutProps> = ({ t }) => {
    return (
        <section
            id='about'
            className='py-10 md:py-14 min-h-[60vh] flex flex-col justify-center'>
            <div className='container mx-auto relative px-6'>
                <Reveal className='animate-fadeIn'>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>
                <Reveal className='animate-fadeIn' delay={100}>
                    <Split />
                </Reveal>

                <div className='max-w-5xl mx-auto mt-16 flex flex-col items-center'>
                    <AnimatedLine text={t.about.p1} index={1} />
                    <AnimatedLine text={t.about.p2} index={2} />
                    <AnimatedLine text={t.about.p3} index={3} />
                </div>
            </div>
        </section>
    );
};
export default About;
