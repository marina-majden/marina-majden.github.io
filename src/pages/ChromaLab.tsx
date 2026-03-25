import React, { useState } from "react";

const VIBES = [
    { id: "cyber", hue: 280, label: "Cyber" },
    { id: "ethereal", hue: 160, label: "Ethereal" },
    { id: "inferno", hue: 35, label: "Inferno" },
];

export default function ChromaLab() {
    const [activeHue, setActiveHue] = useState(280);

    return (
        <>
            {/* Injecting the complex CSS. In a real project, 
        this would live in a standard .css or .module.css file. 
      */}
            <style>{`
        @property --base-hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 280;
        }

        .chroma-wrapper {
          --color-1: oklch(0.65 0.25 var(--base-hue));
          --color-2: oklch(0.65 0.25 calc(var(--base-hue) + 120));
          --color-3: oklch(0.65 0.25 calc(var(--base-hue) + 240));
          --ambient-glow: oklch(from var(--color-1) 0.15 0.05 h);
          background: radial-gradient(
            circle at center,
            var(--ambient-glow) 0%,
            #050505 100%
          );
          transition: --base-hue 1s ease;
        }

        .orb-1 { background: var(--color-1); animation: orbit 12s ease-in-out infinite alternate; }
        .orb-2 { background: var(--color-2); animation: orbit 16s ease-in-out infinite alternate-reverse; }
        .orb-3 { background: var(--color-3); animation: orbit 20s linear infinite; }

        @keyframes orbit {
          0% { transform: translate(calc(sin(0deg) * 20vw), calc(cos(0deg) * 20vh)) scale(1); }
          33% { transform: translate(calc(sin(120deg) * 25vw), calc(cos(120deg) * 15vh)) scale(1.5); }
          66% { transform: translate(calc(sin(240deg) * 15vw), calc(cos(240deg) * 25vh)) scale(0.8); }
          100% { transform: translate(calc(sin(360deg) * 20vw), calc(cos(360deg) * 20vh)) scale(1); }
        }

        .glass-prism {
          background: oklch(from var(--color-1) 0.2 0.02 h / 0.15);
          border: 1px solid oklch(from var(--color-1) 0.9 0.05 h / 0.3);
          border-bottom-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 30px 60px color-mix(in oklab, var(--color-1) 20%, black);
        }

        .glass-prism:hover {
          border-color: oklch(from var(--color-1) 0.95 0.1 h / 0.6);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--color-1), var(--color-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .badge-dynamic {
          background: oklch(from var(--color-1) 0.8 0.1 h / 0.2);
          color: oklch(from var(--color-1) 0.95 0.05 h);
          border: 1px solid oklch(from var(--color-1) 0.8 0.1 h / 0.5);
        }
      `}</style>

            <main
                className='chroma-wrapper relative grid min-h-screen place-items-center overflow-hidden bg-[#050505] font-sans text-white'
                style={{ "--base-hue": activeHue } as React.CSSProperties}>
                {/* Mesh Effect */}
                <div className='absolute inset-0 z-0 h-screen w-screen opacity-80 blur-[80px]'>
                    <div className='orb-1 absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen'></div>
                    <div className='orb-2 absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen'></div>
                    <div className='orb-3 absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen'></div>
                </div>

                {/* Glass Prism */}
                <article className='glass-prism relative z-10 w-[400px] rounded-3xl p-12 backdrop-blur-[20px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2.5 hover:scale-105'>
                    <div className='flex flex-col items-start'>
                        <div className='badge-dynamic mb-2 inline-block rounded-full px-3 py-1 text-xs uppercase tracking-[2px]'>
                            CodePen
                        </div>

                        <h1 className='text-gradient mb-6 mt-2 text-5xl font-bold leading-tight tracking-tight'>
                            Chroma Lab
                        </h1>

                        <p className='text-gray-300'>
                            Interact with the controls below to mathematically
                            shift the OKLCH color space.
                        </p>

                        {/* Controls */}
                        <div className='mt-12 flex w-full justify-center gap-6'>
                            {VIBES.map((vibe) => {
                                const isActive = activeHue === vibe.hue;
                                return (
                                    <button
                                        key={vibe.id}
                                        onClick={() => setActiveHue(vibe.hue)}
                                        className={`group relative h-6 w-6 rounded-full border-2 transition-all duration-300 hover:scale-125 hover:border-white ${
                                            isActive
                                                ? "border-white bg-white shadow-[0_0_15px_white]"
                                                : "border-white/20 bg-transparent"
                                        }`}
                                        aria-label={`Switch to ${vibe.label} vibe`}>
                                        <span className='absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                            {vibe.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}
