import { Heart } from "lucide-react";
import React from "react";

const UIWidgets = ({ theme, radius, font, item, heroLayout }: any) => {
    const baseClasses = `${theme.cardBg} ${theme.border} ${radius} border-2 shadow-md shadow-slate-600 w-full cursor-grab active:cursor-grabbing select-none transition-all duration-300 overflow-hidden`;
    const heroImage =
        "https://images.unsplash.com/photo-1653302803784-c5b7918dbf43?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    switch (item) {
        case "hero":
            if (heroLayout === "background") {
                return (
                    <div
                        className={`${baseClasses} relative h-64 flex flex-col items-center justify-center text-center p-6 group`}>
                        <div className='absolute inset-0'>
                            <img
                                src={heroImage}
                                alt='bg'
                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                            />
                            <div className='absolute inset-0 bg-cyan-700/20 mix-blend-color-burn backdrop-blur-sm'></div>
                        </div>
                        <div className='relative z-10 text-white space-y-4'>
                            <h3
                                className={`text-3xl text-shadow-black text-shadow-md font-bold ${font}`}>
                                Slojeviti elementi za efekt dubine
                            </h3>
                            <p className='text-md max-w-xs mx-auto text-shadow-black text-shadow-md '>
                                Pozadinska slika s tamnim overlayem za
                                dramatičan efekt.
                            </p>
                            <button
                                className={`${theme.primary} text-white px-6 py-2 ${radius} text-sm font-medium hover:opacity-90 transition-opacity`}>
                                Saznaj više
                            </button>
                        </div>
                    </div>
                );
            }

            if (heroLayout === "split") {
                return (
                    <div className={`${baseClasses} flex flex-row h-48`}>
                        <div className='w-1/2 relative overflow-hidden group'>
                            <img
                                src={heroImage}
                                alt='split'
                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                            />
                        </div>
                        <div className='w-1/2 p-6 flex flex-col justify-center items-start text-left space-y-3'>
                            <div
                                className={`w-8 h-8 ${theme.primary} ${radius} flex items-center justify-center ${theme.text}`}>
                                <Heart size={14} />
                            </div>
                            <h3
                                className={`text-xl ${theme.title} font-bold ${font} leading-tight`}>
                                Simetrija za ravnotežu sadržaja
                            </h3>
                            <button
                                className={`text-xs font-bold uppercase tracking-wider underline ${theme.accent}`}>
                                Pročitaj više
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div
                    className={`${baseClasses} p-6 flex flex-col items-center text-center space-y-4`}>
                    <div className='relative w-32 h-32 mx-auto mb-2 drop-shadow-xl'>
                        <div
                            className='absolute inset-0 w-full h-full'
                            style={{
                                clipPath:
                                    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            }}>
                            <img
                                src={heroImage}
                                alt='creative'
                                className='w-full h-full object-cover'
                            />
                            <div
                                className={`absolute inset-0 ${theme.overlay} mix-blend-overlay opacity-60`}></div>
                        </div>
                    </div>
                    <h3 className={`text-2xl ${theme.title} font-bold ${font}`}>
                        Jasan fokus
                    </h3>
                    <p
                        className={`opacity-70 text-sm ${theme.text} max-w-xs mx-auto`}>
                        Geometrijski oblici usklađeni su poluprozirnim slojevima
                        s pozadinom.
                    </p>
                    <button
                        className={`${theme.primary} text-white px-6 py-2 ${radius} text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20`}>
                        Istraži temu
                    </button>
                </div>
            );

        case "grid":
            return (
                <div className={`${baseClasses} p-6`}>
                    <div className='flex justify-between items-center mb-4'>
                        <h4 className={`${theme.title} font-bold ${font}`}>
                            Najnovije
                        </h4>
                        <span
                            className={`text-xs ${theme.accent} cursor-pointer`}>
                            Vidi sve &rarr;
                        </span>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`aspect-square ${theme.bg} ${radius} flex items-center justify-center relative overflow-hidden group`}>
                                <div
                                    className={`absolute inset-0 ${theme.primary} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                                <span
                                    className={`opacity-30 text-xs ${theme.text}`}>
                                    Artwork {i}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "stats":
            return (
                <div
                    className={`${baseClasses} p-6 flex justify-around items-center`}>
                    {[
                        { label: "Korisnici", val: "12k" },
                        { label: "Prodaja", val: "+24%" },
                    ].map((stat, i) => (
                        <div key={i} className='text-center'>
                            <div
                                className={`text-xl font-bold ${theme.accent} ${font}`}>
                                {stat.val}
                            </div>
                            <div className='text-xs opacity-60 uppercase tracking-wider'>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
};
export default UIWidgets;
