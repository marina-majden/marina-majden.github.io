import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
    Code2,
    ExternalLink,
    Github,
    Heart,
    Shield,
    Users,
    MessageCircle,
    Zap,
    ArrowUp,
    ArrowLeft,
    Languages,
    Palette,
    Brain,
    Sparkles,
    LayoutTemplate,
    Lightbulb,
} from "lucide-react";

// --- Constants & Animations ---

const GLITCH_ANIMATION = {
    opacity: [1, 0.8, 1, 1, 0.1, 1, 0.9, 1, 0.1, 1, 0.95, 1],
    textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #f59e0b, 0 0 40px #f59e0b",
        "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #f59e0b, 0 0 20px #f59e0b",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #f59e0b, 0 0 40px #f59e0b",
    ],
};

const GLITCH_TRANSITION = {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror" as const,
    times: [0, 0.05, 0.1, 0.2, 0.22, 0.25, 0.3, 0.35, 0.36, 0.4, 0.8, 1],
};

const CARD_VARIANTS = {
    amber: "border-amber-500/30 bg-amber-900/10 hover:border-amber-500/50 hover:bg-amber-900/20 shadow-[0_0_40px_-10px_rgba(245,158,11,0.1)]",
    orange: "border-orange-500/30 bg-orange-900/10 hover:border-orange-500/50 hover:bg-orange-900/20 shadow-[0_0_40px_-10px_rgba(249,115,22,0.1)]",
    rose: "border-rose-500/30 bg-rose-900/10 hover:border-rose-500/50 hover:bg-rose-900/20 shadow-[0_0_40px_-10px_rgba(244,63,94,0.1)]",
};

// --- Components ---

const NeonSign = () => (
    <div className='fixed top-28 -right-4 md:top-24 md:right-8 z-0 pointer-events-none select-none transform rotate-[8deg] hidden sm:block opacity-70 mix-blend-screen'>
        <motion.div
            animate={GLITCH_ANIMATION}
            transition={GLITCH_TRANSITION}
            className='px-4 py-2 md:px-6 md:py-3 border-[2px] border-amber-500 rounded-xl bg-black/10 backdrop-blur-[2px]'>
            <span className='font-mono font-bold text-2xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-orange-400'>
                Human Touch
            </span>
        </motion.div>
    </div>
);

const BackgroundGlows = () => (
    <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] will-change-transform'
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

const ColoredGlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "amber" | "orange" | "rose";
}> = ({ children, className = "", variant = "amber" }) => (
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
    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-colors cursor-default'>
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
            className={`h-1.5 w-24 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}
        />
        <p
            className={`text-lg text-slate-400 leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {subtitle}
        </p>
    </div>
);

// --- Main Page Component ---

const NeedHelpShowcase: React.FC = () => {
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
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden'>
            <BackgroundGlows />
            <NeonSign />

            {/* --- FLOATING CONTROLS --- */}
            <div className='fixed top-6 right-6 z-50'>
                <button
                    onClick={toggleLanguage}
                    className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-amber-500/50 transition-all shadow-lg group'>
                    <Languages
                        size={16}
                        className='text-amber-400 group-hover:rotate-12 transition-transform'
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
                            className='p-3 rounded-full bg-amber-600/80 border border-amber-500/50 backdrop-blur-md text-white hover:bg-amber-500 transition-all shadow-lg shadow-amber-500/30 group'>
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
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.3)]'>
                            <Heart
                                size={14}
                                className='text-amber-400 fill-amber-400/50'
                            />
                            <span>Community Driven Support</span>
                        </div>

                        <div>
                            <h1 className='text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1]'>
                                Need
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient'>
                                    Help
                                </span>
                            </h1>
                            <span className='block text-2xl md:text-3xl font-light text-slate-400 mt-2 tracking-wide font-mono'>
                                Anonimna Ljudska Povezanost
                            </span>
                        </div>

                        <p className='text-xl text-slate-300 max-w-lg leading-relaxed border-l-4 border-amber-500 pl-6'>
                            Platforma koja vraća empatiju u digitalni svijet.
                            Anonimni forum za pitanja gdje AI nema pristup, a
                            odgovore daju stvarni ljudi s iskustvom.
                        </p>

                        <div className='flex flex-wrap gap-3'>
                            <TechBadge label='React 19' icon={<Code2 />} />
                            <TechBadge label='Tailwind v4' icon={<Palette />} />
                            <TechBadge label='TypeScript' icon={<Code2 />} />
                            <TechBadge label='Vite' icon={<Zap />} />
                        </div>

                        <div className='flex flex-wrap gap-5 pt-4'>
                            <button
                                className='group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1 cursor-not-allowed opacity-80'
                                title='Coming Soon'>
                                <MessageCircle size={20} />
                                <span>Uskoro Live</span>
                            </button>
                            <a
                                href='https://github.com/marina-majden/need-help'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md'>
                                <Github size={20} />
                                <span>Pogledaj Kod</span>
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
                            variant='amber'
                            className='p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500'>
                            <div className='relative aspect-square rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center overflow-hidden group'>
                                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-900/20' />

                                {/* Mock UI Elements */}
                                <div className='w-3/4 space-y-3 relative z-10'>
                                    <div className='h-20 bg-slate-800/80 rounded-lg p-3 border border-white/5 shadow-lg backdrop-blur-sm transform group-hover:-translate-y-2 transition-transform duration-500'>
                                        <div className='flex gap-2 mb-2'>
                                            <div className='w-2 h-2 rounded-full bg-rose-500' />
                                            <div className='w-16 h-2 bg-slate-600 rounded-full' />
                                        </div>
                                        <div className='w-full h-2 bg-slate-700 rounded-full mb-1' />
                                        <div className='w-2/3 h-2 bg-slate-700 rounded-full' />
                                    </div>

                                    <div className='h-20 bg-slate-800/80 rounded-lg p-3 border border-white/5 shadow-lg backdrop-blur-sm border-l-4 border-l-amber-500 transform group-hover:scale-105 transition-transform duration-500 delay-75'>
                                        <div className='flex gap-2 mb-2'>
                                            <div className='w-2 h-2 rounded-full bg-amber-500' />
                                            <div className='w-24 h-2 bg-slate-600 rounded-full' />
                                        </div>
                                        <div className='w-full h-2 bg-slate-700 rounded-full mb-1' />
                                        <div className='w-3/4 h-2 bg-slate-700 rounded-full' />
                                    </div>

                                    <div className='h-20 bg-slate-800/80 rounded-lg p-3 border border-white/5 shadow-lg backdrop-blur-sm transform group-hover:translate-y-2 transition-transform duration-500 delay-150'>
                                        <div className='flex gap-2 mb-2'>
                                            <div className='w-2 h-2 rounded-full bg-blue-500' />
                                            <div className='w-20 h-2 bg-slate-600 rounded-full' />
                                        </div>
                                        <div className='w-full h-2 bg-slate-700 rounded-full' />
                                    </div>
                                </div>

                                <div className='text-center z-10 mt-8'>
                                    <p className='text-slate-300 font-medium text-lg'>
                                        Pitaj. Podijeli. Poveži se.
                                    </p>
                                    <p className='text-xs text-amber-500/80 mt-1 font-mono uppercase tracking-widest'>
                                        Anonimno & Sigurno
                                    </p>
                                </div>
                            </div>
                        </ColoredGlassCard>
                    </motion.div>
                </div>
            </header>

            {/* 2. PHILOSOPHY: HUMAN VS AI */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Ljudska Perspektiva'
                        subtitle='U vrijeme kada AI ima sve znanje svijeta i daje odgovor u roku sekunde, Need Help vraća ono što algoritmi ne mogu simulirati.'
                        align='center'
                    />

                    <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
                        {/* AI SIDE */}
                        <div className='p-8 rounded-3xl border border-slate-800 bg-slate-900/50 grayscale opacity-70'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='p-3 bg-slate-800 rounded-full'>
                                    <Brain size={24} />
                                </div>
                                <h3 className='text-xl font-bold text-slate-300'>
                                    Artificial Intelligence
                                </h3>
                            </div>
                            <ul className='space-y-4 text-slate-400'>
                                <li className='flex gap-3'>
                                    <span className='text-slate-600'>⚡</span>{" "}
                                    Instantni, ali generički odgovori.
                                </li>
                                <li className='flex gap-3'>
                                    <span className='text-slate-600'>🤖</span>{" "}
                                    Činjenično točno, ali emocionalno prazno.
                                </li>
                                <li className='flex gap-3'>
                                    <span className='text-slate-600'>❄️</span>{" "}
                                    Hladna logika bez životnog iskustva.
                                </li>
                            </ul>
                        </div>

                        {/* HUMAN SIDE */}
                        <ColoredGlassCard
                            variant='amber'
                            className='p-8 border-amber-500/30 bg-gradient-to-b from-amber-900/10 to-transparent'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='p-3 bg-amber-500/20 rounded-full text-amber-400'>
                                    <Heart size={24} />
                                </div>
                                <h3 className='text-xl font-bold text-white'>
                                    Need Help Platforma
                                </h3>
                            </div>
                            <ul className='space-y-4 text-slate-300'>
                                <li className='flex gap-3'>
                                    <span className='text-amber-400'>🔥</span>{" "}
                                    Toplina, empatija i stvarna podrška.
                                </li>
                                <li className='flex gap-3'>
                                    <span className='text-amber-400'>🤝</span>{" "}
                                    Odgovori temeljeni na proživljenom iskustvu.
                                </li>
                                <li className='flex gap-3'>
                                    <span className='text-amber-400'>🛡️</span>{" "}
                                    Ponekad potreban prijekor, ponekad zagrljaj.
                                </li>
                            </ul>
                        </ColoredGlassCard>
                    </div>
                </div>
            </section>

            {/* 3. PRODUCT ENGINEER: BEYOND CODE */}
            <section className='py-24 relative z-10 overflow-hidden'>
                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-r from-amber-900/20 to-transparent pointer-events-none' />

                <div className='container mx-auto px-6'>
                    <ColoredGlassCard
                        variant='orange'
                        className='p-0 overflow-hidden'>
                        <div className='grid lg:grid-cols-2 gap-0'>
                            <div className='relative bg-slate-900/40 p-10 md:p-14 flex flex-col justify-center border-r border-white/5 order-2 lg:order-1'>
                                <div className='relative z-10'>
                                    <Lightbulb
                                        className='text-orange-400 mb-6'
                                        size={40}
                                    />
                                    <h3 className='text-2xl font-bold text-white mb-4'>
                                        Totalno Vlasništvo Proizvoda
                                    </h3>
                                    <p className='text-slate-300 leading-relaxed mb-6'>
                                        Na ovom projektu nisam samo pisala kod.
                                        Djelovala sam kao:
                                    </p>
                                    <ul className='space-y-3 mb-8'>
                                        <li className='flex items-center gap-3 text-slate-400'>
                                            <div className='w-1.5 h-1.5 rounded-full bg-orange-500' />
                                            <span>
                                                <strong>
                                                    Product Designer:
                                                </strong>{" "}
                                                Osmislila sam koncept
                                                anonimnosti i kategorija.
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-3 text-slate-400'>
                                            <div className='w-1.5 h-1.5 rounded-full bg-orange-500' />
                                            <span>
                                                <strong>
                                                    UI/UX Architect:
                                                </strong>{" "}
                                                Dizajnirala sam{" "}
                                                <em>Color-Coded</em> sučelje za
                                                intuitivno pregledavanje.
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-3 text-slate-400'>
                                            <div className='w-1.5 h-1.5 rounded-full bg-orange-500' />
                                            <span>
                                                <strong>Lead Developer:</strong>{" "}
                                                Implementirala moderni React
                                                stack.
                                            </span>
                                        </li>
                                    </ul>
                                    <div className='flex items-center gap-4 border-t border-white/10 pt-6'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg'>
                                            M
                                        </div>
                                        <div>
                                            <div className='font-bold text-white'>
                                                Marina Majden
                                            </div>
                                            <div className='text-sm text-slate-400 font-mono'>
                                                Full Product Engineer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='p-10 md:p-14 flex flex-col justify-center order-1 lg:order-2'>
                                <div className='inline-flex items-center gap-2 text-orange-400 font-bold tracking-widest text-xs uppercase mb-6 border-b border-orange-500/30 pb-2 w-fit'>
                                    <Sparkles size={14} /> The Vision
                                </div>
                                <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                                    Zašto je ovo dobro?
                                </h2>
                                <div className='space-y-6 text-lg text-slate-300 leading-relaxed'>
                                    <p>
                                        Sposobnost da se ideja pretvori u
                                        funkcionalan proizvod — od skice na
                                        papiru do deployane aplikacije — je ono
                                        što razlikuje "kodera" od{" "}
                                        <strong>inženjera</strong>.
                                    </p>
                                    <p>
                                        Ovaj projekt dokazuje da razumijem
                                        cijeli životni ciklus softvera: od
                                        psihologije korisnika koji traži pomoć,
                                        do arhitekture baze podataka koja tu
                                        pomoć omogućuje.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ColoredGlassCard>
                </div>
            </section>

            {/* 4. FEATURES & TECH STACK */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Arhitektura & Funkcionalnosti'
                        subtitle='Moderan web zahtijeva moderne alate. Need Help je izgrađen na najnovijim inačicama React ekosustava.'
                        align='left'
                    />

                    <div className='grid md:grid-cols-3 gap-6 mb-12'>
                        {[
                            {
                                icon: (
                                    <LayoutTemplate
                                        size={32}
                                        className='text-amber-400'
                                    />
                                ),
                                title: "Color-Coded UI",
                                desc: "Svaka kategorija (Ljubav, Karijera, Obitelj) ima svoju boju, omogućujući korisnicima brzo vizualno skeniranje i filtriranje sadržaja.",
                                variant: "amber",
                            },
                            {
                                icon: (
                                    <Shield
                                        size={32}
                                        className='text-orange-400'
                                    />
                                ),
                                title: "Potpuna Anonimnost",
                                desc: "Arhitektura dizajnirana da štiti identitet korisnika, potičući iskrenost bez straha od osude.",
                                variant: "orange",
                            },
                            {
                                icon: (
                                    <Users
                                        size={32}
                                        className='text-rose-400'
                                    />
                                ),
                                title: "Expert Network",
                                desc: "Sustav uloga koji verificira stručnjake, dajući težinu njihovim savjetima u moru mišljenja.",
                                variant: "rose",
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

                    {/* Tech Stack Details */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center'>
                            <div className='text-blue-400 font-bold text-lg mb-1'>
                                React 19
                            </div>
                            <div className='text-xs text-slate-500'>
                                Core Library
                            </div>
                        </div>
                        <div className='p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center'>
                            <div className='text-cyan-400 font-bold text-lg mb-1'>
                                Tailwind v4
                            </div>
                            <div className='text-xs text-slate-500'>
                                Styling Engine
                            </div>
                        </div>
                        <div className='p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center'>
                            <div className='text-blue-600 font-bold text-lg mb-1'>
                                TypeScript
                            </div>
                            <div className='text-xs text-slate-500'>
                                Type Safety
                            </div>
                        </div>
                        <div className='p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center'>
                            <div className='text-purple-400 font-bold text-lg mb-1'>
                                Vite
                            </div>
                            <div className='text-xs text-slate-500'>
                                Build Tool
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className='py-24 relative z-10 text-center border-t border-white/5 bg-slate-950'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-950 to-slate-950 pointer-events-none' />
                <div className='container mx-auto px-6 relative z-10'>
                    <h2 className='text-4xl font-bold text-white mb-6'>
                        Pitaj. Pomozi. Poveži se.
                    </h2>
                    <p className='text-xl text-slate-400 mb-10 max-w-2xl mx-auto'>
                        Need Help je više od aplikacije. To je sigurno mjesto na
                        internetu.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <a
                            href='https://github.com/marina-majden/need-help'
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

export default NeedHelpShowcase;
