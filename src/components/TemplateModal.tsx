import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TemplateItem } from "../data/data";
import { useLanguage } from "@/components/LanguageContext";

interface TemplateModalProps {
    product: TemplateItem;
    isOpen: boolean;
    onClose: () => void;
    onOrder: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
    product,
    isOpen,
    onClose,
    onOrder,
}) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // 1. Sigurnosna provjera: Ako modal nije otvoren ili proizvod nije definiran, prekini renderiranje.
    // NAPOMENA: Ovo uvijek mora ići ISPOD useState i ostalih React Hookova.
    if (!isOpen || !product) return null;

    // 2. Kombiniramo video (ako postoji) i galeriju slika u jedan niz za prikaz
    // Koristimo opcionalno ulančavanje (?.) za svaki slučaj, te dodajemo fallback na cover sliku ako nema ni videa ni galerije.
    const mediaList = [
        ...(product.videoUrl ? [{ type: "video", url: product.videoUrl }] : []),
        ...(product.gallery?.length > 0
            ? product.gallery.map((url) => ({ type: "image", url }))
            : [
                  {
                      type: "image",
                      url:
                          product.coverImage ||
                          "https://via.placeholder.com/800x600?text=Slika+nedostaje",
                  },
              ]),
    ];

    const nextMedia = () => {
        setCurrentMediaIndex((prev) =>
            prev === mediaList.length - 1 ? 0 : prev + 1,
        );
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) =>
            prev === 0 ? mediaList.length - 1 : prev - 1,
        );
    };

    const currentMedia = mediaList[currentMediaIndex];
    const lang = useLanguage().lang;

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300'>
            <div className='bg-slate-900 rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-fadeIn'>
                {/* Gumb za zatvaranje modala */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors'
                    aria-label='close'>
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'></path>
                    </svg>
                </button>

                {/* Lijeva strana: Media Carousel (Slika/Video) */}
                <div className='w-full md:w-1/2 relative bg-slate-950 flex flex-col justify-center min-h-[350px] md:min-h-full'>
                    {currentMedia.type === "video" ? (
                        <video
                            src={currentMedia.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={product.coverImage} // Fallback slika ako video pukne ili dok se učitava
                            className='w-full h-full object-cover max-h-[50vh] md:max-h-full'
                        />
                    ) : (
                        <img
                            src={currentMedia.url}
                            alt={`${product.title} - prikaz`}
                            className='w-full h-full object-cover max-h-[50vh] md:max-h-full'
                        />
                    )}

                    {/* Navigacija Carousela */}
                    {mediaList.length > 1 && (
                        <>
                            <button
                                onClick={prevMedia}
                                className='absolute left-4 p-3 bg-black/40 text-white rounded-full hover:bg-black/80 transition-all transform hover:scale-110'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M15 19l-7-7 7-7'></path>
                                </svg>
                            </button>
                            <button
                                onClick={nextMedia}
                                className='absolute right-4 p-3 bg-black/40 text-white rounded-full hover:bg-black/80 transition-all transform hover:scale-110'>
                                <svg
                                    className='w-5 h-5'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M9 5l7 7-7 7'></path>
                                </svg>
                            </button>

                            {/* Indikatori */}
                            <div className='absolute bottom-6 left-0 right-0 flex justify-center space-x-2'>
                                {mediaList.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            setCurrentMediaIndex(idx)
                                        }
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentMediaIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"}`}
                                        aria-label={`Prikaži sliku ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Desna strana: Informacije */}
                <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto'>
                    {/* Tagovi */}
                    {product.tags && product.tags.length > 0 && (
                        <div className='flex flex-wrap gap-2 mb-4'>
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className='px-3 py-1 text-xs font-medium tracking-wider bg-lake-900/40 text-lake-300 rounded-full uppercase'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h2 className='text-3xl font-extrabold text-white mb-4 pr-8 leading-tight'>
                        {product.title}
                    </h2>

                    <div className='prose prose-invert max-w-none mb-8 text-gray-300 text-sm md:text-base leading-relaxed'>
                        <p>{product.longDesc}</p>
                    </div>

                    <div className='mb-8 grow'>
                        <h4 className='text-lg font-bold text-white mb-4 border-b pb-2 border-gray-800'>
                            + {""}
                        </h4>
                        <ul className='space-y-3'>
                            {product.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className='flex items-start text-sm md:text-base'>
                                    <div className='shrink-0 mt-1'>
                                        <svg
                                            className='w-5 h-5 text-emerald-500'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 13l4 4L19 7'></path>
                                        </svg>
                                    </div>
                                    <span className='ml-3 text-gray-300'>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Akcije */}
                    <div className='flex flex-col sm:flex-row items-center gap-4 mt-auto pt-6 border-t border-gray-800'>
                        <button
                            onClick={onClose}
                            className='w-full sm:w-auto px-6 py-3.5 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none'>
                            {lang === "hr" ? "Zatvori" : "Close"}
                        </button>
                        <button
                            onClick={onOrder}
                            className='w-full sm:flex-1 px-6 py-3.5 bg-lake-600 text-white font-bold rounded-xl hover:bg-lake-700 transition-all shadow-[0_4px_14px_0_rgba(62,170,247,0.39)] hover:shadow-[0_6px_20px_rgba(62,170,247,0.23)] hover:-translate-y-0.5 focus:ring-2 focus:ring-lake-400 focus:outline-none flex justify-center items-center'>
                            {lang === "hr" ? "Naruči" : "Order"}
                            <svg
                                className='w-5 h-5 ml-2'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default TemplateModal;
