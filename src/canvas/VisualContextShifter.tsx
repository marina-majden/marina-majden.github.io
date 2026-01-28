import { useState } from "react";
import { Eye, Palette } from "lucide-react";
import { visualContextVariations, type VisualVariation } from "../data/data";

interface LitartContent {
    visualTitle: string;
    visualDesc: string;
    nextVisualBtn: string;
}

interface VisualContextShifterProps {
    lang: "hr" | "en";
    t: {
        litart: LitartContent;
    };
}

const VisualContextShifter: React.FC<VisualContextShifterProps> = ({
    lang,
    t,
}) => {
    const [idx, setIdx] = useState<number>(0);
    const variations: VisualVariation[] = visualContextVariations[lang];
    const current: VisualVariation = variations[idx];

    const nextVisual = (): void => {
        setIdx((prev) => (prev + 1) % variations.length);
    };

    return (
        <div className='my-24 w-full max-w-4xl mx-auto'>
            <div className='text-center mb-8'>
                <div className='flex justify-center items-center gap-2 mb-2'>
                    <Palette className='text-cyan-400' size={24} />
                    <h3 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-400 font-heading'>
                        {t.litart.visualTitle}
                    </h3>
                </div>
                <p className='text-gray-400'>{t.litart.visualDesc}</p>
            </div>

            <div
                className={`relative rounded-3xl border-2 transition-all duration-1000 ease-in-out shadow-2xl overflow-hidden flex flex-col md:flex-row ${current.colorClass}`}>
                <div className='w-full md:w-1/2 min-h-[300px] md:min-h-[400px] bg-black/50 relative group overflow-hidden'>
                    <div
                        className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
                        style={{
                            backgroundImage: `url(${current.img})`,
                        }}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-20 mix-blend-overlay"></div>
                    <div className='absolute top-4 left-4 bg-black/60 backdrop-blur text-xs font-mono px-3 py-1 rounded border border-white/20'>
                        {current.motif} // {idx + 1}.0
                    </div>
                </div>
                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative backdrop-blur-sm bg-black/20'>
                    <div className='mb-auto'>
                        <h4 className='text-2xl font-bold mb-2 font-heading uppercase tracking-widest opacity-90'>
                            {current.style}
                        </h4>
                        <div className='w-12 h-1 bg-current opacity-50 mb-6 rounded-full'></div>
                    </div>
                    <p className='text-lg font-light leading-relaxed mb-8 opacity-90'>
                        {current.desc}
                    </p>
                    <div className='mt-auto pt-6 border-t border-white/10 flex justify-between items-center'>
                        <span className='font-mono text-xs opacity-50 uppercase tracking-widest'>
                            Tone: {current.tone}
                        </span>
                        <button
                            onClick={nextVisual}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 font-bold uppercase text-xs tracking-widest hover:text-white hover:scale-105 active:scale-95 group ${current.btnClass}`}>
                            <Eye
                                size={14}
                                className='group-hover:scale-125 transition-transform duration-300'
                            />
                            {t.litart.nextVisualBtn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualContextShifter;
