import React from "react";

const ColoredGlassCard: React.FC = () => {
    return (
        // Spremnik pune visine za demonstraciju (u stvarnoj aplikaciji prilagodite visinu roditelja)
        <div className='h-screen w-full'>
            {/* Definiramo custom animacije jer su specifične za ovu komponentu */}
            <style>{`
        @keyframes ani {
          0% { transform: translateX(0%) scale(1); }
          50% { transform: translateX(-100%) scale(0.8); }
          100% { transform: translateX(0%) scale(1); }
        }
        @keyframes shine {
          0% { top: 100%; left: -100%; }
          50%, 100% { top: 0%; left: 70%; }
        }
      `}</style>

            {/* --- colored-glass-card-container --- */}
            <div
                className='colored-glass-card-container relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950
            z-0'>
                {/* Container ::after (Animirani krug) */}
                <div
                    className='absolute left-1/2 top-1/4 h-46 w-46 -translate-x-full rounded-full border border-slate-950/50 bg-linear-to-b from-orange-500 to-fuchsia-500 shadow-[inset_10px_0px_20px_#fff] -z-10'
                    style={{ animation: "ani 28s ease-in-out infinite" }}></div>

                {/* Container ::before (Statični krug) */}
                <div className='absolute bottom-1/4 left-[66%] h-28 w-28 -translate-x-full rounded-full border border-slate-950/50 bg-linear-to-r from-orange-500 to-fuchsia-500 shadow-[inset_8px_0px_18px_#fff] -z-10'></div>

                {/* --- colored-glass-card --- */}
                <div className='colored-glass-card relative w-1/3 h-auto overflow-hidden rounded-[10px] border border-slate-800/30 bg-slate-950/0 px-8 py-6 shadow-[inset_2px_1px_6px_#ffffff45] backdrop-blur-[10.5px] z-0'>
                    {/* Card ::after (Shine effect) */}
                    <div
                        className='absolute left-0 top-0 h-2.5 w-[150%] rotate-50 bg-slate-600 blur-[30px] -z-10'
                        style={{ animation: "shine 10s ease infinite" }}></div>

                    {/* Sadržaj kartice */}
                    <p className='my-6 bg-linear-to-r from-blue-100 to-slate-300 bg-clip-text text-3xl font-extrabold leading-[1em] text-transparent'>
                        ZGODAN NASLOV
                    </p>
                    <p className='my-4 bg-linear-to-r from-cyan-200 to-blue-100 bg-clip-text text-xl font-extrabold leading-[1em] text-transparent'>
                        Podnaslov ili PODNASLOV?
                    </p>
                    <p className='mb-4 p-1 text-slate-200'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer id dictum augue, id viverra. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Eaque illum
                        inventore fugit odio tempora fugiat aperiam incidunt
                        maiores, quidem harum, unde enim optio eius id, itaque
                        aliquam sint accusantium? Facere.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ColoredGlassCard;
