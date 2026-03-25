import React, { useEffect, useRef, lazy, Suspense } from "react";
import {
    motion,
    useMotionValue,
    animate,
    type AnimationPlaybackControls,
} from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { Translation } from "../types";
import Reveal from "@/components/Reveal";
import { Spinner } from "@/components/SpinnerLoader.tsx";

const CardScanner = lazy(() => import("@/components/CardScanner.tsx"));
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
                    rotate: 3,
                    color: "text-cyan-400",
                    speed: 30,
                    y: 10,
                };
            case 2:
                return {
                    rotate: -2,
                    color: "text-pink-400",
                    speed: 25,
                    y: -20,
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
    const from = isEven ? "-50%" : "50%";
    const to = isEven ? "50%" : "-50%";
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
            className={`w-screen z-5 absolute left-1/2 top-1/2 overflow-hidden py-4 ${color} mix-blend-screen`}
            style={{
                transform: `translateX(-50%) rotate(${rotate}deg) translateY(${y}px)`,
            }}
            onMouseEnter={() => controlsRef.current?.pause()}
            onMouseLeave={() => controlsRef.current?.play()}>
            <motion.div
                className='whitespace-nowrap font-heading font-bold text-4xl md:text-6xl tracking-widest'
                style={{ x }}>
                <span className=''>{content}</span>
                <span className=''>{content}</span>
            </motion.div>
        </div>
    );
};

const About: React.FC<AboutProps> = ({ t }) => {
    return (
        <section id='about' className='py-10 md:py-14'>
            <div className='w-screen h-screen flex flex-col justify-evenly items-center'>
                <Reveal>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>
                <Suspense fallback={<Spinner />}>
                    <CardScanner />
                </Suspense>
            </div>
        </section>
    );
};
export default About;
