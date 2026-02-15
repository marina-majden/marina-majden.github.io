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
            className='py-10 min-h-[60vh] flex flex-col justify-center'>
            <div className='container mx-auto relative px-6'>
                <Reveal className='animate-fadeIn'>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>
                <Reveal className='animate-fadeIn' delay={100}>
                    <Split />
                </Reveal>
                <div className='absolute w-screen top-0 right-0 inset-0 flex flex-col justify-between items-center'>
                    <AnimatedLine text={t.about.p1} index={1} />
                    <AnimatedLine text={t.about.p2} index={2} />
                    <AnimatedLine text={t.about.p3} index={3} />
                </div>
            </div>

            <div id='svgwrapper' className='load-logo'>
                <svg
                    className='logo-path'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 492.85 262.79'>
                    <defs>
                        <clipPath id='clip-underline'>
                            <path
                                d='M586,588.22c31.44-7,78.19-14.82,97.09-13.81a7,7,0,0,0,.34,3.53c.94,2.22,7.6.32,8.94,0,5.14-1.25,8.34-4.76,8.34-6,0-9.76-14.67-12.42-21.65-12.42-17.25,0-44.55,4.81-69,11.1l-3.4.88c-22,5.86-41.2,12.83-47.65,18.36-3.66,3.14-4.65,7.56-2.13,6.39,3.56-1.67,12.28-4.1,23.66-6.75'
                                transform='translate(-345.54 -373.68)'
                            />
                            <path
                                d='M685.47,566.39c.08-.08.1-.06.09,0Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-i-2'>
                            <path
                                d='M637.23,485.61c.45,6.67,3.58,10.87,6.92,10.87,5.33,0,13.84-16.37,13.84-26s-3.72-15.17-10.78-15.17S632,468.27,632,477.19C632,482.55,634.93,485.15,637.23,485.61Zm7.59-1.77c-2.38,0-.07-10,2.24-15.69a4.18,4.18,0,0,1,2.55-1.08C654.67,467.07,647.88,483.84,644.82,483.84Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-aa-2'>
                            <path
                                d='M831,495.15c0,24.09-47.78,51.11-74.92,51.11s-21-30-21-32.21c0-1.39-1.51-3.38-2.86-4.31-5.75-2.26-3.49,18.21-3.49,18.21,1.22,13.28,7.12,39.33,35.23,39.33,48.44,0,74.39-41.19,74.39-65.47C838.32,493.38,831,490.34,831,495.15Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-aa-1'>
                            <path
                                d='M735.05,514.05c0-1.39-1.51-3.38-2.86-4.31a3.22,3.22,0,0,0-3.38.24h0a56.73,56.73,0,0,1-2.4,7.47l.07,0c-4.12,8.3-10.4,20.16-12.64,20.16-3.4,0,2-19.79,8.41-29,0-.15,3.08-8.43-3.52-8.45a58.26,58.26,0,0,0-8.67,14.53L704.75,532c-1.46,9-.08,16.12,6.54,16.12,5.14,0,13.39-12.07,17.41-20.17C728.7,528,734.91,516.41,735.05,514.05Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-n-2'>
                            <path
                                d='M725.33,496c-4.69,0-10.82,8.56-15.27,18.75-2.47,4.1-14,23.44-18.26,23.44s-.67-29-11-29c-8.58,0-17.38,15.86-22.66,26.24a.7.7,0,0,1-.12.34l-.17.22v0h0c-.13.19-.28.37-.42.56l-.07.09c-2.37,3.08-5.69,5.53-7.61,8.92a45.3,45.3,0,0,0-.75,5.66c0,4.52,3.33,7.05,5.19,5.19s21.56-39,26.75-39-3.19,33,6.53,33c5.83,0,12.67-9.73,17.34-18.38,2.49-3.49,4.74-6.49,6.66-9,0,0,.81-1.06,1.92-2.43h0s6.15-8.62,8.75-11.76h0c3.81-5.54,6.14-4.91,6.14-4.91,1.59,0,1.34,2.9.59,6a1.25,1.25,0,0,0,1.28.71,9.13,9.13,0,0,0,1.25-.41.61.61,0,0,0,.18-.09l.67-.45C733.7,503.32,733.35,496,725.33,496Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-n-1'>
                            <path
                                d='M655.73,549.88c.17-4.35,2.06-13.92,2.06-13.92,2.29-9.68,4.73-22.8,4.73-25.27s-1.67-3.09-3.2-1.56c-3.29,3.29-10.38,37.53-10.38,42s3.33,7.05,5.19,5.19A13.28,13.28,0,0,0,655.73,549.88Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-i-1'>
                            <path
                                d='M638.3,516.71c-4.66,0-19,30.87-29.23,42.32h0l-.08.07c-.36.41-.72.79-1.07,1.15l-8.17,6.92a14.94,14.94,0,0,0,6.93,4.29l3.39-.88c4.81-5.22,18.3-27.18,24.71-39-.91,4.23-1.44,8.65-.8,11.08,1.92,7.22,7.77,5.32,7.77,2.93,0-5.85,1.26-17.75,1.26-23.43C643,519,641.4,516.71,638.3,516.71Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-r-2'>
                            <path
                                d='M599.77,505.44c4,2.6,7,5.53,7,9.1,0,9.94-11.59,35.71-11.59,42.81,0,6.34,5.94,12.8,11.38,14.11,0,0,2.35.47,3.48-.88s-2.24-10.33-2.24-10.33c3.6-11.23,9.11-40.74,3.35-50.63a40.85,40.85,0,0,0-11.86-12.36c-1.48-6.71-5.51-10.89-8.72-10.89-5.33,0-7.63,4.61-7.63,6.39,0,3.58,6.37,6.63,12.53,10.11'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-r-1'>
                            <path
                                d='M599.4,497.26c-1.48-6.71-5.51-10.89-8.72-10.89a2.33,2.33,0,0,0-2.24,2.94c.4,2.65,5.22,7.9,6.81,12.43l.33,1.13c-.05,11.23-15.07,42.77-19.28,42.77-2.3,0-1.06-10.29-1.06-13.49,0-1.84-2.35-3.9-4.34-4.57,0,0-2.42,3.64-1.33,14.49,1.42,6.5,4.16,14,8.86,14,5.72,0,19.92-33.3,21.41-50.67A43.43,43.43,0,0,0,599.4,497.26Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-a-2'>
                            <path
                                d='M570.91,527.57a9.84,9.84,0,0,0-3.78.54,111.35,111.35,0,0,1-4,14.29h0c-3.66,7.81-8.25,16-9.86,16-.74,0-.48-2.79.39-6.91a8.65,8.65,0,0,1-6.84,0c-1.22,10-.06,17.94,4.85,17.94,5.68,0,13.34-17.41,17.94-27.35l5.66-9.91C575.25,530.3,572.9,528.23,570.91,527.57Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-a-1'>
                            <path
                                d='M560.33,560.64c.08-.95-.56-5.2-6.49-2.51a1.17,1.17,0,0,1-.59.27c-2.84,0,9-41.17,13.84-41.17,1.68,0,1.35,4.36.34,9.47,0,1.37.22,2.71,1,3,1,.36,1.85-.92,2.45-2.17,1-8.44.24-16.34-3.82-16.34-14.55,0-28.74,58.2-15.44,58.2C554.29,569.4,557.35,565.65,560.33,560.64Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-M-3'>
                            <path
                                d='M585.14,583.66c-2-.16-4.6,5.85-4.6,5.85C574.54,600,563.7,615,546.33,615c-31.94,0-26.82-88.51,24.46-142.59l-.12,0,2.76-2.84C548.12,480,535.63,497,535.63,497l.76-.53-.71.76c-21.52,35.76-48,127,6.64,126,19.8-.39,36.13-21.6,43.67-35C586,588.27,587.14,583.81,585.14,583.66Z'
                                transform='translate(-345.54 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-M-2'>
                            <path
                                d='M569,464C540.3,464,458.6,580.53,444.11,600.19c-2-9.87-1.67-22.06.56-35.58l4.61-20.89c2.59-9.62,5.88-19.6,9.69-29.65a1.15,1.15,0,0,0-.06-.17,19.34,19.34,0,0,0-1.28-2,11.43,11.43,0,0,0-3.27-2.43c-2.46-1.21-4.4-.81-6.94.13-.87.32-1.71.68-2.55,1.06-6,17.15-10.3,34.37-12.13,50.65l-1,17h0c0,28.36,10.42,35.19,14,31.64,3.71-3.7,59.48-84.13,90.25-113.2,0,0,26.33-18.95,32.85-22.26h0c1.51-1.65,3.06-3.29,4.65-4.88C576.58,466.48,573.21,464,569,464Z'
                                transform='translate(-345.46 -373.68)'
                            />
                        </clipPath>
                        <clipPath id='clip-M-1'>
                            <path
                                d='M556.62,373.68c-37,0-93.43,75.7-115.53,148.54a11.94,11.94,0,0,0,3.3,4c2.59,1.77,5.42,1,8.22.37a2.1,2.1,0,0,1,.48-.06,9.7,9.7,0,0,0,1.77-1.07l0,0c22.41-65.8,70.66-139.77,99.41-139.77,19.3,0-42.52,89.67-105,158.07l-16.54,17.57c-29.92,30.77-58.33,54.29-76.21,58.11,2.76-7.2,10.4-18.21,10.4-20.72,0-6.92-21.47,12-21.47,19.17s1.51,18.62,11.62,18.62c12.63,0,41.89-24.29,74.66-58.18h0l12.93-13.69c58.11-62.8,121.62-148.85,121.62-181.26C566.29,379.89,563.54,373.68,556.62,373.68Z'
                                transform='translate(-345.46 -373.68)'
                            />
                        </clipPath>
                    </defs>
                    <g clip-path='url(#clip-underline)'>
                        <path
                            className='logo-path underline'
                            d='M555.51,597.1s.86-6.1,39-15.67S677.41,563,690.11,563s23.42,6.27,22.92,9.57-40.52,4.87-48.15,4.12'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-i-2)'>
                        <path
                            className='logo-path i-2'
                            d='M620.35,474.57s9.73,10.39,15,4.78,4.9-18.63,12.26-18.3,8.52,10.72,5.72,17.81-7.43,12.53-10.56,10.88-2.64-16.82,0-21.93'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-aa-2)'>
                        <path
                            className='logo-path aa-2'
                            d='M731.31,511s-1,20.11,3.74,29.51,16.74,18.23,30.1,16.46,34.63-7.71,48.15-20.58,22.92-24.57,21.6-35.12-5.27-16.17-5.27-16.17'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-aa-1)'>
                        <path
                            className='logo-path aa-1'
                            d='M717.46,507.31s-7.39,14-8.23,21.85.31,13.72,2.11,14.77,7.81-5.38,10.45-10.13,11.43-20.79,13.26-26.49'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-n-2)'>
                        <path
                            className='logo-path n-2'
                            d='M652.44,552.07s7.39-12.57,10.08-16.58,7.12-13.09,10.29-16.46,11.19-10.35,12.77,3.16.94,20.14,5.34,21.85,11-11.82,13.56-15.83,10.76-17.42,13.61-20.9,6.12-8,8.55-7.92,5.91,1.38,4.22,12'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-n-1)'>
                        <path
                            className='logo-path n-1'
                            d='M660.67,507.31s-9.29,43.27-8.65,51.4'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-i-1)'>
                        <path
                            className='logo-path i-1'
                            d='M602.62,562.41s1.48,5.06,4.86,4.85,6-6.23,8.33-10.24,9.61-17.2,11.51-20.58,11.61-17.73,11.61-17.73,1.37,3.48,0,11.61-.32,16,1.79,19'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-r-2)'>
                        <path
                            className='logo-path r-2'
                            d='M591.64,488.63s-6.75.95-5.17,3.8,14.88,9.07,17.42,12.24,7.6,9.61,6.44,18.37-4.75,19.42-6,24.48-3.06,11.3-1.69,14.89,8.87,10.76,8.87,10.76'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-r-1)'>
                        <path
                            className='logo-path r-1'
                            d='M569.29,528.77s3.33,1.54,3.42,6.48-.09,10.63,1.7,13.23,3.75,5.41,8.09-2.85,10.64-21.45,12.17-27.58,4.69-14.48,2.64-20.44-9.87-12.17-9.87-12.17'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-a-2)'>
                        <path
                            className='logo-path a-2'
                            d='M556.11,560.71s6-9.42,8.06-14,7.7-15.91,8.78-20.66'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-a-1)'>
                        <path
                            className='logo-path a-1'
                            d='M568.56,530.41s2.23-8.42,1.37-12.09-2.59-5.47-6.34-2.3-8.13,13.75-9.35,18.79-4.32,15.9-4.68,21.08.14,9,1.65,10,5-3.89,6.12-5.62a40.82,40.82,0,0,0,2.46-4.6'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-M-3)'>
                        <path
                            className='logo-path M-3'
                            d='M573.43,469.59s-23.77,18.89-27.36,25.26-13.75,24.91-17.14,33.88S519.76,558,519.17,566s-1.2,24.91,1,32.68,10,19.13,18.93,19.73S562,615.62,570,606.65s11.55-13.15,16.34-25.31'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-M-2)'>
                        <path
                            className='logo-path M-2'
                            d='M448.77,516.76s-8.3,33.91-9.71,44.68-3.18,40.26,4.85,45.74c0,0,24.46-33.91,33.29-45.21s29.67-38.15,34.61-44,21.73-25.26,28.79-31.26,23.84-19.6,35.32-20.49'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                    <g clip-path='url(#clip-M-1)'>
                        <path
                            className='logo-path M-1'
                            d='M367.6,596.83s-18.23,18.34-18.11,22.81,2.23,9.77,5.17,10.47,31.53-14.2,61.73-44.21A1024.83,1024.83,0,0,0,490.72,503c16.29-20.47,43.91-56.24,53.65-73.73s20.67-39.55,17.09-46.5-11.13-3.58-14.7-2-33,20.47-46.51,39.75-36.76,64-41.33,74.32-9.74,27.62-9.74,27.62'
                            transform='translate(-345.54 -373.68)'
                        />
                    </g>
                </svg>
            </div>
        </section>
    );
};
export default About;
