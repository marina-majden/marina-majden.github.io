import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
    Code2,
    ExternalLink,
    Github,
    Music,
    Search,
    Headphones,
    Zap,
    ArrowUp,
    ArrowLeft,
    Languages,
    Database,
    RefreshCw,
    LayoutTemplate,
    History,
    PlayCircle,
} from "lucide-react";

// --- Constants & Animations ---

const GLITCH_ANIMATION = {
    opacity: [1, 0.8, 1, 1, 0.1, 1, 0.9, 1, 0.1, 1, 0.95, 1],
    textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #06b6d4, 0 0 40px #06b6d4",
        "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #06b6d4, 0 0 20px #06b6d4",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #06b6d4, 0 0 40px #06b6d4",
    ],
};

const GLITCH_TRANSITION = {
    duration: 4,
    repeat: Infinity,
    repeatType: "mirror" as const,
    times: [0, 0.05, 0.1, 0.2, 0.22, 0.25, 0.3, 0.35, 0.36, 0.4, 0.8, 1],
};

const CARD_VARIANTS = {
    cyan: "border-cyan-500/30 bg-cyan-900/10 hover:border-cyan-500/50 hover:bg-cyan-900/20 shadow-[0_0_40px_-10px_rgba(6,182,212,0.1)]",
    pink: "border-pink-500/30 bg-pink-900/10 hover:border-pink-500/50 hover:bg-pink-900/20 shadow-[0_0_40px_-10px_rgba(236,72,153,0.1)]",
    violet: "border-violet-500/30 bg-violet-900/10 hover:border-violet-500/50 hover:bg-violet-900/20 shadow-[0_0_40px_-10px_rgba(139,92,246,0.1)]",
};

// --- Components ---

const NeonSign = () => (
    <div className='fixed top-28 -right-4 md:top-24 md:right-8 z-0 pointer-events-none select-none transform rotate-[8deg] hidden sm:block opacity-70 mix-blend-screen'>
        <motion.div
            animate={GLITCH_ANIMATION}
            transition={GLITCH_TRANSITION}
            className='px-4 py-2 md:px-6 md:py-3 border-[2px] border-cyan-500 rounded-xl bg-black/10 backdrop-blur-[2px]'>
            <span className='font-mono font-bold text-2xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400'>
                First Steps
            </span>
        </motion.div>
    </div>
);

const BackgroundGlows = () => (
    <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] will-change-transform'
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

const ColoredGlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "cyan" | "pink" | "violet";
}> = ({ children, className = "", variant = "cyan" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-500 ${CARD_VARIANTS[variant]} ${className}`}>
        <div
            className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none`}
        />
        <div className='relative z-10'>{children}</div>
    </motion.div>
);

const TechBadge: React.FC<{ label: string; icon?: React.ReactNode }> = ({
    label,
    icon,
}) => (
    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors cursor-default'>
        {icon && <span className='w-3.5 h-3.5'>{icon}</span>}
        {label}
    </span>
);

