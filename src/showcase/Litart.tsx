import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Code2,
    Server,
    Layers,
    ExternalLink,
    Flame,
    Github,
    MonitorPlay,
    BrainCircuit,
    Container,
    Globe,
    ToggleLeft,
    Database,
    Feather,
    ScrollText,
    Video,
    Image,
    Sparkles,
    ArrowUp,
    ArrowLeft,
    Languages,
    Zap,
} from "lucide-react";
import BackgroundGlows from "./components/BackgroundGlows.tsx";
import NeonSign from "./components/NeonSign.tsx";
import { ColoredGlassCard, GlassCard } from "./components/GlassCard.tsx";
import CodeSnippet from "./components/CodeSnippet.tsx";

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
            className={`h-1.5 w-24 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}
        />
        <p
            className={`text-lg text-slate-400 leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {subtitle}
        </p>
    </div>
);

const LitArtShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"frontend" | "backend">(
        "frontend",
    );
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
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden'>
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

            {/* 1. HERO SECTION */}
            <header className='relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6'>
                <div className='container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='space-y-8'>
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]'>
                            <Sparkles size={14} className='text-yellow-400' />
                            <span>Full Stack Educational Platform</span>
                        </div>

                        <div>
                            <h1 className='text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1]'>
                                Lit
                                <span className='text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 animate-gradient'>
                                    Art
                                </span>
                            </h1>
                            <span className='block text-2xl md:text-3xl font-light text-slate-400 mt-2 tracking-wide'>
                                Literature and Art, but also, Art that's on
                                fire! <Flame />
                            </span>
                        </div>

                        <p className='text-xl text-slate-300 max-w-lg leading-relaxed border-l-4 border-indigo-500 pl-6'>
                            Interdisciplinarna platforma koja spaja{" "}
                            <strong className='text-white'>književnost</strong>{" "}
                            i{" "}
                            <strong className='text-white'>
                                povijest umjetnosti
                            </strong>{" "}
                            kroz interaktivno digitalno iskustvo.
                        </p>

                        <div className='flex flex-wrap gap-3'>
                            <TechBadge label='React 19' icon={<Code2 />} />
                            <TechBadge label='TypeScript' icon={<Code2 />} />
                            <TechBadge label='Docker' icon={<Container />} />
                            <TechBadge
                                label='Framer Motion'
                                icon={<MonitorPlay />}
                            />
                        </div>

                        <div className='flex flex-wrap gap-5 pt-4'>
                            <a
                                href='https://lit-art.netlify.app'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1'>
                                <Globe size={20} />
                                <span>Live Demo</span>
                            </a>
                            <a
                                href='https://github.com/marinamajden/bytes-of-art'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md'>
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Hero Visual Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='relative hidden lg:block'>
                        <ColoredGlassCard
                            variant='indigo'
                            className='p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500'>
                            <div className='relative aspect-video rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden group'>
                                <div className='absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors' />
                                <div className='text-center z-10 p-6'>
                                    <div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20'>
                                        <Video
                                            size={32}
                                            className='text-indigo-400'
                                        />
                                    </div>
                                    <p className='text-slate-300 font-medium'>
                                        Video Walkthrough
                                    </p>
                                    <p className='text-xs text-slate-500 mt-2'>
                                        Prikaz interakcije: Kviz, 3D, Mapa
                                    </p>
                                </div>
                            </div>
                        </ColoredGlassCard>
                    </motion.div>
                </div>
            </header>

            {/* 2. THE CHALLENGE & PEDAGOGY */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Pedagogija susreće Tehnologiju'
                        subtitle='Kao profesorica, primijetila sam problem: učenici teško povezuju apstraktne koncepte iz književnosti s vizualnom umjetnošću. LitArt je moj inženjerski odgovor na taj pedagoški izazov.'
                    />

                    <div className='grid md:grid-cols-3 gap-6'>
                        {[
                            {
                                icon: (
                                    <BrainCircuit
                                        size={32}
                                        className='text-cyan-400'
                                    />
                                ),
                                title: "Interdisciplinarnost",
                                desc: "Projekt je usklađen s državnim kurikulumom, povezujući ishode iz Hrvatskog jezika i Likovne umjetnosti.",
                                variant: "cyan",
                            },
                            {
                                icon: (
                                    <MonitorPlay
                                        size={32}
                                        className='text-purple-400'
                                    />
                                ),
                                title: "Gamifikacija",
                                desc: "Apstraktni pojmovi postaju opipljivi kroz interaktivne kvizove, 3D modele i istraživačke mape.",
                                variant: "purple",
                            },
                            {
                                icon: (
                                    <Layers
                                        size={32}
                                        className='text-indigo-400'
                                    />
                                ),
                                title: "Full-Cycle Razvoj",
                                desc: "Od ideje i dizajna sadržaja, preko pisanja koda, do konfiguracije servera i deploymenta.",
                                variant: "indigo",
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

            {/* 3. BEYOND CODE (Showcase Section) */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <ColoredGlassCard variant='purple' className='p-0'>
                        <div className='grid lg:grid-cols-2 gap-0'>
                            <div className='p-10 md:p-14 flex flex-col justify-center'>
                                <div className='inline-flex items-center gap-2 text-purple-400 font-bold tracking-widest text-xs uppercase mb-6 border-b border-purple-500/30 pb-2 w-fit'>
                                    <Feather size={14} /> Beyond Code
                                </div>
                                <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>
                                    Content & Methodology
                                </h2>
                                <div className='space-y-6 text-lg text-slate-300 leading-relaxed'>
                                    <p>
                                        Ovo je fantastičan primjer onoga što se
                                        u industriji zove{" "}
                                        <strong className='text-purple-300'>
                                            "Scrollytelling"
                                        </strong>
                                        . Nije riječ samo o pisanju koda, već o
                                        kreiranju narativa.
                                    </p>
                                    <p>
                                        To što sam samostalno pisala kod za
                                        tranzicije između lekcija pokazuje moju
                                        sposobnost manipulacije DOM-om i{" "}
                                        <em>stateom</em> aplikacije kako bih
                                        izazvala emocionalnu reakciju korisnika.
                                        To više nije samo "web stranica", to je
                                        cjelovito{" "}
                                        <strong>digitalno iskustvo</strong>.
                                    </p>
                                </div>
                            </div>

                            <div className='relative bg-slate-900/40 p-10 md:p-14 flex flex-col justify-center border-l border-white/5'>
                                <div className='relative z-10'>
                                    <ScrollText
                                        className='text-purple-400 mb-6'
                                        size={40}
                                    />
                                    <blockquote className='text-2xl font-light text-slate-200 leading-relaxed mb-8 italic'>
                                        "Kao autor sadržaja, provela sam
                                        istraživanje i strukturirala kompleksne
                                        povijesne podatke u probavljive
                                        digitalne formate (JSON), pazeći na
                                        točnost informacija i pedagošku
                                        vrijednost."
                                    </blockquote>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-full bg-linear-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg'>
                                            M
                                        </div>
                                        <div>
                                            <div className='font-bold text-white'>
                                                Marina Majden
                                            </div>
                                            <div className='text-sm text-slate-400 font-mono'>
                                                Creator & Developer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ColoredGlassCard>
                </div>
            </section>

            {/* 4. TECHNICAL DEEP DIVE */}
            <section className='py-24 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Ispod Haube'
                        subtitle='LitArt nije samo lijepo sučelje. To je složena React aplikacija s naprednim upravljanjem stanjem, optimiziranim performansama i custom API arhitekturom.'
                        align='center'
                    />

                    <div className='flex justify-center gap-4 mb-16'>
                        {["frontend", "backend"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() =>
                                    setActiveTab(tab as "frontend" | "backend")
                                }
                                className={`px-8 py-3 rounded-full font-bold transition-all border relative overflow-hidden ${
                                    activeTab === tab
                                        ? "text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                        : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}>
                                {activeTab === tab && (
                                    <div className='absolute inset-0 bg-indigo-600 opacity-100 z-[-1]' />
                                )}
                                {tab === "frontend"
                                    ? "Frontend & State"
                                    : "Data & API"}
                            </button>
                        ))}
                    </div>

                    <div className='grid lg:grid-cols-2 gap-12 items-start'>
                        <AnimatePresence mode='wait'>
                            {activeTab === "frontend" ? (
                                <motion.div
                                    key='frontend-desc'
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className='space-y-8'>
                                    <ColoredGlassCard
                                        variant='indigo'
                                        className='h-full p-10!'>
                                        <div className='inline-flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-4 border border-indigo-500/30 px-3 py-1 rounded-full bg-indigo-500/10'>
                                            <ToggleLeft size={14} />
                                            <span>Zeitgeist Feature</span>
                                        </div>
                                        <h3 className='text-3xl font-bold text-white mb-6'>
                                            Dvojni Grad: Interaktivni prikaz
                                            duha vremena
                                        </h3>

                                        <div className='space-y-8 text-slate-300'>
                                            <div>
                                                <h4 className='text-white font-semibold mb-2 flex items-center gap-2'>
                                                    <Sparkles
                                                        size={16}
                                                        className='text-yellow-500'
                                                    />{" "}
                                                    Koncept
                                                </h4>
                                                <p className='text-slate-400 leading-relaxed'>
                                                    Interaktivni modul mape koji
                                                    demonstrira prijelaz iz
                                                    impresionizma u
                                                    ekspresionizam. Ključna
                                                    funkcionalnost je promjena
                                                    cjelokupnog stanja
                                                    aplikacije.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className='text-white font-semibold mb-2 flex items-center gap-2'>
                                                    <MonitorPlay
                                                        size={16}
                                                        className='text-pink-500'
                                                    />{" "}
                                                    Korisničko iskustvo
                                                </h4>
                                                <p className='text-slate-400 leading-relaxed'>
                                                    Korisnik istražuje mapu
                                                    grada u{" "}
                                                    <strong>
                                                        "Impresionističkom modu"
                                                    </strong>
                                                    . Jednim klikom na{" "}
                                                    <em>
                                                        "Doživi grad drugačije"
                                                    </em>
                                                    , aplikacija mijenja temu u{" "}
                                                    <strong>
                                                        "Ekspresionistički mod"
                                                    </strong>{" "}
                                                    (crven, energičan, turoban).
                                                </p>
                                            </div>

                                            <div className='bg-slate-950/30 p-6 rounded-xl border border-white/5'>
                                                <h4 className='text-white font-semibold mb-4 flex items-center gap-2'>
                                                    <Zap
                                                        size={16}
                                                        className='text-emerald-500'
                                                    />{" "}
                                                    Tehnička izvedba
                                                </h4>
                                                <ul className='space-y-3 text-sm'>
                                                    <li className='flex gap-3'>
                                                        <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shadow-[0_0_5px_indigo]' />
                                                        <span>
                                                            <strong>
                                                                State
                                                                Management:
                                                            </strong>{" "}
                                                            React Context API
                                                            (`ArtThemeContext`)
                                                            za sinkroniziranu
                                                            promjenu teme.
                                                        </span>
                                                    </li>
                                                    <li className='flex gap-3'>
                                                        <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shadow-[0_0_5px_indigo]' />
                                                        <span>
                                                            <strong>
                                                                Dinamičko
                                                                stiliziranje:
                                                            </strong>{" "}
                                                            Conditional
                                                            rendering i CSS
                                                            varijable za
                                                            trenutni swap palete
                                                            boja.
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ColoredGlassCard>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key='backend-desc'
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}>
                                    <ColoredGlassCard
                                        variant='cyan'
                                        className='h-full p-10!'>
                                        <div className='inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10'>
                                            <Database size={14} />
                                            <span>The Symbols Module</span>
                                        </div>
                                        <h3 className='text-3xl font-bold text-white mb-6'>
                                            Arhitektura podataka i API
                                        </h3>
                                        <p className='text-slate-400 leading-relaxed mb-8'>
                                            Lekcija o simbolima zahtijevala je
                                            specifične kulturne podatke koji ne
                                            postoje u javnim API-jima. Kreirala
                                            sam hibridni sustav.
                                        </p>

                                        <div className='space-y-4'>
                                            {[
                                                {
                                                    title: "Custom Data Structures",
                                                    desc: "TypeScript sučelja koja strogo definiraju oblik podataka za kulturne interpretacije.",
                                                },
                                                {
                                                    title: "Data Aggregation",
                                                    desc: "Frontend asinkrono spaja podatke iz WikiArt API-ja s mojim custom JSON podacima.",
                                                },
                                                {
                                                    title: "Performance",
                                                    desc: "Optimizirani fetch pozivi i memoizacija teških kalkulacija za analizu simbola.",
                                                },
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className='flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                                                    <div className='w-1 h-full bg-cyan-500/50 rounded-full shadow-[0_0_5px_cyan]' />
                                                    <div>
                                                        <strong className='block text-slate-200 mb-1'>
                                                            {item.title}
                                                        </strong>
                                                        <span className='text-sm text-slate-500'>
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ColoredGlassCard>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RIGHT: Content (Code or Media) */}
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={
                                    activeTab === "frontend"
                                        ? "frontend-code"
                                        : "backend-code"
                                }
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.1 }}
                                className='space-y-6'>
                                {activeTab === "frontend" ? (
                                    <>
                                        <div className='relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl'>
                                            <div className='absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10 pointer-events-none' />
                                            <div className='aspect-video bg-slate-900 flex items-center justify-center'>
                                                <div className='text-center text-slate-500'>
                                                    <Video
                                                        size={48}
                                                        className='mx-auto mb-2 opacity-50'
                                                    />
                                                    <span className='text-sm uppercase tracking-widest'>
                                                        Video: Impressionism to
                                                        Expressionism
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <CodeSnippet
                                            title='ArtThemeContext.tsx'
                                            language='typescript'
                                            code={`
export const ArtThemeContext = createContext<ArtThemeContextType | undefined>(undefined);

export function ArtThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ArtTheme>('impressionism');

  // Toggle logika koja mijenja "Zeitgeist" aplikacije
  const toggleTheme = () => {
    setCurrentTheme(prev => 
      prev === 'impressionism' ? 'expressionism' : 'impressionism'
    );
  };

  return (
    <ArtThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {/* Dynamic theme data attribute */}
      <div data-theme={currentTheme} className="transition-colors duration-700">
        {children}
      </div>
    </ArtThemeContext.Provider>
  );
}`}
                                        />
                                    </>
                                ) : (
                                    <CodeSnippet
                                        title='symbolsData.ts'
                                        language='typescript'
                                        code={`
// Hibridna struktura podataka

// 1. Podaci iz mog Custom API-ja (Kulturni kontekst)
interface CulturalContext {
  era: 'Renaissance' | 'Modernism' | 'Romanticism';
  interpretation: string;
  culturalShift: string; 
}

// 2. Podaci koji dolaze iz 3rd Party API-ja (WikiArt)
interface ExternalMedia {
  sourceUrl: string;
  artist: string;
  apiProvider: 'WikiArt' | 'OpenLibrary';
}

// 3. Spojeni model koji frontend koristi
export interface SymbolData {
  id: string;
  symbolName: string; // npr. "Ogledalo"
  context: CulturalContext[]; 
  examples: ExternalMedia[];
  
  getEvolutionSummary(): string;
}`}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 5. DEPLOYMENT STATS (Bento Grid) */}
            <section className='py-20 relative z-10'>
                <div className='container mx-auto px-6'>
                    <SectionHeading
                        title='Od Koda do Clouda'
                        subtitle='Nisam stala samo na kodu. LitArt je u potpunosti moj proizvod.'
                        align='center'
                    />

                    <div className='grid lg:grid-cols-3 gap-6'>
                        {/* Main Big Card */}
                        <ColoredGlassCard
                            variant='indigo'
                            className='lg:col-span-2 p-0! flex flex-col md:flex-row group'>
                            <div className='p-10 flex-1 space-y-6'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <div className='p-2 bg-indigo-500/20 rounded-lg text-indigo-300'>
                                        <Server size={20} />
                                    </div>
                                    <h4 className='text-xl font-bold text-white'>
                                        Hosting & DevOps
                                    </h4>
                                </div>
                                <p className='text-slate-400'>
                                    Samostalna konfiguracija hostinga i domene.
                                    Postavljanje HTTPS/SSL certifikata.
                                </p>

                                <div className='pt-4 border-t border-white/5'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <div className='p-2 bg-purple-500/20 rounded-lg text-purple-300'>
                                            <Container size={20} />
                                        </div>
                                        <h4 className='text-xl font-bold text-white'>
                                            Dockerizacija
                                        </h4>
                                    </div>
                                    <p className='text-slate-400'>
                                        Kreiranje Dockerfile-a za konzistentnost
                                        okruženja.
                                    </p>
                                </div>
                            </div>
                            <div className='bg-linear-to-br from-indigo-900/50 to-purple-900/50 p-10 flex items-center justify-center border-l border-white/5'>
                                <Server
                                    size={120}
                                    className='text-white/10 group-hover:text-white/30 transition-colors duration-500 transform group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                />
                            </div>
                        </ColoredGlassCard>

                        {/* Stats Card */}
                        <ColoredGlassCard
                            variant='cyan'
                            className='lg:col-span-1 flex flex-col justify-center text-center'>
                            <h4 className='font-mono text-xs text-cyan-400 mb-4 uppercase tracking-widest'>
                                Solo Development
                            </h4>
                            <div className='text-6xl font-extrabold text-white mb-2 tracking-tight'>
                                100%
                            </div>
                            <div className='text-slate-500 text-sm mb-8'>
                                Ownership
                            </div>

                            <div className='w-full space-y-4'>
                                <div>
                                    <div className='flex justify-between text-xs text-slate-300 mb-1'>
                                        <span>Lighthouse Score</span>
                                        <span className='text-green-400'>
                                            98/100
                                        </span>
                                    </div>
                                    <div className='w-full bg-slate-900 h-1.5 rounded-full overflow-hidden'>
                                        <div className='bg-green-500 h-full w-[98%] shadow-[0_0_10px_rgba(34,197,94,0.5)]' />
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between text-xs text-slate-300 mb-1'>
                                        <span>Accessibility (WCAG)</span>
                                        <span className='text-green-400'>
                                            100/100
                                        </span>
                                    </div>
                                    <div className='w-full bg-slate-900 h-1.5 rounded-full overflow-hidden'>
                                        <div className='bg-green-500 h-full w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]' />
                                    </div>
                                </div>
                            </div>
                        </ColoredGlassCard>
                    </div>
                </div>
            </section>

            {/* 6. FOOTER CTA */}
            <footer className='py-24 relative z-10 text-center border-t border-white/5'>
                <div className='container mx-auto px-6'>
                    <h2 className='text-4xl font-bold text-white mb-6'>
                        Spremno za Istraživanje?
                    </h2>
                    <p className='text-xl text-slate-400 mb-10 max-w-2xl mx-auto'>
                        LitArt je dokaz da se složena inženjerska rješenja mogu
                        koristiti za kreiranje lijepih, edukativnih priča.
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-4'>
                        <a
                            href='https://lit-art.netlify.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1'>
                            <ExternalLink size={20} />
                            Isprobaj Aplikaciju
                        </a>
                        <a
                            href='https://github.com/marinamajden/bytes-of-art'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent text-white border border-white/20 font-bold text-lg hover:bg-white/5 transition-all backdrop-blur-sm'>
                            <Github size={20} />
                            GitHub Repozitorij
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LitArtShowcase;
