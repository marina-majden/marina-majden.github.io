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
            <div className='colored-glass-card-container relative flex h-full w-full items-center justify-center overflow-hidden bg-[#dfdfdf] z-0'>
                {/* Container ::after (Animirani krug) */}
                <div
                    className='absolute left-1/2 top-1/4 h-[150px] w-[150px] -translate-x-full rounded-full border-2 border-[#ffffffa6] bg-gradient-to-b from-orange-500 to-fuchsia-500 shadow-[inset_10px_0px_20px_#fff] -z-10'
                    style={{ animation: "ani 28s ease-in-out infinite" }}></div>

                {/* Container ::before (Statični krug) */}
                <div className='absolute bottom-1/4 left-[46%] h-[80px] w-[80px] -translate-x-full rounded-full border-2 border-[#ffffffa6] bg-gradient-to-r from-orange-500 to-fuchsia-500 shadow-[inset_10px_0px_20px_#fff] -z-10'></div>

                {/* --- colored-glass-card --- */}
                <div className='colored-glass-card relative h-[254px] w-[190px] overflow-hidden rounded-[10px] border border-[#ffffff56] bg-white/0 p-[10px] shadow-[inset_2px_1px_6px_#ffffff45] backdrop-blur-[10.5px] z-0'>
                    {/* Card ::after (Shine effect) */}
                    <div
                        className='absolute left-0 top-0 h-[10px] w-[150%] rotate-[50deg] bg-white blur-[30px] -z-10'
                        style={{ animation: "shine 10s ease infinite" }}></div>

                    {/* Sadržaj kartice */}
                    <p className='my-[10px] bg-gradient-to-r from-black to-[#746f6f] bg-clip-text text-[36px] font-[800] leading-[1em] text-transparent'>
                        SAMPLE TEXT
                    </p>
                    <p className='my-[10px] bg-gradient-to-r from-black to-[#746f6f] bg-clip-text text-[36px] font-[800] leading-[1em] text-transparent'>
                        {/* Prazan paragraf iz originala */}
                    </p>
                    <p className='p-1 text-[#3a3939]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer id dictum augue, id viverra.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ColoredGlassCard;