const SectionHeading: React.FC<{
    title: string;
    subtitle: string;
    align?: "left" | "center";
}> = ({ title, subtitle, align = "left" }) => (
    <div
        className={`mb-16 ${align === "center" ? "text-center" : ""} relative z-10`}>
        <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg'>
            {title}
        </h2>
        <div
            className={`h-1.5 w-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}
        />
        <p
            className={`text-lg text-slate-400 leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {subtitle}
        </p>
    </div>
);

const CodeSnippet: React.FC<{
    code: string;
    language: string;
    title: string;
    color?: string;
}> = ({ code, language, title, color = "cyan" }) => (
    <div className='rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl shadow-2xl my-6 font-mono text-sm relative group h-full flex flex-col'>
        <div className='flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5'>
            <span className={`text-slate-400 text-xs flex items-center gap-2`}>
                <Code2 size={14} className={`text-${color}-400`} /> {title}
            </span>
            <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50' />
            </div>
        </div>
        <div className='p-4 overflow-x-auto text-slate-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1'>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

// --- Main Page Component ---

const SongFinder: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"legacy" | "modern">("legacy");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [lang, setLang] = useState<"HR" | "EN">("HR");

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 300;
            if (shouldShow !== showScrollTop) setShowScrollTop(shouldShow);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showScrollTop]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleLanguage = () => {
        setLang((prev) => (prev === "HR" ? "EN" : "HR"));
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden'>
            <BackgroundGlows />
            <NeonSign />

            {/* --- FLOATING CONTROLS --- */}
            <div className='fixed top-6 right-6 z-50'>
                <button
                    onClick={toggleLanguage}
                    className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all shadow-lg group'>
                    <Languages
                        size={16}
                        className='text-cyan-400 group-hover:rotate-12 transition-transform'
                    />
                    <span className='font-mono text-sm font-bold tracking-wider'>
                        {lang}
                    </span>
                </button>
            </div>

            <div className='fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end'>
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            onClick={scrollToTop}
                            className='p-3 rounded-full bg-cyan-600/80 border border-cyan-500/50 backdrop-blur-md text-white hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/30 group'>
                            <ArrowUp
                                size={24}
                                className='group-hover:-translate-y-1 transition-transform'
                            />
                        </motion.button>
                    )}
                </AnimatePresence>

            <Link
                  to='/'
                     className='group flex items-center p-3 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-xl'>
                     <ArrowLeft
                         size={24}
                         className='group-hover:-translate-x-1 transition-transform'
                     />
                     <span className='max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] group-hover:pl-2 transition-all duration-300 ease-in-out font-medium'>
                         Povratak
                     </span>
                </Link>

            </div>

            {/* 1. HERO SECTION */}
            <header className='relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 px-6'>
                <div className='container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='space-y-8'>
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]'>
                            <History size={14} className='text-pink-400' />
                            <span>Project Archive: Early Days</span>
                        </div>

                        <div>
                            <h1 className='text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1]'>
                                Song
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 animate-gradient'>
                                    Finder
                                </span>
                            </h1>
                            <span className='block text-2xl md:text-3xl font-light text-slate-400 mt-2 tracking-wide font-mono'>
                                iTunes API Explorer
                            </span>
                        </div>

                        <p className='text-xl text-slate-300 max-w-lg leading-relaxed border-l-4 border-cyan-500 pl-6'>
                            Jedan od mojih prvih projekata. Aplikacija za
                            pretraživanje glazbe izgrađena na temeljima{" "}
                            <strong>Vanilla JavaScripta</strong> i manipulacije
                            DOM-om.
                        </p>

                        <div className='flex flex-wrap gap-3'>
                            <TechBadge label='HTML5' icon={<Code2 />} />
                            <TechBadge label='CSS3' icon={<Code2 />} />
                            <TechBadge label='Vanilla JS' icon={<Zap />} />
                            <TechBadge label='iTunes API' icon={<Database />} />
                        </div>

                        <div className='flex flex-wrap gap-5 pt-4'>
                            <a
                                href='https://marina-majden.github.io/song-finder/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:-translate-y-1'>
                                <PlayCircle size={20} />
                                <span>Live App</span>
                            </a>
                            <a
                                href='https://github.com/marina-majden/song-finder'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md'>
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='relative hidden lg:block'>
                        <ColoredGlassCard
                            variant='cyan'
                            className='p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-500'>
                            <div className='relative aspect-square rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center overflow-hidden group'>
                                {/* Animated Bars */}
                                <div className='flex items-end gap-1 h-32 mb-6'>
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: ["20%", "80%", "30%"],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration:
                                                    0.8 + Math.random() * 0.5,
                                                ease: "easeInOut",
                                            }}
                                            className='w-4 bg-gradient-to-t from-cyan-500 to-pink-500 rounded-t-full opacity-80'
                                        />
                                    ))}
                                </div>
                                <div className='text-center z-10 p-6'>
                                    <p className='text-slate-300 font-medium text-lg'>
                                        Pretraži. Slušaj. Otkrij.
                                    </p>
                                    <p className='text-xs text-slate-500 mt-2 font-mono'>
                                        iTunes API Integration
                                    </p>
                                </div>
                            </div>
                        </ColoredGlassCard>
                    </motion.div>
                </div>
            </header>

            {/* 2. FEATURES & LEARNING CURVE */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Temelji Web Razvoja'
                        subtitle="Iako tehnički jednostavan prema današnjim standardima, ovaj projekt je bio ključan korak u razumijevanju kako web zapravo funkcionira 'ispod haube' Reacta."
                        align='left'
                    />

                    <div className='grid md:grid-cols-3 gap-6 mb-20'>
                        {[
                            {
                                icon: (
                                    <Search
                                        size={32}
                                        className='text-cyan-400'
                                    />
                                ),
                                title: "Asinkroni Dohvat",
                                desc: "Učenje rada s `fetch` API-jem, Promise-ima i handlanje JSON odgovora s iTunes servera.",
                                variant: "cyan",
                            },
                            {
                                icon: (
                                    <Headphones
                                        size={32}
                                        className='text-pink-400'
                                    />
                                ),
                                title: "Audio Kontrola",
                                desc: "Implementacija logike za reprodukciju glazbe (play/pause) i upravljanje stanjem audio elemenata.",
                                variant: "pink",
                            },
                            {
                                icon: (
                                    <LayoutTemplate
                                        size={32}
                                        className='text-violet-400'
                                    />
                                ),
                                title: "Imperativni DOM",
                                desc: "Ručno kreiranje HTML elemenata (`document.createElement`) i manipulacija klasama bez frameworka.",
                                variant: "violet",
                            },
                        ].map((card, i) => (
                            // @ts-ignore
                            <ColoredGlassCard
                                key={i}
                                variant={card.variant}
                                className='p-8 group hover:-translate-y-2'>
                                <div className='mb-6 bg-slate-950/30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300'>
                                    {card.icon}
                                </div>
                                <h3 className='text-xl font-bold text-white mb-3'>
                                    {card.title}
                                </h3>
                                <p className='text-slate-400 leading-relaxed'>
                                    {card.desc}
                                </p>
                            </ColoredGlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CODE EVOLUTION (THEN vs NOW) */}
            <section className='py-24 relative z-10 bg-slate-900/30 border-y border-white/5'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Evolucija Koda: Then vs. Now'
                        subtitle='Najbolji način za vidjeti napredak je usporedba koda. Lijevo je moj originalni pristup (Vanilla JS), desno je kako bih to arhitektirala danas.'
                        align='center'
                    />

                    <div className='flex justify-center gap-4 mb-12'>
                        <button
                            onClick={() => setActiveTab("legacy")}
                            className={`px-8 py-3 rounded-full font-bold transition-all border ${activeTab === "legacy" ? "bg-cyan-600 text-white border-cyan-500" : "bg-white/5 text-slate-400 border-white/10"}`}>
                            Original (Vanilla JS)
                        </button>
                        <button
                            onClick={() => setActiveTab("modern")}
                            className={`px-8 py-3 rounded-full font-bold transition-all border ${activeTab === "modern" ? "bg-pink-600 text-white border-pink-500" : "bg-white/5 text-slate-400 border-white/10"}`}>
                            Modern (React 19)
                        </button>
                    </div>

                    <AnimatePresence mode='wait'>
                        {activeTab === "legacy" ? (
                            <motion.div
                                key='legacy'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className='grid lg:grid-cols-2 gap-12'>
                                <div className='space-y-6 flex flex-col justify-center'>
                                    <h3 className='text-2xl font-bold text-cyan-400 flex items-center gap-2'>
                                        <History /> Imperativni Pristup
                                    </h3>
                                    <p className='text-slate-300 leading-relaxed'>
                                        U ovom projektu, morala sam ručno
                                        govoriti pregledniku *kako* da nacrta
                                        svaki element. Svaki `div`, svaka slika
                                        i svaki tekst su kreirani liniju po
                                        liniju koda.
                                    </p>
                                    <ul className='space-y-3 text-slate-400'>
                                        <li className='flex gap-2'>
                                            ❌ Teško za održavanje kod većih
                                            aplikacija.
                                        </li>
                                        <li className='flex gap-2'>
                                            ❌ Miješanje logike i UI-a u istoj
                                            funkciji.
                                        </li>
                                        <li className='flex gap-2'>
                                            ✅ Odlično za razumijevanje osnova
                                            browser API-ja.
                                        </li>
                                    </ul>
                                </div>
                                <CodeSnippet
                                    title='script.js (Original)'
                                    language='javascript'
                                    color='cyan'
                                    code={`
// Ručna manipulacija DOM-om
function updateDisplay(result){
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    // ...
    let article = document.createElement('article');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let audio = document.createElement('audio');
    
    img.src = result.artworkUrl100;
    p.textContent = result.artistName;
    
    article.appendChild(img);
    article.appendChild(p);
    main.appendChild(article);
}`}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key='modern'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className='grid lg:grid-cols-2 gap-12'>
                                <div className='space-y-6 flex flex-col justify-center'>
                                    <h3 className='text-2xl font-bold text-pink-400 flex items-center gap-2'>
                                        <Sparkles /> Deklarativni Pristup
                                    </h3>
                                    <p className='text-slate-300 leading-relaxed'>
                                        Danas bih koristila{" "}
                                        <strong>React</strong> za UI,{" "}
                                        <strong>TypeScript</strong> za sigurnost
                                        tipova (jer API podaci mogu biti
                                        nepredvidivi) i{" "}
                                        <strong>React Query</strong> za
                                        upravljanje stanjem servera.
                                    </p>
                                    <ul className='space-y-3 text-slate-400'>
                                        <li className='flex gap-2'>
                                            ✅ Komponentna arhitektura (Reusable
                                            Cards).
                                        </li>
                                        <li className='flex gap-2'>
                                            ✅ Type Safety (Interface za iTunes
                                            Response).
                                        </li>
                                        <li className='flex gap-2'>
                                            ✅ Automatsko upravljanje
                                            loading/error stanjima.
                                        </li>
                                    </ul>
                                </div>
                                <CodeSnippet
                                    title='SongCard.tsx (Modern Concept)'
                                    language='typescript'
                                    color='pink'
                                    code={`
// Deklarativni UI s TypeScriptom
interface SongProps {
  artworkUrl100: string;
  artistName: string;
  previewUrl: string;
}

const SongCard = ({ artworkUrl100, artistName, previewUrl }: SongProps) => (
  <article className="p-4 bg-slate-800 rounded-xl hover:scale-105 transition">
    <img src={artworkUrl100} alt={artistName} className="rounded-lg mb-2" />
    <p className="font-bold text-white">{artistName}</p>
    <audio controls src={previewUrl} className="w-full mt-2" />
  </article>
);

// Korištenje u listi
{data?.results.map(song => <SongCard key={song.trackId} {...song} />)}
`}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. IMPROVEMENT PLAN */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <ColoredGlassCard variant='violet' className='p-12'>
                        <div className='max-w-4xl mx-auto text-center mb-12'>
                            <h3 className='text-3xl font-bold text-white mb-4'>
                                Kako bih poboljšala aplikaciju danas?
                            </h3>
                            <p className='text-slate-300'>
                                Gledajući unatrag, vidim ogroman prostor za
                                napredak. Evo mog plana refaktoriranja:
                            </p>
                        </div>

                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {[
                                {
                                    title: "React & Next.js",
                                    desc: "Migracija na moderni framework za bolji routing i SSR.",
                                },
                                {
                                    title: "TanStack Query",
                                    desc: "Zamjena `fetch` poziva s robusnim caching rješenjem.",
                                },
                                {
                                    title: "Zustand / Context",
                                    desc: "Globalno upravljanje stanjem audio playera (da svira samo jedna pjesma odjednom).",
                                },
                                {
                                    title: "Tailwind CSS",
                                    desc: "Zamjena custom CSS-a utility klasama za brži razvoj.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className='p-6 bg-slate-950/50 rounded-xl border border-white/5 hover:border-violet-500/50 transition-colors text-left'>
                                    <div className='text-violet-400 mb-3'>
                                        <RefreshCw size={24} />
                                    </div>
                                    <h4 className='font-bold text-white mb-2'>
                                        {item.title}
                                    </h4>
                                    <p className='text-sm text-slate-400'>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ColoredGlassCard>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className='py-24 relative z-10 text-center border-t border-white/5 bg-slate-950'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 pointer-events-none' />
                <div className='container mx-auto px-6 relative z-10'>
                    <h2 className='text-4xl font-bold text-white mb-6'>
                        Pogledaj izvorni kod
                    </h2>
                    <p className='text-xl text-slate-400 mb-10 max-w-2xl mx-auto'>
                        Svaki senior developer je nekad bio junior. Ovo je dokaz
                        mojih početaka i volje za učenjem.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <a
                            href='https://github.com/marina-majden/song-finder'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1'>
                            <Github size={20} />
                            GitHub Repozitorij
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SongFinder;
