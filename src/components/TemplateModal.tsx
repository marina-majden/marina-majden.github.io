import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TemplateItem } from "@/data/data.ts";
import { useLanguage } from "@/components/LanguageContext";
import { FALLBACK_IMAGE } from "@/data/constants.ts";
import { Target, Palette, Layers, Sparkles } from "lucide-react";

interface TemplateModalProps {
    product: TemplateItem;
    isOpen: boolean;
    standard: string;
    onClose: () => void;
    onOrder: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
    product,
    isOpen,
    standard,
    onClose,
    onOrder,
}) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimalna udaljenost (u pikselima) za detekciju prelaska prstom (swipe)
    const minSwipeDistance = 50;

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

    const lang = useLanguage().lang;

    // 2. Kombiniramo video (ako postoji) i galeriju slika u jedan niz za prikaz
    // Koristimo opcionalno ulančavanje (?.) za svaki slučaj, te dodajemo fallback na cover sliku ako nema ni videa ni galerije.
    const rawMedia = [
        {
            type: "video",
            url: product.videoUrl
                ? `/templates/videos/${product.videoUrl}`
                : undefined,
            label: lang === "hr" ? "Video pregled" : "Video preview",
        },
        {
            type: "image",
            url: product.screenshotHome,
            label: lang === "hr" ? "Naslovnica" : "Home",
        },
        { type: "image", url: product.screenshotDesktop, label: "Desktop" },
        { type: "image", url: product.screenshotMobile, label: "Mobile" },
    ].filter((item) => Boolean(item.url));

    const mediaList =
        rawMedia.length > 0
            ? rawMedia
            : [
                  {
                      type: "image",
                      url: FALLBACK_IMAGE,
                      label:
                          lang === "hr"
                              ? "Prikaz nedostaje"
                              : "Missing preview",
                  },
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

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Resetiraj krajnji dodir prilikom novog dodira
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && mediaList.length > 1) {
            nextMedia();
        } else if (isRightSwipe && mediaList.length > 1) {
            prevMedia();
        }
    };

    // DRY konstante (sada uvezene iz constants.ts)
    const navBtnClass =
        "shrink-0 p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all transform hover:scale-110 shadow-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-lake-500";

    const currentMedia = mediaList[currentMediaIndex];

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300'>
            <div className='bg-slate-900 rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative animate-fadeIn'>
                {/* Gumb za zatvaranje modala */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors shadow-lg'
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

                {/* Flex kontejner koji se ponaša kao stupac na mobitelu, a red s 3 stupca na desktopu */}
                <div className='flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden'>
                    {/* --- 1. LIJEVI STUPAC: Opis --- */}
                    <div className='order-2 lg:order-1 lg:w-1/3 p-6 lg:p-8 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col'>
                        <h2 className='text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight'>
                            {product.title}
                        </h2>
                        {product.subtitle && (
                            <p className='text-lg text-lake-400 font-medium mb-8'>
                                {product.subtitle}
                            </p>
                        )}

                        <div className='prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed mb-8'>
                            <p>{product.description}</p>
                        </div>
                        <div className='mt-auto p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs text-gray-400 italic'>
                            {standard}
                        </div>
                    </div>

                    {/* --- 2. SREDNJI I DESNI STUPAC (SPOJENI): Media + Detalji --- */}
                    <div className='order-1 lg:order-2 lg:w-2/3 flex flex-col shrink-0 lg:overflow-y-auto'>
                        <div className='w-full  flex items-center justify-center shrink-0 p-4 md:p-6 gap-4'>
                            {mediaList.length > 1 && (
                                <button
                                    onClick={prevMedia}
                                    className={navBtnClass}>
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
                            )}

                            <div
                                className='relative flex-1 w-full bg-black flex flex-col justify-center aspect-video rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-800/50'
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}>
                                {/* Oznaka tipa prikaza */}
                                {currentMedia.label && (
                                    <div className='absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-semibold text-gray-300 tracking-widest uppercase border border-white/10 shadow-lg pointer-events-none'>
                                        {currentMedia.label}
                                    </div>
                                )}

                                {currentMedia.type === "video" ? (
                                    <video
                                        key={currentMedia.url}
                                        src={currentMedia.url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        poster={
                                            product.screenshotHome ||
                                            FALLBACK_IMAGE
                                        }
                                        className='w-full h-full object-cover animate-fadeIn'
                                    />
                                ) : (
                                    <img
                                        key={currentMedia.url}
                                        src={currentMedia.url}
                                        alt={`${product.title} - prikaz`}
                                        className='w-full h-full object-cover animate-fadeIn'
                                    />
                                )}
                            </div>

                            {mediaList.length > 1 && (
                                <button
                                    onClick={nextMedia}
                                    className={navBtnClass}>
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
                            )}
                        </div>
                        {mediaList.length > 1 && (
                            <div className=' flex justify-center space-x-2'>
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
                        )}

                        {/* Detalji ispod videa */}
                        <div className='p-6 lg:p-8 flex flex-col grow'>
                            {/* Tagovi */}
                            {product.tags && product.tags.length > 0 && (
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-3 py-1 text-[10px] font-bold tracking-widest bg-lake-900/40 text-lake-300 border border-lake-700/50 rounded-full uppercase'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Podjela na Highlights i Gumbe */}
                            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 mt-2 grow'>
                                <div className='lg:w-2/3 flex flex-col gap-3'>
                                    {Object.entries(product.highlights).map(
                                        ([key, value]) => {
                                            let icon, colorClass;
                                            switch (key) {
                                                case "purpose":
                                                    icon = <Target size={18} />;
                                                    colorClass = "text-sky-400";
                                                    break;
                                                case "style":
                                                    icon = (
                                                        <Palette size={18} />
                                                    );
                                                    colorClass =
                                                        "text-pink-400";
                                                    break;
                                                case "features":
                                                    icon = <Layers size={18} />;
                                                    colorClass =
                                                        "text-emerald-400";
                                                    break;
                                                case "special":
                                                    icon = (
                                                        <Sparkles size={18} />
                                                    );
                                                    colorClass =
                                                        "text-amber-400";
                                                    break;
                                            }

                                            return (
                                                <div
                                                    key={key}
                                                    className='flex items-start gap-3'>
                                                    <div
                                                        className={`mt-0.5 shrink-0 ${colorClass}`}>
                                                        {icon}
                                                    </div>
                                                    <span className='text-slate-300 text-sm leading-relaxed'>
                                                        {value}
                                                    </span>
                                                </div>
                                            );
                                        },
                                    )}
                                </div>

                                {/* Akcije */}
                                <div className='lg:w-1/3 flex flex-col gap-3 lg:justify-end mt-auto pt-6 lg:pt-0 lg:mt-0 border-t border-slate-800 lg:border-none'>
                                    <button
                                        onClick={onOrder}
                                        className='w-full px-6 py-3.5 bg-lake-600 text-white font-bold rounded-xl hover:bg-lake-700 transition-all shadow-[0_4px_14px_0_rgba(62,170,247,0.39)] hover:shadow-[0_6px_20px_rgba(62,170,247,0.23)] hover:-translate-y-0.5 focus:ring-2 focus:ring-lake-400 focus:outline-none flex justify-center items-center'>
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
                                    <button
                                        onClick={onClose}
                                        className='w-full px-6 py-3.5 border border-slate-700 text-gray-300 font-semibold rounded-xl hover:bg-slate-800 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none'>
                                        {lang === "hr" ? "Zatvori" : "Close"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default TemplateModal;
