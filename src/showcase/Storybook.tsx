import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    BookOpen,
    MessageCircle,
    Wand2,
    MapPin,
    Smartphone,
    Code2,
    Palette,
    Wind,
    Volume2,
    Check,
    Clock,
    Mail,
    Github,
    Languages,
    ArrowLeft,
} from "lucide-react";
import { ArrowUp } from "react-feather";

const GLITCH_ANIMATION = {
    opacity: [1, 0.8, 1, 1, 0.1, 1, 0.9, 1, 0.1, 1, 0.95, 1],
    textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d946ef, 0 0 40px #d946ef",
        "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #d946ef, 0 0 20px #d946ef",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d946ef, 0 0 40px #d946ef",
    ],
    boxShadow: [
        "0 0 5px #a855f7, 0 0 10px #a855f7, inset 0 0 5px #a855f7",
        "0 0 2px #a855f7, 0 0 5px #a855f7, inset 0 0 2px #a855f7",
        "0 0 5px #a855f7, 0 0 10px #a855f7, inset 0 0 5px #a855f7",
    ],
};

const GLITCH_TRANSITION = {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror" as const,
    times: [0, 0.05, 0.1, 0.2, 0.22, 0.25, 0.3, 0.35, 0.36, 0.4, 0.8, 1],
};

const CARD_VARIANTS = {
    indigo: "border-indigo-500/30 bg-indigo-900/10 hover:border-indigo-500/50 hover:bg-indigo-900/20 shadow-[0_0_40px_-10px_rgba(79,70,229,0.1)]",
    purple: "border-purple-500/30 bg-purple-900/10 hover:border-purple-500/50 hover:bg-purple-900/20 shadow-[0_0_40px_-10px_rgba(168,85,247,0.1)]",
    cyan: "border-cyan-500/30 bg-cyan-900/10 hover:border-cyan-500/50 hover:bg-cyan-900/20 shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)]",
};

// --- Components ---

// 1. NEON SIGN
const NeonSign = () => (
    <div className='fixed top-28 -right-4 md:top-24 md:right-8 z-0 pointer-events-none select-none transform rotate-[8deg] hidden sm:block opacity-60 mix-blend-screen'>
        <motion.div
            animate={GLITCH_ANIMATION}
            transition={GLITCH_TRANSITION}
            className='px-4 py-2 md:px-6 md:py-3 border-2 border-purple-500/10 rounded-xl bg-black/10 backdrop-blur-[2px]'>
            <span className='font-link font-bold text-2xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-cyan-400/50 via-fuchsia-400/50 to-indigo-400/50'>
                Project Showcase
            </span>
        </motion.div>
    </div>
);

// 2. BACKGROUND GLOWS (Optimized with will-change-transform)
const BackgroundGlows = () => (
    <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] will-change-transform'
        />
        <motion.div
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className='absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform'
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

