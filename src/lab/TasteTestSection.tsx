import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    Image as ImageIcon,
    PieChart,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import { tasteTestQuestions } from "../data/lab.js";

const Globe = (props: any) => (
    <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <circle cx='12' cy='12' r='10' />
        <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
        <path d='M2 12h20' />
    </svg>
);

// Pomoćna funkcija za renderiranje različitih UI varijanti
const RenderVariant = ({
    questionId,
    variant,
}: {
    questionId: number;
    variant: "A" | "B";
}) => {
    // Ovdje definiramo izgled komponenti ovisno o pitanju
    switch (questionId) {
        case 1: // Button Stil
            return variant === "A" ? (
                <button className='px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white rounded-xl shadow-[0_8px_20px_-5px_rgba(56,189,248,0.5)] font-semibold transform hover:scale-105 transition-transform'>
                    Get Started
                </button>
            ) : (
                <button className='px-8 py-3 bg-slate-900 border-2 border-slate-200 text-white font-mono uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors shadow-[4px_4px_0px_white]'>
                    Get Started
                </button>
            );

        case 2: // Card Dizajn
            return variant === "A" ? (
                <div className='p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white w-48'>
                    <div className='w-8 h-8 bg-blue-400/50 rounded-full mb-3'></div>
                    <div className='h-2 w-2/3 bg-white/20 rounded mb-2'></div>
                    <div className='h-2 w-full bg-white/10 rounded'></div>
                </div>
            ) : (
                <div className='p-6 bg-slate-100 rounded-none border-2 border-slate-900 text-slate-900 w-48 shadow-[6px_6px_0px_#0f172a]'>
                    <div className='w-8 h-8 bg-slate-900 mb-3'></div>
                    <div className='h-2 w-2/3 bg-slate-300 mb-2'></div>
                    <div className='h-2 w-full bg-slate-200'></div>
                </div>
            );

        case 3: // Ikone
            return variant === "A" ? (
                <div className='flex gap-4'>
                    <Activity
                        strokeWidth={1}
                        size={32}
                        className='text-white'
                    />
                    <Globe strokeWidth={1} size={32} className='text-white' />
                </div>
            ) : (
                <div className='flex gap-4'>
                    <div className='p-2 bg-blue-500 rounded-lg text-white'>
                        <Activity size={24} fill='currentColor' />
                    </div>
                    <div className='p-2 bg-rose-500 rounded-lg text-white'>
                        <Globe size={24} fill='currentColor' />
                    </div>
                </div>
            );

        case 4: // Navigacija
            return variant === "A" ? (
                <div className='w-full bg-slate-800 p-2 rounded-t-lg flex justify-between items-center'>
                    <div className='w-4 h-4 rounded-full bg-cyan-400'></div>
                    <div className='flex gap-2'>
                        <div className='w-8 h-2 bg-slate-600 rounded'></div>
                        <div className='w-8 h-2 bg-slate-600 rounded'></div>
                    </div>
                </div>
            ) : (
                <div className='w-full h-24 bg-slate-800 flex'>
                    <div className='w-12 border-r border-slate-700 flex flex-col items-center gap-2 p-2'>
                        <div className='w-4 h-4 rounded-full bg-cyan-400 mb-2'></div>
                        <div className='w-4 h-4 bg-slate-600 rounded'></div>
                        <div className='w-4 h-4 bg-slate-600 rounded'></div>
                    </div>
                    <div className='flex-1'></div>
                </div>
            );

        case 5: // Dark Mode
            return variant === "A" ? (
                <div className='w-full h-full bg-black flex items-center justify-center border border-white/10'>
                    <span className='text-neutral-500'>True Black</span>
                </div>
            ) : (
                <div className='w-full h-full bg-[#1e293b] flex items-center justify-center border border-white/5'>
                    <span className='text-slate-400'>Deep Blue</span>
                </div>
            );

        case 6: // Kutovi
            return variant === "A" ? (
                <div className='flex gap-2'>
                    <div className='w-12 h-12 bg-rose-400 rounded-full animate-bounce'></div>
                    <div className='w-12 h-12 bg-orange-400 rounded-[20px] animate-pulse'></div>
                </div>
            ) : (
                <div className='flex gap-2'>
                    <div className='w-12 h-12 bg-rose-600 rounded-none rotate-3'></div>
                    <div className='w-12 h-12 bg-orange-600 rounded-none -rotate-3'></div>
                </div>
            );

        default:
            return null;
    }
};

const TasteTestSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [userVote, setUserVote] = useState<"A" | "B" | null>(null);

    // Kopija podataka u state da možemo mijenjati "glasove"
    const [questions, setQuestions] = useState(tasteTestQuestions);

    const currentQ = questions[currentIndex];

    // Izračun postotaka u realnom vremenu
    const totalVotes =
        currentQ.optionA.votes + currentQ.optionB.votes + (hasVoted ? 1 : 0);
    const percentA = Math.round(
        ((currentQ.optionA.votes + (userVote === "A" ? 1 : 0)) / totalVotes) *
            100
    );
    const percentB = 100 - percentA;

    const handleVote = (option: "A" | "B") => {
        if (hasVoted) return;
        setUserVote(option);
        setHasVoted(true);
        // U stvarnoj aplikaciji ovdje bi išao API poziv prema bazi
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setHasVoted(false);
            setUserVote(null);
        }
    };

    return (
        <section
            id='taste-test'
            className='py-24 px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden'>
            {/* Background Decor */}
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none'></div>

            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3'>
                        <PieChart className='text-cyan-400' /> Sukus Ukusa
                    </h2>
                    <p className='text-slate-400'>
                        Pomozite mi definirati budućnost dizajna. Vaš glas
                        oblikuje statistiku.
                    </p>

                    {/* Progress Bar */}
                    <div className='w-full max-w-xs mx-auto h-1 bg-slate-800 mt-6 rounded-full overflow-hidden'>
                        <motion.div
                            className='h-full bg-cyan-500'
                            initial={{ width: 0 }}
                            animate={{
                                width: `${
                                    ((currentIndex + 1) / questions.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                    <span className='text-xs font-mono text-slate-500 mt-2 block'>
                        Pitanje {currentIndex + 1} od {questions.length}
                    </span>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative'>
                        {/* VS BADGE */}
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-900 border border-slate-700 text-slate-400 font-black italic rounded-full w-12 h-12 flex items-center justify-center shadow-xl'>
                            VS
                        </div>

                        {/* OPTION A */}
                        <div
                            onClick={() => handleVote("A")}
                            className={`relative h-64 md:h-80 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group overflow-hidden ${
                                hasVoted
                                    ? userVote === "A"
                                        ? "border-cyan-500 bg-cyan-900/10"
                                        : "border-slate-800 opacity-50 grayscale"
                                    : "border-slate-700 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-slate-800/30"
                            }`}>
                            <div className='transform scale-125 group-hover:scale-110 transition-transform duration-500'>
                                <RenderVariant
                                    questionId={currentQ.id}
                                    variant='A'
                                />
                            </div>
                            <div className='absolute bottom-4 text-sm font-medium text-slate-300'>
                                {currentQ.optionA.label}
                            </div>

                            {/* Result Overlay */}
                            {hasVoted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className='absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-10'>
                                    <span className='text-5xl font-bold text-cyan-400'>
                                        {percentA}%
                                    </span>
                                    {userVote === "A" && (
                                        <div className='flex items-center gap-1 text-cyan-300 text-xs mt-2'>
                                            <CheckCircle2 size={14} /> Vaš izbor
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* OPTION B */}
                        <div
                            onClick={() => handleVote("B")}
                            className={`relative h-64 md:h-80 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group overflow-hidden ${
                                hasVoted
                                    ? userVote === "B"
                                        ? "border-cyan-500 bg-cyan-900/10"
                                        : "border-slate-800 opacity-50 grayscale"
                                    : "border-slate-700 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-slate-800/30"
                            }`}>
                            <div className='transform scale-125 group-hover:scale-110 transition-transform duration-500'>
                                <RenderVariant
                                    questionId={currentQ.id}
                                    variant='B'
                                />
                            </div>
                            <div className='absolute bottom-4 text-sm font-medium text-slate-300'>
                                {currentQ.optionB.label}
                            </div>

                            {/* Result Overlay */}
                            {hasVoted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className='absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-10'>
                                    <span className='text-5xl font-bold text-cyan-400'>
                                        {percentB}%
                                    </span>
                                    {userVote === "B" && (
                                        <div className='flex items-center gap-1 text-cyan-300 text-xs mt-2'>
                                            <CheckCircle2 size={14} /> Vaš izbor
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation & Question Text */}
                <div className='text-center mt-12 h-24'>
                    <AnimatePresence mode='wait'>
                        {!hasVoted ? (
                            <motion.div
                                key='question'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}>
                                <h3 className='text-xl text-white font-medium mb-2'>
                                    {currentQ.title}
                                </h3>
                                <p className='text-slate-400'>
                                    {currentQ.desc}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key='next'
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='flex flex-col items-center gap-2'>
                                <div className='text-cyan-300 font-mono text-sm mb-2'>
                                    {userVote ===
                                    (percentA > percentB ? "A" : "B")
                                        ? "Slažete se s većinom!"
                                        : "Imate unikatan ukus!"}
                                </div>
                                {currentIndex < questions.length - 1 ? (
                                    <button
                                        onClick={nextQuestion}
                                        className='px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2'>
                                        Sljedeće Pitanje{" "}
                                        <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <div className='px-8 py-3 bg-slate-800 text-slate-300 rounded-full font-bold border border-slate-700'>
                                        Hvala na sudjelovanju!
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TasteTestSection;
