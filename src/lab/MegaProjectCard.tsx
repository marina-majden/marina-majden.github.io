import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Cpu,
    ScanLine,
    Activity,
    Database,
    Share2,
    Lock,
    Image,
} from "lucide-react";
import { COMPLEX_CODE_SNIPPET } from "../data/lab.js";

// TODO: unesi hrvatsko nazivlje

// --- MEGA PROJECT CARD ---
const MegaProjectCard = () => {
    const [isXRayMode, setIsXRayMode] = useState(false);
    const [metrics, setMetrics] = useState([45, 60, 30, 80, 55, 90, 40]);
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics((prev) =>
                prev.map((n) =>
                    Math.max(10, Math.min(100, n + (Math.random() * 20 - 10)))
                )
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='relative group perspective-1000 w-full max-w-5xl mx-auto h-[600px]'>
            <div className='relative h-full w-full bg-[#0B1120] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl transition-all duration-500 hover:shadow-cyan-500/10'>
                <div className='absolute top-0 left-0 right-0 p-6 z-30 flex justify-between items-center bg-slate-900/90 border-b border-slate-800 backdrop-blur-md'>
                    <div className='flex items-center gap-4'>
                        <div className='w-3 h-3 rounded-full bg-red-500'></div>
                        <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                        <div className='w-3 h-3 rounded-full bg-green-500'></div>
                        <div className='h-6 w-px bg-slate-700 mx-2'></div>
                        <div>
                            <h3 className='text-xl font-bold text-white tracking-tight'>
                                Neuralni Dashboard Core
                            </h3>
                            <span className='text-xs font-mono text-cyan-400'>
                                v2.4.0 • Active Cluster
                            </span>
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <span className='text-xs text-slate-500 font-mono hidden md:block'>
                            Memory: 432MB / 1024MB
                        </span>
                        <button
                            onClick={() => setIsXRayMode(!isXRayMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isXRayMode
                                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    : "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            }`}>
                            <ScanLine size={16} />
                            {isXRayMode ? "X-RAY: OFF" : "X-RAY: ON"}
                        </button>
                    </div>
                </div>

                <div className='absolute inset-0 bg-[#0d1117] pt-24 px-8 pb-8 font-mono text-sm text-slate-300 overflow-hidden flex flex-col z-10'>
                    <div className='flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2'>
                        <Terminal size={16} />
                        <span>VisualizationEngine.tsx</span>
                        <span className='ml-auto text-xs bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800'>
                            TypeScript Strict
                        </span>
                    </div>
                    <div className='relative flex-1 overflow-hidden'>
                        <div className='absolute left-0 top-0 bottom-0 w-8 text-slate-700 text-right pr-2 select-none leading-relaxed text-xs'>
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <pre className='pl-10 leading-relaxed text-xs md:text-sm text-blue-100 opacity-90 h-full overflow-y-auto'>
                            <code>{COMPLEX_CODE_SNIPPET}</code>
                        </pre>
                    </div>
                    <div className='mt-4 flex gap-3 text-xs font-mono text-slate-500'>
                        <div className='flex items-center gap-1'>
                            <Cpu size={12} /> Processing: 4ms
                        </div>
                        <div className='flex items-center gap-1'>
                            <Database size={12} /> Nodes: 1,402
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={false}
                    animate={{
                        opacity: isXRayMode ? 0.05 : 1,
                        filter: isXRayMode
                            ? "blur(4px) grayscale(100%)"
                            : "blur(0px) grayscale(0%)",
                        scale: isXRayMode ? 0.98 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0 pt-24 p-8 z-20 bg-linear-to-br from-slate-900 via-[#0B1120] to-[#0f172a] flex flex-col gap-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm relative overflow-hidden'>
                            <div className='absolute top-0 right-0 p-4 opacity-10'>
                                <Activity
                                    size={40}
                                    className='text-emerald-400'
                                />
                            </div>
                            <h4 className='text-slate-400 text-xs uppercase tracking-widest font-bold mb-2'>
                                System Load
                            </h4>
                            <div className='text-3xl font-mono text-white mb-2'>
                                42%
                            </div>
                            <div className='w-full bg-slate-700 h-1.5 rounded-full overflow-hidden'>
                                <motion.div
                                    className='h-full bg-emerald-500'
                                    animate={{ width: ["40%", "60%", "42%"] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                        </div>
                        <div className='bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm relative overflow-hidden'>
                            <div className='absolute top-0 right-0 p-4 opacity-10'>
                                <Share2 size={40} className='text-cyan-400' />
                            </div>
                            <h4 className='text-slate-400 text-xs uppercase tracking-widest font-bold mb-2'>
                                Active Connections
                            </h4>
                            <div className='text-3xl font-mono text-white mb-2'>
                                1,204
                            </div>
                            <div className='text-xs text-cyan-400 flex items-center gap-1'>
                                <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></span>{" "}
                                Live
                            </div>
                        </div>
                        <div className='bg-slate-800/50 rounded-xl p-5 border border-slate-700 backdrop-blur-sm relative overflow-hidden'>
                            <div className='absolute top-0 right-0 p-4 opacity-10'>
                                <Lock size={40} className='text-rose-400' />
                            </div>
                            <h4 className='text-slate-400 text-xs uppercase tracking-widest font-bold mb-2'>
                                Security Status
                            </h4>
                            <div className='text-3xl font-mono text-white mb-2'>
                                SECURE
                            </div>
                            <div className='text-xs text-slate-500'>
                                Encryption: AES-256
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 bg-slate-800/30 rounded-xl border border-slate-700/50 p-6 relative flex items-end gap-2 overflow-hidden'>
                        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[20px_20px]'></div>

                        {metrics.map((h, i) => (
                            <motion.div
                                key={i}
                                className='flex-1 bg-linear-to-t from-cyan-900/50 to-cyan-500/50 rounded-t-sm relative group hover:from-cyan-600 hover:to-cyan-400 transition-colors'
                                animate={{ height: `${h}%` }}
                                transition={{
                                    type: "spring",
                                    damping: 15,
                                    stiffness: 100,
                                }}>
                                <div className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black px-2 py-0.5 rounded'>
                                    {Math.round(h)}
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className='absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/20 rounded-full flex items-center justify-center'>
                            <div className='w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]'></div>
                        </motion.div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isXRayMode && (
                        <motion.div
                            initial={{ top: "0%", opacity: 0 }}
                            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className='absolute left-0 right-0 h-2 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-40 pointer-events-none mix-blend-screen'
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default MegaProjectCard;
