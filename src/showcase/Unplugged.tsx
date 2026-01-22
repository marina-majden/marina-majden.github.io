import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Code2,
    ExternalLink,
    Github,
    Leaf,
    Users,
    Wrench,
    CalendarHeart,
    HandHeart,
    ArrowUp,
    ArrowLeft,
    Languages,
    Recycle,
    Globe,
    PhoneOff, // Zamijenjeno umjesto SmartphoneOff
    Route,
    Cpu,
    Layers,
    Zap,
    Box,
    Share2,
} from "lucide-react";

// --- Constants & Animations ---

const GLITCH_ANIMATION = {
    opacity: [1, 0.8, 1, 1, 0.1, 1, 0.9, 1, 0.1, 1, 0.95, 1],
    textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #10b981, 0 0 40px #10b981",
        "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #10b981, 0 0 20px #10b981",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #10b981, 0 0 40px #10b981",
    ],
};

const GLITCH_TRANSITION = {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror" as const,
    times: [0, 0.05, 0.1, 0.2, 0.22, 0.25, 0.3, 0.35, 0.36, 0.4, 0.8, 1],
};

const CARD_VARIANTS = {
    emerald:
        "border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-500/50 hover:bg-emerald-900/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)]",
    teal: "border-teal-500/30 bg-teal-900/10 hover:border-teal-500/50 hover:bg-teal-900/20 shadow-[0_0_40px_-10px_rgba(20,184,166,0.1)]",
    lime: "border-lime-500/30 bg-lime-900/10 hover:border-lime-500/50 hover:bg-lime-900/20 shadow-[0_0_40px_-10px_rgba(132,204,22,0.1)]",
};

// --- Components ---

const NeonSign = () => (
    <div className='fixed top-28 -right-4 md:top-24 md:right-8 z-0 pointer-events-none select-none transform rotate-[8deg] hidden sm:block opacity-70 mix-blend-screen'>
        <motion.div
            animate={GLITCH_ANIMATION}
            transition={GLITCH_TRANSITION}
            className='px-4 py-2 md:px-6 md:py-3 border-2 border-emerald-500 rounded-xl bg-black/10 backdrop-blur-[2px]'>
            <span className='font-mono font-bold text-2xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-200 to-green-400'>
                Go Offline
            </span>
        </motion.div>
    </div>
);

