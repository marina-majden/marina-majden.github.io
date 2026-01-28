import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Check, User } from "lucide-react";

// Custom hook for interval with variable delay
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// --- POMOĆNA KOMPONENTA: ANIMATED PROGRESS BAR ---
const AnimatedProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useInterval(
        () => {
            if (progress >= 100) {
                setProgress(0);
            } else {
                setProgress((prev) => prev + 20);
            }
        },
        progress >= 100 ? 3000 : 800,
    );

    return (
        <motion.div
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute top-1/2 left-[20%] w-64 p-5 bg-[#1e293b]/90 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl z-10 flex flex-col gap-4'>
            <div className='flex justify-between items-center text-xs font-mono text-slate-400'>
                <span className='flex items-center gap-2'>
                    <Activity
                        size={14}
                        className={
                            progress === 100
                                ? "text-green-400"
                                : "text-cyan-400"
                        }
                    />
                    Status
                </span>
                <span
                    className={
                        progress === 100 ? "text-green-400 font-bold" : ""
                    }>
                    {progress}%
                </span>
            </div>

            <div className='h-2 w-full bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30'>
                <motion.div
                    className='h-full rounded-full'
                    animate={{
                        width: `${progress}%`,
                        backgroundColor:
                            progress === 100 ? "#4ade80" : "#22d3ee",
                        boxShadow:
                            progress === 100 ? "0 0 12px #4ade80" : "none",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                />
            </div>

            <div className='h-6 flex items-center justify-center'>
                <AnimatePresence mode='wait'>
                    {progress === 100 ? (
                        <motion.div
                            key='success'
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className='flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest'>
                            <Check size={14} /> Goal Accomplished!
                        </motion.div>
                    ) : (
                        <motion.div
                            key='loading'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='text-[10px] text-slate-500 font-mono'>
                            System optimization in progress...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// --- POMOĆNA KOMPONENTA: AVATAR CHAT ---
const AvatarChat = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-1/3 left-[20%] z-20 flex items-end gap-3'>
            <div className='w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20'>
                <div className='w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center'>
                    <User size={24} className='text-slate-400' />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className='bg-slate-800/90 backdrop-blur-md border border-slate-600/50 text-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-xl max-w-[220px]'>
                <AnimatePresence mode='wait'>
                    {!showText ? (
                        <motion.div
                            key='typing'
                            exit={{ opacity: 0, scale: 0.8 }}
                            className='flex gap-1 h-5 items-center px-1'>
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    delay: 0,
                                }}
                                className='w-1.5 h-1.5 bg-slate-400 rounded-full'
                            />
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    delay: 0.2,
                                }}
                                className='w-1.5 h-1.5 bg-slate-400 rounded-full'
                            />
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    delay: 0.4,
                                }}
                                className='w-1.5 h-1.5 bg-slate-400 rounded-full'
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key='text'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='text-xs font-medium leading-relaxed'>
                            <span className='font-sans'>Lorem ipsum,</span>,
                            hahahha! 🤣
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

// --- POMOĆNA KOMPONENTA: ABSTRACT UI (LIJEVA STRANA) ---
const AbstractUI = () => (
    <div className='absolute inset-0 border-2 border-accent pointer-events-none overflow-hidden'>
        <AnimatedProgressBar />
        <AvatarChat />

        {/* Lebdeća Kartica */}
        <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-1/5 left-6 lg:top-1/4 lg:right-[15%] w-4/5 h-auto lg:w-72 lg:h-44 bg-linear-to-b from-slate-700/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-10 flex flex-col p-5'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/10 shadow-inner'>
                    <Heart size={18} fill='currentColor' />
                </div>
                <div className='space-y-2'>
                    <div className='w-20 h-2 bg-slate-600/50 rounded-full'></div>
                    <div className='w-12 h-2 bg-slate-700/50 rounded-full'></div>
                </div>
            </div>
            <div className='flex-1 space-y-3'>
                <div className='w-full h-8 bg-slate-800/50 rounded-lg border border-slate-700/30'></div>
                <div className='flex gap-2'>
                    <div className='w-8 h-8 bg-indigo-500/20 rounded-lg border border-indigo-500/10'></div>
                    <div className='flex-1 h-8 bg-slate-800/50 rounded-lg border border-slate-700/30'></div>
                </div>
            </div>
        </motion.div>

        {/* Lebdeći Krug */}
        <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-1/4 left-1/4 w-full h-full rounded-full bg-indigo-900/10 blur-3xl opacity-30 z-0'
        />

        {/* Lebdeći Graf */}
        <motion.div
            animate={{ y: [0, 30, 0], scale: [1, 1.02, 1] }}
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
            }}
            className='absolute bottom-20 right-[10%] w-64 h-64 bg-[#0f172a]/80 backdrop-blur-md border border-slate-800 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-0 flex items-center justify-center'>
            <div className='absolute inset-0 rounded-full border border-slate-700/30'></div>
            <div className='w-40 h-40 border-2 border-dashed border-indigo-500/30 rounded-full animate-spin-slow flex items-center justify-center'>
                <div className='w-20 h-20 bg-indigo-500/10 rounded-full blur-xl'></div>
            </div>
            <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className='absolute -right-4 top-10 bg-slate-800 border border-slate-700 p-2 rounded-lg shadow-lg'>
                <Activity size={16} className='text-emerald-400' />
            </motion.div>
        </motion.div>
    </div>
);

export default AbstractUI;
