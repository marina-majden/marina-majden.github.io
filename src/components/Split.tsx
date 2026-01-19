import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Terminal, Code, EyeOff } from "lucide-react";
import AbstractUI from "./AbstractUI";
import HeroCode from "./HeroCode";

const Split = () => {
    const [showMobileCode, setShowMobileCode] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const x = clientX / innerWidth; // 0 to 1
        const y = clientY / innerHeight; // 0 to 1
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <>
            <style>{`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 8s linear infinite; }
      `}</style>

            {/* ================= HERO VISUALS (SPLIT SCREEN) ================= */}
            <div
                className='relative w-full h-[80vh] overflow-hidden flex flex-col md:flex-row border-b border-slate-800'
                onMouseMove={handleMouseMove}>
                {/* LIJEVA STRANA: KREATIVNOST & UI */}
                <div className='relative flex-1 h-full overflow-hidden  text-slate-100 flex flex-col justify-center px-8 md:px-20 w-full'>
                    <AbstractUI />
                </div>

                {/* GUMB ZA MOBILNI PRIKAZ */}
                <div className='absolute top-4 right-4 z-50 md:hidden'>
                    <button
                        onClick={() => setShowMobileCode(!showMobileCode)}
                        className='px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-2 hover:bg-white/20 transition-all'>
                        {showMobileCode ? (
                            <>
                                <EyeOff size={14} className='text-cyan-400' />{" "}
                                Natrag na Dizajn
                            </>
                        ) : (
                            <>
                                <Code size={14} className='text-rose-400' />{" "}
                                Zaviri Ispod!
                            </>
                        )}
                    </button>
                </div>

                {/* RAZDJELNIK (LIGHTSABER) */}
                <div className='hidden md:flex absolute left-1/2 top-0 bottom-0 w-24 -ml-12 z-30 flex-col items-center justify-center pointer-events-none'>
                    <motion.div
                        style={{
                            rotate: useTransform(mouseX, [0, 1], [-10, 10]),
                        }}
                        className='relative h-[90%] flex flex-col items-center justify-center pointer-events-auto group'>
                        <div className='w-1.5 h-full bg-cyan-400 rounded-t-full shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover:shadow-[0_0_25px_rgba(34,211,238,1)] transition-shadow duration-300'></div>
                        <div className='py-2 z-10'>
                            <div className='w-4 h-12 bg-slate-300 rounded-md border border-slate-400 shadow-xl flex flex-col gap-1 items-center justify-center relative overflow-hidden'>
                                <div className='absolute inset-0 bg-linear-to-r from-slate-400 via-slate-100 to-slate-400 opacity-50'></div>
                                <div className='w-full h-px bg-slate-500 z-10'></div>
                                <div className='w-full h-px bg-slate-500 z-10'></div>
                                <div className='w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red] animate-pulse z-10'></div>
                            </div>
                        </div>
                        <div className='w-1.5 h-full bg-cyan-400 rounded-b-full shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover:shadow-[0_0_25px_rgba(34,211,238,1)] transition-shadow duration-300'></div>
                    </motion.div>
                </div>

                {/* DESNA STRANA: KOD & LOGIKA */}
                <motion.div
                    className={`
            relative flex-1 h-full overflow-hidden text-slate-100 items-center justify-center border-l border-slate-800/50
            md:flex md:static md:w-auto md:h-full
            ${showMobileCode ? "absolute inset-0 z-40 flex w-full" : "hidden"}
          `}
                    initial={false}
                    animate={{ opacity: showMobileCode ? 1 : 1 }}>
                    <div className='absolute inset-0 bg-grid-pattern opacity-20'></div>

                    <div className='w-full max-w-lg p-8 relative z-10 scale-90 md:scale-100'>
                        <div className='absolute -top-12 left-0 text-slate-500 font-mono text-xs flex items-center gap-2 opacity-50'>
                            <Terminal size={14} /> executing_vision.tsx
                        </div>
                        <HeroCode />

                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className='w-2 h-4 bg-cyan-400 mt-1 inline-block'
                        />
                    </div>

                    <div className='absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none'></div>
                </motion.div>
            </div>
        </>
    );
};

export default Split;