// 3. COLORED GLASS CARD
const ColoredGlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "indigo" | "purple" | "cyan";
}> = ({ children, className = "", variant = "indigo" }) => {
    return (
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
};

// Standard Glass Card
const GlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => (
    <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition-colors ${className}`}>
        {children}
    </div>
);

const TechBadge: React.FC<{ label: string; icon?: React.ReactNode }> = ({
    label,
    icon,
}) => (
    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-indigo-400/50 hover:text-indigo-300 transition-colors cursor-default'>
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
            className={`h-1.5 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}
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
}> = ({ code, language, title }) => (
    <div className='rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl shadow-2xl my-6 font-mono text-sm relative group'>
        <div className='flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5'>
            <span className='text-slate-400 text-xs flex items-center gap-2'>
                <Code2 size={14} className='text-indigo-400' /> {title}
            </span>
            <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50' />
                <div className='w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50' />
            </div>
        </div>
        <div className='p-4 overflow-x-auto text-slate-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

const Storybook: React.FC = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [lang, setLang] = useState<"HR" | "EN">("HR");

    useEffect(() => {
        const handleScroll = () => {
            // Optimization: Only update state if value changes to avoid re-renders
            const shouldShow = window.scrollY > 300;
            if (shouldShow !== showScrollTop) {
                setShowScrollTop(shouldShow);
            }
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
        <div
            className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500 selection:text-white'
            style={{ fontFamily: "'Lato', sans-serif" }}>
            <BackgroundGlows />
            <NeonSign />

            {/* --- FLOATING CONTROLS --- */}

            <div className='fixed top-6 right-6 z-50'>
                <button
                    onClick={toggleLanguage}
                    className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-indigo-500/50 transition-all shadow-lg group'>
                    <Languages
                        size={16}
                        className='text-indigo-400 group-hover:rotate-12 transition-transform'
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
                            className='p-3 rounded-full bg-indigo-600/80 border border-indigo-500/50 backdrop-blur-md text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 group'
                            aria-label='Scroll to top'>
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

            {/* Navigation */}
            <nav className='fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='shrink-0'>
                            <span
                                className='text-2xl font-bold text-amber-400'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                Marina.dev
                            </span>
                        </div>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-4'>
                                <a
                                    href='#about'
                                    className='hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                                    O Projektu
                                </a>
                                <a
                                    href='#features'
                                    className='hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                                    Mogućnosti
                                </a>
                                <a
                                    href='#process'
                                    className='hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors'>
                                    Naruči
                                </a>
                                <a
                                    href='#contact'
                                    className='bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all'>
                                    Kontakt
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
                {/* Background decorative elements */}
                <div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none'>
                    <div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl'></div>
                </div>

                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <h1
                        className='text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight'
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className='block mb-2'>Više od priče.</span>
                        <span className='bg-gradient-to-br from-amber-400 to-amber-700 bg-clip-text text-transparent'>
                            Uspomena za cijeli život.
                        </span>
                    </h1>
                    <p className='mt-4 max-w-2xl mx-auto text-xl text-slate-300 font-light'>
                        Potpuno personalizirana digitalna slikovnica gdje vaši
                        najmiliji postaju glavni junaci. Spoj umjetne
                        inteligencije, kreativnog pisanja i moderne web
                        tehnologije.
                    </p>

                    <div className='mt-10 flex flex-col sm:flex-row justify-center gap-4'>
                        <a
                            href='https://christmas-storybook.netlify.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-gradient-to-br from-amber-400 to-amber-700 text-slate-900 font-bold px-8 py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 hover:brightness-110 hover:scale-105 transition-all duration-300'>
                            <BookOpen className='w-5 h-5' />
                            Pogledaj Slikovnicu
                        </a>
                        <a
                            href='#contact'
                            className='px-8 py-4 rounded-full text-lg border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2'>
                            <MessageCircle className='w-5 h-5' />
                            Zatraži Ponudu
                        </a>
                    </div>

                    {/* Preview Mockup Area */}
                    <div className='mt-16 relative mx-auto max-w-5xl rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-slate-800 group'>
                        <div className='aspect-w-16 aspect-h-9 relative'>
                            <img
                                src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop'
                                alt='Prikaz slikovnice'
                                className='object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity duration-500'
                            />
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='text-center p-6 bg-slate-900/80 backdrop-blur rounded-xl border border-amber-500/30'>
                                    <h3
                                        className='text-2xl font-bold text-amber-400 mb-2'
                                        style={{
                                            fontFamily:
                                                "'Playfair Display', serif",
                                        }}>
                                        Interaktivni Prikaz
                                    </h3>
                                    <p className='text-sm text-slate-300'>
                                        Responzivno • Animirano • Zvučno
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This is Special (Features) */}
            <section id='about' className='py-20 bg-slate-900/50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-16'>
                        <h2
                            className='text-3xl md:text-4xl font-bold mb-4'
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            Gdje tehnologija susreće čaroliju
                        </h2>
                        <p className='text-slate-400 max-w-2xl mx-auto'>
                            Ovo nije običan PDF. Ovo je web aplikacija izrađena
                            s pažnjom, koristeći napredne alate kako bi priča
                            bila što uvjerljivija.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {/* Feature 1 */}
                        <div className='bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:-translate-y-1 hover:shadow-2xl hover:border-amber-400/30 transition-all duration-300'>
                            <div className='bg-amber-400/10 text-amber-400 p-3 rounded-full mb-4 inline-flex items-center justify-center'>
                                <Wand2 className='w-6 h-6' />
                            </div>
                            <h3
                                className='text-xl font-bold mb-3 text-white'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                AI Ilustracije po Mjeri
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Koristeći Adobe Firefly i napredne tehnike
                                obrade, kreiram likove koji izgledaju baš kao
                                stvarne osobe s vaših fotografija. Odjeća,
                                frizura, pa čak i kućni ljubimci – sve je
                                autentično.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className='bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:-translate-y-1 hover:shadow-2xl hover:border-amber-400/30 transition-all duration-300'>
                            <div className='bg-amber-400/10 text-amber-400 p-3 rounded-full mb-4 inline-flex items-center justify-center'>
                                <MapPin className='w-6 h-6' />
                            </div>
                            <h3
                                className='text-xl font-bold mb-3 text-white'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                Stvarne Lokacije
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Radnja se ne odvija u izmišljenom svijetu (osim
                                ako to ne želite!). Ilustracije mogu prikazivati
                                vaš stvarni grad, ulicu ili omiljeni park,
                                čineći priču nevjerojatno uvjerljivom.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className='bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:-translate-y-1 hover:shadow-2xl hover:border-amber-400/30 transition-all duration-300'>
                            <div className='bg-amber-400/10 text-amber-400 p-3 rounded-full mb-4 inline-flex items-center justify-center'>
                                <Smartphone className='w-6 h-6' />
                            </div>
                            <h3
                                className='text-xl font-bold mb-3 text-white'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                Digitalno & Fizičko
                            </h3>
                            <p className='text-slate-400 leading-relaxed'>
                                Slikovnica je{" "}
                                <strong>responzivna web aplikacija</strong> koju
                                možete dijeliti linkom i čitati na mobitelu. No,
                                jednim klikom se pretvara u format spreman za{" "}
                                <strong>visokokvalitetni ispis</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Tech Details (Subtle) */}
                    <div className='mt-16 p-6 border-t border-white/5 text-center'>
                        <p className='text-sm text-slate-500 uppercase tracking-widest mb-4'>
                            Tehnologija "ispod haube"
                        </p>
                        <div className='flex flex-wrap justify-center gap-6 text-slate-400 font-mono text-sm'>
                            <span className='flex items-center gap-2'>
                                <Code2 className='w-4 h-4 text-blue-400' />{" "}
                                React & TypeScript
                            </span>
                            <span className='flex items-center gap-2'>
                                <Palette className='w-4 h-4 text-pink-400' />{" "}
                                Adobe Firefly AI
                            </span>
                            <span className='flex items-center gap-2'>
                                <Wind className='w-4 h-4 text-cyan-400' />{" "}
                                Tailwind CSS
                            </span>
                            <span className='flex items-center gap-2'>
                                <Volume2 className='w-4 h-4 text-green-400' />{" "}
                                Web Speech API
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ordering Process */}
            <section id='process' className='py-20 relative'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        <div>
                            <h2
                                className='text-3xl md:text-5xl font-bold mb-6'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                Želite svoju priču?
                            </h2>
                            <p className='text-lg text-slate-300 mb-8'>
                                Svaka slikovnica je unikatni projekt. Da bih
                                kreirala savršenu priču za vas, proces je
                                suradnički i detaljan. Evo što mi je potrebno:
                            </p>

                            <ul className='space-y-6'>
                                <li className='flex items-start'>
                                    <div className='flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mt-1'>
                                        1
                                    </div>
                                    <div className='ml-4'>
                                        <h4 className='text-lg font-bold text-white'>
                                            Fotografije i Opisi
                                        </h4>
                                        <p className='text-slate-400 text-sm'>
                                            Pošaljite fotografije osoba (lica) i
                                            odjeće koju želite vidjeti u priči.
                                            Što više detalja, to bolja sličnost!
                                        </p>
                                    </div>
                                </li>
                                <li className='flex items-start'>
                                    <div className='flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mt-1'>
                                        2
                                    </div>
                                    <div className='ml-4'>
                                        <h4 className='text-lg font-bold text-white'>
                                            Lokacija i Atmosfera
                                        </h4>
                                        <p className='text-slate-400 text-sm'>
                                            Gdje se radnja odvija? (npr. Trg
                                            bana Jelačića, vaša vikendica).
                                            Kakva je atmosfera? (Snježna zima,
                                            sunčano ljeto, svemir?).
                                        </p>
                                    </div>
                                </li>
                                <li className='flex items-start'>
                                    <div className='flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mt-1'>
                                        3
                                    </div>
                                    <div className='ml-4'>
                                        <h4 className='text-lg font-bold text-white'>
                                            Radnja i Žanr
                                        </h4>
                                        <p className='text-slate-400 text-sm'>
                                            Odaberite stil: Dječja pustolovna s
                                            poukom, humoristična priča za
                                            odrasle, basna s ljubimcima? Imate
                                            li interne šale koje želite
                                            uključiti?
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className='bg-slate-800 p-8 rounded-2xl border border-amber-500/20 relative'>
                            <div className='absolute -top-4 -right-4 bg-amber-500 text-slate-900 font-bold px-4 py-1 rounded-full text-sm'>
                                Best Seller
                            </div>
                            <h3 className='text-2xl font-bold text-white mb-2'>
                                Unikatni Paket
                            </h3>
                            <div
                                className='text-4xl font-bold text-amber-400 mb-6'
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                }}>
                                od €149.00
                            </div>
                            <div className='space-y-3 mb-8 text-slate-300 text-sm'>
                                <p className='flex items-center gap-2'>
                                    <Check className='text-green-400 w-4 h-4' />{" "}
                                    10 unikatnih AI ilustracija
                                </p>
                                <p className='flex items-center gap-2'>
                                    <Check className='text-green-400 w-4 h-4' />{" "}
                                    Personalizirani tekst (cca 1000 riječi)
                                </p>
                                <p className='flex items-center gap-2'>
                                    <Check className='text-green-400 w-4 h-4' />{" "}
                                    Web hosting (trajni link)
                                </p>
                                <p className='flex items-center gap-2'>
                                    <Check className='text-green-400 w-4 h-4' />{" "}
                                    Audio naracija (Web Speech API)
                                </p>
                                <p className='flex items-center gap-2'>
                                    <Check className='text-green-400 w-4 h-4' />{" "}
                                    Print-ready PDF verzija
                                </p>
                                <p className='flex items-center gap-2'>
                                    <Clock className='text-amber-400 w-4 h-4' />{" "}
                                    Vrijeme izrade: 7-10 dana
                                </p>
                            </div>
                            <a
                                href='#contact'
                                className='block w-full text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors'>
                                Naruči odmah
                            </a>
                            <p className='mt-4 text-xs text-center text-slate-500'>
                                *Cijena ovisi o kompleksnosti scena i broju
                                likova.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Contact */}
            <section
                id='contact'
                className='py-20 bg-linear-to-t from-slate-900 to-indigo-950/30'>
                <div className='max-w-4xl mx-auto px-4 text-center'>
                    <h2
                        className='text-3xl md:text-5xl font-bold mb-6 text-white'
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Spremni za vašu priču?
                    </h2>
                    <p className='text-lg text-slate-300 mb-10'>
                        Javite mi se s idejom. Bilo da je rođendan, godišnjica
                        ili Božić, stvorit ćemo nešto nezaboravno.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-6'>
                        <a
                            href='mailto:tvoj.email@primjer.com'
                            className='bg-linear-to-br from-amber-400 to-amber-700 text-slate-900 font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 hover:brightness-110 hover:scale-105 transition-all duration-300'>
                            <Mail className='w-5 h-5' />
                            Pošalji Upit
                        </a>
                        <a
                            href='https://github.com/marina-majden'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='px-10 py-4 rounded-full text-lg border border-white/20 hover:bg-white/10 text-white flex items-center justify-center gap-3 transition-all'>
                            <Github className='w-5 h-5' />
                            Moj Portfolio
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='py-8 bg-slate-950 border-t border-white/5'>
                <div className='max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm'>
                    <p>&copy; 2025 Marina Majden. Sva prava pridržana.</p>
                    <p className='mt-2'>
                        Projekt: Christmas Storybook Showcase
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Storybook;
