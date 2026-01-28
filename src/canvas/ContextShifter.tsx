import { useState } from "react";
import { Feather, RefreshCw } from "lucide-react";
import { contextVariations, type ContextVariation } from "../data/data";

interface ContextShifterProps {
    lang: "hr" | "en";
    t: {
        litart: {
            contextTitle: string;
            contextDesc: string;
            nextBtn: string;
        };
    };
}

const ContextShifter: React.FC<ContextShifterProps> = ({ lang, t }) => {
    const [idx, setIdx] = useState<number>(0);
    const variations: ContextVariation[] = contextVariations[lang];
    const current: ContextVariation = variations[idx];

    const nextContext = (): void => {
        setIdx((prev) => (prev + 1) % variations.length);
    };

    return (
        <div className='my-16 w-full max-w-4xl mx-auto'>
            <div className='text-center mb-8'>
                <div className='flex justify-center items-center gap-2 mb-2'>
                    <Feather className='text-purple-400' size={24} />
                    <h3 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 font-heading'>
                        {t.litart.contextTitle}
                    </h3>
                </div>
                <p className='text-gray-400'>{t.litart.contextDesc}</p>
            </div>

            <div
                className={`relative p-12 rounded-3xl border transition-all duration-700 ease-in-out flex flex-col items-center justify-center min-h-[300px] shadow-2xl overflow-hidden ${current.colorClass}`}>
                <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10 animate-pulse'></div>
                <div className='absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl -z-10'></div>
                <div className='absolute top-6 right-6 font-mono text-xs opacity-60 uppercase tracking-widest border border-current px-3 py-1 rounded-full'>
                    {current.source} // {current.tone}
                </div>
                <div className='text-xl md:text-3xl leading-relaxed text-center max-w-2xl font-light'>
                    <span className='opacity-80 transition-opacity duration-500'>
                        {current.before}
                    </span>
                    <span
                        className={`inline-block mx-3 px-6 py-2 border-2 rounded-full font-bold tracking-wider relative transition-all duration-500 z-10 bg-black/20 backdrop-blur-sm ${
                            current.colorClass.split(" ")[1]
                        }`}>
                        {current.word}
                        <span
                            className={`absolute inset-0 rounded-full blur opacity-50 ${current.colorClass
                                .split(" ")[1]
                                .replace("border", "bg")}`}></span>
                    </span>
                    <span className='opacity-80 transition-opacity duration-500'>
                        {current.after}
                    </span>
                </div>
                <div className='mt-12'>
                    <button
                        onClick={nextContext}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 font-bold uppercase text-sm tracking-widest hover:text-white hover:scale-105 active:scale-95 group ${current.btnClass}`}>
                        <RefreshCw
                            size={16}
                            className='group-hover:rotate-180 transition-transform duration-500'
                        />
                        {t.litart.nextBtn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContextShifter;
