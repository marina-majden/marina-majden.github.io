import React, { useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    animate,
    type AnimationPlaybackControls,
} from "framer-motion";
import Reveal from "../components/Reveal.tsx";
import SectionTitle from "../components/SectionTitle";
import { Translation } from "../types";
import Split from "@/components/Split.tsx";
interface AboutProps {
    t: Translation;
}

const AnimatedLine = ({ text, index }: { text: string; index: number }) => {
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);
    const isEven = index % 2 === 0;

    // Configuration based on index
    const getStyle = () => {
        switch (index) {
            case 1:
                return {
                    rotate: 12,
                    color: "text-cyan-400",
                    speed: 30,
                    y: 0,
                };
            case 2:
                return {
                    rotate: -2,
                    color: "text-pink-400",
                    speed: 25,
                    y: -20, // Pull it up a bit
                };
            case 3:
                return {
                    rotate: 0,
                    color: "text-slate-200",
                    speed: 35,
                    y: -10,
                };
            default:
                return { rotate: 0, color: "text-slate-300", speed: 20, y: 0 };
        }
    };

    const { rotate, color, speed, y } = getStyle();
    const from = isEven ? "-50%" : "0%";
    const to = isEven ? "0%" : "-50%";
    const x = useMotionValue(from);
    const content = Array(10).fill(text).join(" \u00A0 • \u00A0 ");

    useEffect(() => {
        controlsRef.current = animate(x, to, {
            ease: "linear",
            duration: speed,
            repeat: Infinity,
            repeatType: "loop",
        });

        return () => controlsRef.current?.stop();
    }, [x, to, speed]);

    return (
        <div
            className={`w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-4 ${color} mix-blend-screen`}
            style={{
                transform: `translateX(-50%) rotate(${rotate}deg) translateY(${y}px)`,
            }}
            onMouseEnter={() => controlsRef.current?.pause()}
            onMouseLeave={() => controlsRef.current?.play()}>
            <motion.div
                className='flex whitespace-nowrap font-heading font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest'
                style={{ x }}>
                <span className='mr-8'>{content}</span>
                <span className='mr-8'>{content}</span>
            </motion.div>
        </div>
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
                <div className='absolute inset-0 flex flex-col justify-between items-center'>
                    <AnimatedLine text={t.about.p1} index={1} />
                    <AnimatedLine text={t.about.p2} index={2} />
                    <AnimatedLine text={t.about.p3} index={3} />
                </div>
            </div>
        </section>
    );
};
export default About;
