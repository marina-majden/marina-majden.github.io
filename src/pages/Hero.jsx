import { useState, useEffect } from "react";
import { Terminal, ArrowRight } from "react-feather";

const Hero = ({ t, scrollToSection }) => {
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => setHeroLoaded(true), []);

    return (
        <section
            id='home'
            className='w-screen min-h-screen mx-auto flex items-center justify-between relative overflow-hidden pt-16'>
            <div className='container mx-auto px-6 text-center relative z-10'>
                <div
                    className={`inline-block my-4 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur-sm transition-all duration-700 ${
                        heroLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                    }`}>
                    <span className='self-start font-mono text-xs text-cyan-400 flex items-center gap-2'>
                        <Terminal size={12} /> v3.0.0 // Portfolio initialized
                    </span>
                </div>

                <h1 className='text-5xl my-12 tracking-tight leading-tight'>
                    <span
                        className={`block text-8xl bg-clip-text text-transparent  bg-linear-to-tr from-lake-500 via-indigo-500  to-candy-500 leading-normal font-bold z-50 animate-gradient-x transition-all duration-500 delay-300 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        }`}>
                        {t.hero.line2}
                    </span>
                    <span
                        className={`block text-2xl text-slate-200 font-link font-bold uppercase tracking-[0.24em] transition-all duration-700 delay-500 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-20"
                        }`}>
                        {t.hero.line3}
                    </span>
                    <span
                        className={`block text-3xl bg-clip-text font-bold text-right mr-1/3 text-black text-shadow-indigo-600 text-shadow-xs drop-shadow-fuchsia-600 drop-shadow-xs z-50 transition-all duration-700 delay-700 ${
                            heroLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}>
                        {t.hero.line1}
                    </span>
                </h1>
                <p
                    className={`text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-900 ${
                        heroLoaded ? "opacity-100" : "opacity-0"
                    }`}>
                    {t.hero.subtitle}
                </p>

                <div
                    className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
                        heroLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className='px-8 py-4 bg-cyan-500 text-slate-950  text-md font-semibold font-link uppercase text-shadow-xs text-shadow-slate-300 tracking-wider rounded-full hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_10px_rgba(34,211,238,0.4)] active:scale-95'>
                        {t.hero.cta}
                    </button>
                    <button
                        onClick={() => scrollToSection("projects")}
                        className='px-8 py-4 text-md text-cyan-500 font-semibold font-link uppercase tracking-wider backdrop-blur-md border border-cyan-600 rounded-full hover:bg-cyan-600 hover:text-slate-900 hover:border-slate-500 transition-all flex items-center gap-2 group'>
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
