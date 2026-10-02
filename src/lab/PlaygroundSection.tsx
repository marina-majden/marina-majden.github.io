import React, { useState } from "react";
import { Reorder } from "framer-motion";
import {
    PaintBucket,
    Palette,
    ChevronDown,
    Type,
    LayoutTemplate,
    Image as ImageIcon,
    MousePointer2,
    GripVertical,
} from "lucide-react";
import { themes, fonts, radiuses, heroLayouts } from "../data/lab.js";
import UIWidgets from "./UIWidgets.tsx";

const PlaygroundSection = () => {
    const [currentTheme, setCurrentTheme] = useState("mediteran");
    const [currentFont, setCurrentFont] = useState("sans");
    const [currentRadius, setCurrentRadius] = useState("smooth");
    const [currentHeroLayout, setCurrentHeroLayout] = useState("creative");
    const [items, setItems] = useState(["hero", "grid", "stats"]);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(
        "theme",
    );

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <section
            id='playground'
            className='py-24 px-6 md:px-12 bg-slate-950 relative overflow-hidden border-t border-slate-800'>
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12'>
                {/* LEFT: CONTROLS (Accordion) */}
                <div className='lg:w-1/3 space-y-4'>
                    <div>
                        <h2 className='text-3xl font-bold text-white mb-4 flex items-center gap-3'>
                            <PaintBucket className='text-orange-400' />
                            UI Laboratorij
                        </h2>
                        <p className='text-slate-400 text-sm leading-relaxed mb-8'>
                            Dizajn nije važan samo radi prvog dojma; on prenosi
                            vašu poruku i pripovijeda vizualnim elementima.
                            Iskušajte kako male promjene u tipografiji, boji i
                            rasporedu drastično mjenjaju karakter brenda.
                            <br />
                            <br />
                            <span className='text-cyan-400'>
                                Možete reorganizirati stranicu jednostavnim
                                povlačenjem komponenti.
                            </span>
                        </p>
                    </div>

                    {/* 1. Theme / Palette */}
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
                                ostaviti...
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

                    {/* 2. Typography */}
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
                                Odabir fonta je 'govor tijela' vašeg teksta...
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

                    {/* 3. Radius */}
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

                    {/* 4. Hero Style */}
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

                {/* RIGHT: INTERACTIVE CANVAS */}
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
    );
};

export default PlaygroundSection;