const BackgroundGlows = () => (
    <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[-10%] left-[10%] w-[700px] h-[700px] bg-emerald-900/20 rounded-full blur-[120px] will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-teal-800/20 rounded-full blur-[120px] will-change-transform'
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

const ColoredGlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "emerald" | "teal" | "lime";
}> = ({ children, className = "", variant = "emerald" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-500 ${CARD_VARIANTS[variant]} ${className}`}>
        <div
            className={`absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/5 to-transparent opacity-50 pointer-events-none`}
        />
        <div className='relative z-10'>{children}</div>
    </motion.div>
);

const TechBadge: React.FC<{ label: string; icon?: React.ReactNode }> = ({
    label,
    icon,
}) => (
    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors cursor-default'>
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
            className={`h-1.5 w-24 bg-linear-to-r from-emerald-500 via-teal-500 to-green-500 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}
        />
        <p
            className={`text-lg text-slate-400 leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {subtitle}
        </p>
    </div>
);

// --- Main Page Component ---

const UnpluggedShowcase: React.FC = () => {
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
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden'>
            <BackgroundGlows />
            <NeonSign />

            {/* --- FLOATING CONTROLS --- */}
            <div className='fixed top-6 right-6 z-50'>
                <button
                    onClick={toggleLanguage}
                    className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all shadow-lg group'>
                    <Languages
                        size={16}
                        className='text-emerald-400 group-hover:rotate-12 transition-transform'
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
                            className='p-3 rounded-full bg-emerald-600/80 border border-emerald-500/50 backdrop-blur-md text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/30 group'>
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

            {/* 1. HERO SECTION: Storytelling */}
            <header className='relative min-h-[95vh] flex items-center justify-center pt-20 pb-10 px-6'>
                <div className='container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='space-y-8'>
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)]'>
                            <PhoneOff size={14} className='text-emerald-400' />
                            <span>The Anti-Social Network</span>
                        </div>

                        <div>
                            <h1 className='text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1]'>
                                Un
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 animate-gradient'>
                                    plugged
                                </span>
                            </h1>
                            <span className='block text-2xl md:text-3xl font-light text-slate-400 mt-2 tracking-wide font-mono'>
                                Connect in Real Life.
                            </span>
                        </div>

                        <div className='space-y-6 text-lg text-slate-300 max-w-lg leading-relaxed border-l-4 border-emerald-500 pl-6'>
                            <p>
                                Zamisli aplikaciju koja te ne želi zadržati na
                                ekranu. Aplikaciju čiji algoritam ne optimizira
                                vrijeme provedeno <em>online</em>, već kvalitetu
                                života provedenog <em>offline</em>.
                            </p>
                            <p>
                                <strong>Unplugged</strong> je moj odgovor na
                                krizu usamljenosti i konzumerizma. To je alat za
                                izgradnju održivih, živih zajednica.
                            </p>
                        </div>

                        <div className='flex flex-wrap gap-3'>
                            <TechBadge label='React 19' icon={<Code2 />} />
                            <TechBadge
                                label='React Router v7'
                                icon={<Route />}
                            />
                            <TechBadge label='Tailwind v4' icon={<Zap />} />
                            <TechBadge label='TypeScript' icon={<Code2 />} />
                        </div>

                        <div className='flex flex-wrap gap-5 pt-4'>
                            <a
                                href='https://unplugged.netlify.app' // Placeholder
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1'>
                                <Globe size={20} />
                                <span>Live Demo</span>
                            </a>
                            <a
                                href='https://github.com/marina-majden/unplugged'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md'>
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual Placeholder: Concept Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='relative hidden lg:block'>
                        <ColoredGlassCard
                            variant='emerald'
                            className='p-0 transform -rotate-2 hover:rotate-0 transition-transform duration-500 min-h-[500px] flex flex-col'>
                            <div className='relative flex-1 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center space-y-8'>
                                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50' />

                                {/* Icons Circle */}
                                <div className='relative w-48 h-48'>
                                    <div
                                        className='absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full animate-spin-slow'
                                        style={{ animationDuration: "20s" }}
                                    />
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md border border-emerald-500/50'>
                                            <Users
                                                size={32}
                                                className='text-emerald-300'
                                            />
                                        </div>
                                    </div>
                                    {/* Satellite Icons */}
                                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-white/10 shadow-lg'>
                                        <Wrench
                                            size={20}
                                            className='text-slate-300'
                                        />
                                    </div>
                                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-2 rounded-full border border-white/10 shadow-lg'>
                                        <Leaf
                                            size={20}
                                            className='text-green-400'
                                        />
                                    </div>
                                    <div className='absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-white/10 shadow-lg'>
                                        <Recycle
                                            size={20}
                                            className='text-teal-300'
                                        />
                                    </div>
                                    <div className='absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-white/10 shadow-lg'>
                                        <HandHeart
                                            size={20}
                                            className='text-rose-300'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='text-xl font-bold text-white'>
                                        Community Engine
                                    </h3>
                                    <p className='text-sm text-emerald-400/80 mt-2 font-mono'>
                                        Status: Connected
                                    </p>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className='h-16 border-t border-white/10 bg-black/20 flex items-center justify-around px-4'>
                                <div className='text-center'>
                                    <div className='text-xs text-slate-500 uppercase tracking-wider'>
                                        Events
                                    </div>
                                    <div className='font-bold text-white'>
                                        Live
                                    </div>
                                </div>
                                <div className='w-px h-8 bg-white/10' />
                                <div className='text-center'>
                                    <div className='text-xs text-slate-500 uppercase tracking-wider'>
                                        Items
                                    </div>
                                    <div className='font-bold text-white'>
                                        Shared
                                    </div>
                                </div>
                                <div className='w-px h-8 bg-white/10' />
                                <div className='text-center'>
                                    <div className='text-xs text-slate-500 uppercase tracking-wider'>
                                        Impact
                                    </div>
                                    <div className='font-bold text-emerald-400'>
                                        High
                                    </div>
                                </div>
                            </div>
                        </ColoredGlassCard>
                    </motion.div>
                </div>
            </header>

            {/* 2. THE PHILOSOPHY (Anti-Social Concept) */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Dizajnirano za Stvarni Život'
                        subtitle='Većina aplikacija se bori za tvoju pažnju. Unplugged se bori za tvoju zajednicu.'
                        align='center'
                    />

                    <div className='grid md:grid-cols-3 gap-6'>
                        <ColoredGlassCard
                            variant='emerald'
                            className='p-8 group hover:-translate-y-2 h-full'>
                            <div className='mb-6 bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300'>
                                <CalendarHeart
                                    size={32}
                                    className='text-emerald-400'
                                />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-3'>
                                Live Aktivnosti
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Potičemo humanitarne akcije, edukativne
                                radionice i druženja. Cilj aplikacije je da je
                                ugasiš i odeš van među ljude.
                            </p>
                        </ColoredGlassCard>

                        <ColoredGlassCard
                            variant='teal'
                            className='p-8 group hover:-translate-y-2 h-full'>
                            <div className='mb-6 bg-teal-900/30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-teal-500/20 group-hover:scale-110 transition-transform duration-300'>
                                <Box size={32} className='text-teal-400' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-3'>
                                Knjižnica Stvari
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Zašto kupovati bušilicu koju ćeš koristiti 10
                                minuta godišnje? Zajednički inventar omogućuje
                                posudbu alata i rekvizita unutar susjedstva.
                            </p>
                        </ColoredGlassCard>

                        <ColoredGlassCard
                            variant='lime'
                            className='p-8 group hover:-translate-y-2 h-full'>
                            <div className='mb-6 bg-lime-900/30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-lime-500/20 group-hover:scale-110 transition-transform duration-300'>
                                <Share2 size={32} className='text-lime-400' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-3'>
                                Eco-Economy
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Umjesto bacanja, pokloni. Unplugged potiče
                                kružnu ekonomiju i smanjenje otpada kroz
                                jednostavan sustav razmjene dobara.
                            </p>
                        </ColoredGlassCard>
                    </div>
                </div>
            </section>

            {/* 3. PRODUCT OWNERSHIP & ALGORITHM */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <div className='grid lg:grid-cols-2 gap-12 items-center'>
                        <div className='space-y-8'>
                            <SectionHeading
                                title="Redefiniranje 'Algoritma'"
                                subtitle='Kao jedini tvorac ove platforme, donijela sam svjesnu inženjersku odluku: metrike moraju odražavati ljudske vrijednosti, a ne vrijeme zadržavanja.'
                                align='left'
                            />

                            <div className='space-y-6'>
                                <div className='flex gap-4 items-start'>
                                    <div className='p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mt-1'>
                                        <HandHeart size={24} />
                                    </div>
                                    <div>
                                        <h4 className='text-lg font-bold text-white'>
                                            Doseg temeljen na Doprinosu
                                        </h4>
                                        <p className='text-slate-400 mt-2'>
                                            U Unpluggedu, "lajkovi" na slike ne
                                            postoje. Tvoj doseg (reach) raste
                                            proporcionalno tvom angažmanu u
                                            zajednici – što više pomažeš, to se
                                            tvoj glas jače čuje.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-4 items-start'>
                                    <div className='p-3 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 mt-1'>
                                        <Layers size={24} />
                                    </div>
                                    <div>
                                        <h4 className='text-lg font-bold text-white'>
                                            Full-Stack Arhitektura
                                        </h4>
                                        <p className='text-slate-400 mt-2'>
                                            Samostalno sam dizajnirala i
                                            implementirala cijeli sustav: od
                                            baze podataka koja prati inventar
                                            "Knjižnice stvari", do frontenda
                                            koji osigurava glatko korisničko
                                            iskustvo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ColoredGlassCard
                            variant='emerald'
                            className='p-10 border-l border-white/5 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 p-4 opacity-10'>
                                <Cpu size={120} className='text-white' />
                            </div>
                            <div className='relative z-10'>
                                <div className='inline-flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-6 border-b border-emerald-500/30 pb-2'>
                                    One Woman Army
                                </div>
                                <h3 className='text-3xl font-bold text-white mb-6'>
                                    Uloga na projektu
                                </h3>
                                <ul className='space-y-4'>
                                    {[
                                        {
                                            role: "Idejni Tvorac",
                                            desc: "Koncept anti-društvene mreže i održivosti.",
                                        },
                                        {
                                            role: "Lead Developer",
                                            desc: "Implementacija React 19 & Tailwind v4 arhitekture.",
                                        },
                                        {
                                            role: "UI/UX Dizajner",
                                            desc: "Sučelje fokusirano na akciju, a ne konzumaciju.",
                                        },
                                        {
                                            role: "Backend Engineer",
                                            desc: "Logika posudbe i event managementa.",
                                        },
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className='flex items-center justify-between border-b border-white/5 pb-2 last:border-0'>
                                            <span className='text-slate-300 font-medium'>
                                                {item.role}
                                            </span>
                                            <span className='text-xs text-emerald-500/80 text-right max-w-[50%]'>
                                                {item.desc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ColoredGlassCard>
                    </div>
                </div>
            </section>

            {/* 4. TECH STACK (Bleeding Edge) */}
            <section className='py-20 relative z-10 bg-slate-900/30 border-y border-white/5'>
                <div className='container mx-auto px-6 text-center'>
                    <h3 className='text-2xl font-bold text-white mb-10 flex items-center justify-center gap-3'>
                        <Zap className='text-yellow-400 fill-yellow-400/20' />
                        Izgrađeno na Modernim Temeljima
                    </h3>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                        {[
                            {
                                name: "React 19",
                                desc: "Core Library",
                                color: "text-blue-400",
                            },
                            {
                                name: "React Router v7",
                                desc: "Next-gen Routing",
                                color: "text-red-400",
                            },
                            {
                                name: "Tailwind v4",
                                desc: "Styling Engine",
                                color: "text-cyan-400",
                            },
                            {
                                name: "TypeScript",
                                desc: "Type Safety",
                                color: "text-blue-600",
                            },
                        ].map((tech, i) => (
                            <div
                                key={i}
                                className='p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-emerald-500/30 transition-all group'>
                                <div
                                    className={`text-xl font-bold ${tech.color} mb-2 group-hover:scale-110 transition-transform`}>
                                    {tech.name}
                                </div>
                                <div className='text-sm text-slate-500'>
                                    {tech.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className='py-24 relative z-10 text-center border-t border-white/5 bg-slate-950'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950 pointer-events-none' />
                <div className='container mx-auto px-6 relative z-10'>
                    <h2 className='text-4xl font-bold text-white mb-6'>
                        Manje Skrolanja. Više Života.
                    </h2>
                    <p className='text-xl text-slate-400 mb-10 max-w-2xl mx-auto'>
                        Unplugged nije samo aplikacija, to je pokret za povratak
                        stvarnim vrijednostima.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <a
                            href='https://github.com/marina-majden/unplugged'
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

export default UnpluggedShowcase;
