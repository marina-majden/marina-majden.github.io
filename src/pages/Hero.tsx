import React, { useState, useEffect } from "react";
import { Terminal, ArrowRight } from "react-feather";

interface HeroContent {
    line1: string;
    line2: string;
    line3: string;
    cta: string;
}

interface NavContent {
    projects: string;
}

interface HeroProps {
    t: {
        hero: HeroContent;
        nav: NavContent;
    };
    scrollToSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ t, scrollToSection }) => {
    const [heroLoaded, setHeroLoaded] = useState<boolean>(false);

    useEffect(() => {
        setHeroLoaded(true);
    }, []);

    return (
        <section
            id='home'
            className='w-screen h-[50vh] md:h-screen mx-auto relative overflow-hidden pt-8 mt-8 mb-2 md:mt-10 lg:mt-16'>
            <div className='container md:h-[80vh] flex flex-col justify-around items-center mx-auto px-6 text-center relative z-10'>
                <div
                    className={`inline-block my-4 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur-sm transition-all duration-800 ${
                        heroLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                    }`}>
                    <span className='font-mono text-xs text-cyan-400 hover:text-cyan-500 transition-colors flex items-center gap-2 cursor-crosshair'>
                        <Terminal size={12} className='animate-pulse' /> v3.0.0
                        // Portfolio initialized
                    </span>
                </div>

                <h1 className='w-4/5 mt-4 mb-8'>
                    <span
                        className={`block text-6xl md:text-7xl lg:text-9xl text-center leading-normal bg-clip-text text-transparent font-display bg-linear-to-tr from-lake-500 via-indigo-600 to-candy-500 font-bold z-50 animate-gradient-x transition-all duration-300 delay-300 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}>
                        {t.hero.line1}
                    </span>
                    {/*     <span
                        className={`block text-6xl md:text-7xl lg:text-9xl mb-4 leading-none text-right font-link text-lake-600 text-shadow-lake-900 text-shadow-xs font-bold  z-40  transition-all duration-500 delay-400 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        }`}>
                        {t.hero.line2}
                    </span> */}

                    <span
                        className={`block text-2xl text-slate-200 font-link mt-4 font-semibold uppercase z-30 tracking-[0.2em] leading-none transition-all duration-700 delay-500 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-20"
                        }`}>
                        {t.hero.line3}
                    </span>
                </h1>

                <div
                    className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
                        heroLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className='button bg-lake-500 hover:bg-lake-600 backdrop-blur-md text-black text-shadow-black transition-all hover:scale-105 shadow-[0_0_10px_rgba(34,211,238,0.4)] active:scale-95'>
                        {t.hero.cta}
                    </button>
                    <button
                        onClick={() => scrollToSection("projects")}
                        className='button text-lake-500 rounded-full hover:bg-lake-400 hover:text-slate-900 hover:border-slate-500 transition-all duration-300 flex items-center gap-2 group'>
                        {t.nav.projects}{" "}
                        <ArrowRight
                            size={18}
                            className='group-hover:translate-x-1 transition-transform'
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
