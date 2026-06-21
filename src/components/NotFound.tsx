import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const NotFound: React.FC = () => {
    const { lang } = useLanguage();
    const [explosions, setExplosions] = useState<number[]>([]);

    const handleExplode = (e: React.MouseEvent) => {
        const id = Date.now();
        setExplosions((s) => [...s, id]);
        window.setTimeout(() => setExplosions((s) => s.filter((x) => x !== id)), 700);
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200'>
            {/* Background Glows (Optimizirano) */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className='absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_60%)] rounded-full will-change-transform'
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className='absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] rounded-full will-change-transform'
                />
                {/* Grainy overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 pointer-events-none" />
            </div>

            {/* Sadržaj */}
            <div className='relative z-10 flex flex-col items-center text-center px-6'>
                {/* Mali bedž na vrhu */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-900/20 border border-pink-500/30 text-pink-300 text-sm font-semibold backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer'>
                    <AlertTriangle size={16} />
                    <span>
                        {lang === "hr"
                            ? "Glitch u Matrixu"
                            : "Glitch in the Matrix"}
                    </span>
                </motion.div>

                {/* 404 Naslov */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                    className='text-8xl md:text-[150px] font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 drop-shadow-2xl'>
                    404
                </motion.h1>

                {/* Tekstualna poruka */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='text-xl md:text-2xl text-slate-400 max-w-lg mb-10 leading-relaxed font-light'>
                    {lang === "hr"
                        ? "Izgubili ste se u bespućima globalne mreže? Ne brinite, vratit ćemo vas sigurno kući!"
                        : "Lost in the vastness of the global network? Don't worry, we'll safely guide you back home!"}
                </motion.p>

                {/* Gumb za povratak */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}>
                    <motion.div
                        whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(6,182,212,0.28)" }}
                        whileTap={{ scale: 0.98 }}
                        className='relative inline-block'>
                        <Link
                            to='/'
                            onClick={handleExplode}
                            className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-slate-900/80 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md hover:-translate-y-1'>
                            <Home
                                size={20}
                                className='text-cyan-400 group-hover:scale-110 transition-transform'
                            />
                            <span>
                                {lang === "hr"
                                    ? "Povratak na početnu stranicu"
                                    : "Return to Homepage"}
                            </span>
                        </Link>

                        {/* Explosion ripples centered on the button */}
                        {explosions.map((id) => (
                            <motion.span
                                key={id}
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 4, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className='pointer-events-none absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-400/50 to-pink-400/40 blur-xl transform -translate-x-1/2 -translate-y-1/2'
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
