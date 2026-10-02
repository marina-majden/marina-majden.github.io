import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Layers } from "lucide-react";
import { CloudPlaceholder, GoldParticle } from "./Background.tsx";
import MegaProjectCard from "./MegaProjectCard.tsx";
import PlaygroundSection from "./PlaygroundSection.tsx";
import TasteTestSection from "./TasteTestSection.tsx";
import WorkflowSection from "./WorkflowSection.tsx";

const Lab = () => {
    const [currentTheme, setCurrentTheme] = useState("mediteran");
    const [currentFont, setCurrentFont] = useState("sans");
    const [currentRadius, setCurrentRadius] = useState("smooth");
    const [currentHeroLayout, setCurrentHeroLayout] = useState("creative");
    const [items, setItems] = useState(["hero", "grid", "stats"]);

    const [activeAccordion, setActiveAccordion] = useState<string | null>(
        "theme",
    );

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 120 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const moveXLeft = useTransform(smoothX, [-1, 1], [30, -30]);
    const moveYLeft = useTransform(smoothY, [-1, 1], [30, -30]);
    const moveXRight = useTransform(smoothX, [-1, 1], [-30, 30]);
    const moveYRight = useTransform(smoothY, [-1, 1], [-30, 30]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    const scrollToProjects = () => {
        document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <div className='bg-slate-900 min-h-screen'>
            <Link
                to='/'
                className='absolute top-8 left-8 flex items-center gap-2 text-offblack hover:text-deepgray transition-all hover:translate-x-[-5px] font-mono z-50'>
                <ArrowRight className='rotate-180' size={20} /> Povratak na
                portfolio
            </Link>

            {/* Header & Clouds */}
            <h1 className='text-5xl md:text-7xl font-bold text-white text-center pt-24 mb-12 flex items-center justify-center gap-4'>
                <FlaskConical
                    className='text-dynamic-cyan animate-neon-glow'
                    size={68}
                />
                <span className='text-gradient'>Laboratorij</span>
            </h1>
            <h2 className='text-center text-slate-400 max-w-4xl mx-auto mb-20 px-6 text-lg leading-relaxed'>
                Oslobodite maštu i poigrajte se s dizajnom u mom malom
                laboratoriju...
            </h2>

            <CloudPlaceholder className='top-1/4 left-1/4' delay={0} />
            <CloudPlaceholder className='top-1/3 right-1/4' delay={2} />
            <CloudPlaceholder className='bottom-1/4 left-1/3' delay={4} />
            <CloudPlaceholder className='bottom-1/3 right-1/3' delay={6} />
            {Array.from({ length: 30 }).map((_, index) => (
                <GoldParticle key={index} delay={Math.random() * 5} />
            ))}

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
