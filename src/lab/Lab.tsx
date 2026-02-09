import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    Reorder,
} from "framer-motion";
import {
    Code2,
    ArrowDown,
    Heart,
    Terminal,
    Cpu,
    Layers,
    Github,
    GripVertical,
    PaintBucket,
    Type,
    LayoutTemplate,
    MousePointer2,
    Image as ImageIcon,
    ChevronDown,
    ArrowRight,
    Palette,
    FlaskConical,
} from "lucide-react";
import { themes, fonts, radiuses, heroLayouts } from "../data/lab.js";
import { CloudPlaceholder, GoldParticle } from "./Background.tsx";
import UIWidgets from "./UIWidgets.tsx";
import MegaProjectCard from "./MegaProjectCard.tsx";
import WorkflowSection from "./WorkflowSection.tsx";
import TasteTestSection from "./TasteTestSection.tsx";

// FIX: BOJE ZA PALETE
// TODO: prebaciti split view u home?
// TODO: zamijeniti oblake slikom

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
            <h1 className='text-5xl md:text-7xl font-bold text-white text-center pt-24 mb-12 flex items-center justify-center gap-4'>
                <FlaskConical
                    className='text-dynamic-cyan animate-neon-glow'
                    size={68}
                />
                <span className='text-gradient'>Laboratorij</span>
            </h1>
            <h2 className='text-center text-slate-400 max-w-4xl mx-auto mb-20 px-6 text-lg leading-relaxed'>
                Oslobodite maštu i poigrajte se s dizajnom u mom malom
                laboratoriju dizajna i razvoja. <br /> Pogledajte što se krije
                iza lijepih elemenata koji čine naša sučelja, prilagodite
                komponente prema vlastitim željama i otkrijte moć vizualnog
                pripovijedanja kroz dizajn!
            </h2>
            {/* ================= X-RAY SHOWCASE ================= */}
            <section
                id='xray'
                className='relative py-24 px-6 md:px-12 bg-slate-900 overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent'></div>

                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4'>
                            <Layers className='text-rose-400' size={40} />
                            <span className='bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400'>
                                Ispod haube
                            </span>
                        </h2>
                        <p className='text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed'>
                            Ispod svakog elegantnog sučelja nižu se redovi
                            kompleksne logike! Skenirajte sustav da vidite{" "}
                            <span className='text-cyan-400 font-mono'>
                                pravi kod
                            </span>{" "}
                            koji pokreće ove stranice.
                        </p>
                    </div>

                    <MegaProjectCard />

                    <div className='mt-16 text-center'>
                        <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-sky-600 text-slate-300 text-sm font-mono'>
                            <span className='inline-flex items-center gap-2 glass rounded-full px-1 py-1 text-dynamic-cyan tracking-[0.3em] loader-pulse'></span>

                            <span>
                                Sustav radi optimalno • Render time: &lt;16ms
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= UI LABORATORIJ (PLAYGROUND) ================= */}
            <section
                id='playground'
                className='py-24 px-6 md:px-12 bg-slate-950 relative overflow-hidden border-t border-slate-800'>
                <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12'>
                    {/* LIJEVO: KONTROLE (Accordion stil) */}
                    <div className='lg:w-1/3 space-y-4'>
                        <div>
                            <h2 className='text-3xl font-bold text-white mb-4 flex items-center gap-3'>
                                <PaintBucket className='text-orange-400' />
                                UI Laboratorij
                            </h2>
                            <p className='text-slate-400 text-sm leading-relaxed mb-8'>
                                Dizajn nije važan samo radi prvog dojma; on
                                prenosi vašu poruku i pripovijeda vizualnim
                                elementima. Iskušajte kako male promjene u
                                tipografiji, boji i rasporedu drastično
                                mijenjaju karakter brenda.
                                <br />
                                <br />
                                <span className='text-cyan-400'>
                                    Možete reorganizirati stranicu jednostavnim
                                    povlačenjem komponenti.
                                </span>
                            </p>
                        </div>

                        {/* HARMONIKA SEKCIJE */}

                        {/* 1. Tema / Atmosfera */}
                        <details
                            open={activeAccordion === "theme"}
                            className='border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden group'>
                            <summary
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleAccordion("theme");
                                }}
                                className='flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors'>
                                <label className='text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:text-slate-300 transition-colors'>
                                    <Palette size={14} /> Paleta
                                </label>

                                <ChevronDown
                                    size={16}
                                    className={`text-slate-500 transition-transform duration-300 ${
                                        activeAccordion === "theme"
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </summary>
                            <div className='p-4 pt-0 border-t border-slate-800/50 mt-2'>
                                <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                                    Boje značajno utječu na dojam koji želite
                                    ostaviti. Tamna paleta djeluje misteriozno,
                                    vole ju luksuzni brendovi kao i
                                    kreativci,dok svijetle boje mogu djelovati i
                                    strogo profesionalno kao i pristupačno i
                                    prijateljski.
                                </p>
                                <div className='grid grid-cols-3 gap-2'>
                                    {Object.entries(themes).map(([key, t]) => (
                                        <button
                                            key={key}
                                            onClick={() => setCurrentTheme(key)}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                                currentTheme === key
                                                    ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                                                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                                            }`}>
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </details>

                        {/* 2. Tipografija */}
                        <details
                            open={activeAccordion === "typography"}
                            className='border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden group'>
                            <summary
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleAccordion("typography");
                                }}
                                className='flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors'>
                                <label className='text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:text-slate-300 transition-colors'>
                                    <Type size={14} /> Tipografija
                                </label>
                                <ChevronDown
                                    size={16}
                                    className={`text-slate-500 transition-transform duration-300 ${
                                        activeAccordion === "typography"
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </summary>
                            <div className='p-4 pt-0 border-t border-slate-800/50 mt-2'>
                                <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                                    Odabir fonta je 'govor tijela' vašeg teksta.
                                    Serifni fontovi (s "kukicama") djeluju
                                    otmjeno i tradicionalni, sans-serif izbor su
                                    modernog doba i minimalističkog trenda, a
                                    mono fontovi vezuju se uz tehnički i
                                    informatički jezik te početke tipografije.
                                </p>
                                <div className='flex gap-2'>
                                    {Object.keys(fonts).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setCurrentFont(f)}
                                            className={`flex-1 p-2 rounded-lg border text-xs capitalize transition-all ${
                                                currentFont === f
                                                    ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                                                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                                            }`}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </details>

                        {/* 3. Zaobljenost */}
                        <details
                            open={activeAccordion === "radius"}
                            className='border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden group'>
                            <summary
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleAccordion("radius");
                                }}
                                className='flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors'>
                                <label className='text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:text-slate-300 transition-colors'>
                                    <LayoutTemplate size={14} /> Zaobljenost
                                </label>
                                <ChevronDown
                                    size={16}
                                    className={`text-slate-500 transition-transform duration-300 ${
                                        activeAccordion === "radius"
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </summary>
                            <div className='p-4 pt-0 border-t border-slate-800/50 mt-2'>
                                <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                                    Geometrija definira karakter. Oštri rubovi
                                    (Sharp) komuniciraju strogost, snagu,
                                    profesionalnost i eleganciju, a zaobljeni
                                    (Smooth/Full) djeluju prijateljski, organski
                                    i pristupačnije, i posebno su dragi mlađoj
                                    publici.
                                </p>
                                <div className='flex gap-2'>
                                    {Object.keys(radiuses).map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setCurrentRadius(r)}
                                            className={`flex-1 p-2 rounded-lg border text-xs capitalize transition-all ${
                                                currentRadius === r
                                                    ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                                                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                                            }`}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </details>

                        {/* 4. Hero Stil */}
                        <details
                            open={activeAccordion === "hero"}
                            className='border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden group'>
                            <summary
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleAccordion("hero");
                                }}
                                className='flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors'>
                                <label className='text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:text-slate-300 transition-colors'>
                                    <ImageIcon size={14} /> Hero Stil
                                </label>
                                <ChevronDown
                                    size={16}
                                    className={`text-slate-500 transition-transform duration-300 ${
                                        activeAccordion === "hero"
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </summary>
                            <div className='p-4 pt-0 border-t border-slate-800/50 mt-2'>
                                <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                                    Raspored i omjeri elemenata omogućuju
                                    naglašavanje najvažnijih informacija. Slika
                                    u pozadini daje volumen i dubinu,
                                    podijeljeni ekran balansira informacije, a
                                    asimetrični i nejednaki oblici čine cijeli
                                    dizajn dinamičnijim te potiču aktivni
                                    angažman gledatelja.
                                </p>
                                <div className='flex gap-2'>
                                    {Object.entries(heroLayouts).map(
                                        ([key, label]) => (
                                            <button
                                                key={key}
                                                onClick={() =>
                                                    setCurrentHeroLayout(key)
                                                }
                                                className={`flex-1 p-2 rounded-lg border text-xs transition-all ${
                                                    currentHeroLayout === key
                                                        ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                                                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                                                }`}>
                                                {label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                        </details>

                        <div className='pt-6 border-t border-slate-800 mt-4'>
                            <div className='flex items-center gap-3 text-slate-500 text-xs font-mono'>
                                <MousePointer2
                                    size={16}
                                    className='animate-bounce text-cyan-400'
                                />
                                Probaj zamijeniti redoslijed elemenata desno!
                            </div>
                        </div>
                    </div>

                    {/* DESNO: INTERAKTIVNI CANVAS */}
                    <div className='lg:w-2/3'>
                        <div
                            className={`w-full h-full min-h-[500px] rounded-2xl p-8 transition-colors duration-500 border-2 border-dashed border-slate-700/50 ${
                                themes[currentTheme as keyof typeof themes].bg
                            } relative`}>
                            {/* Mock Browser Header */}
                            <div className='absolute top-0 left-0 right-0 h-8 bg-slate-900/10 rounded-t-xl flex items-center px-4 gap-2'>
                                <div className='w-3 h-3 rounded-full bg-red-400/80'></div>
                                <div className='w-3 h-3 rounded-full bg-yellow-400/80'></div>
                                <div className='w-3 h-3 rounded-full bg-green-400/80'></div>
                            </div>

                            <div className='mt-6'>
                                <Reorder.Group
                                    axis='y'
                                    values={items}
                                    onReorder={setItems}
                                    className='space-y-4'>
                                    {items.map((item) => (
                                        <Reorder.Item
                                            key={item}
                                            value={item}
                                            className='relative group cursor-grab active:cursor-grabbing'>
                                            {/* Drag Handle - vidljiv na hover */}
                                            <div className='absolute -left-8 top-1/2 -translate-y-1/2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity p-2'>
                                                <GripVertical size={20} />
                                            </div>

                                            <UIWidgets
                                                item={item}
                                                theme={
                                                    themes[
                                                        currentTheme as keyof typeof themes
                                                    ]
                                                }
                                                font={
                                                    fonts[
                                                        currentFont as keyof typeof fonts
                                                    ]
                                                }
                                                radius={
                                                    radiuses[
                                                        currentRadius as keyof typeof radiuses
                                                    ]
                                                }
                                                heroLayout={currentHeroLayout}
                                            />
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TasteTestSection />

            <WorkflowSection />
        </div>
    );
};

export default Lab;
