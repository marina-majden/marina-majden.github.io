import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TemplateItem } from "@/data/data.ts";
import { useLanguage } from "@/components/LanguageContext";
import { FALLBACK_IMAGE } from "@/data/constants.ts";
import {
    Target,
    Palette,
    Layers,
    Sparkles,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
} from "lucide-react";

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

    const minSwipeDistance = 50;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const { lang } = useLanguage();

    if (!isOpen || !product) return null;

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
            url: product.screenshotHome
                ? `/templates/images/${product.screenshotHome}`
                : undefined,
            label: lang === "hr" ? "Naslovnica" : "Home",
        },
        {
            type: "image",
            url: product.screenshotDesktop
                ? `/templates/images/${product.screenshotDesktop}`
                : undefined,
            label: "Desktop",
        },
        {
            type: "image",
            url: product.screenshotMobile
                ? `/templates/images/${product.screenshotMobile}`
                : undefined,
            label: "Mobile",
        },
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
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance && mediaList.length > 1) {
            nextMedia();
        } else if (distance < -minSwipeDistance && mediaList.length > 1) {
            prevMedia();
        }
    };

    const currentMedia = mediaList[currentMediaIndex];

    return createPortal(
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl transition-opacity duration-300'
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}>
            <div className='bg-[rgba(14,15,28,0.95)] border border-[var(--border-strong)] rounded-3xl w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_40px_rgba(0,245,255,0.2)] relative animate-fadeIn'>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 z-50 btn btn-icon w-9 h-9 min-h-0 bg-black/60 text-white rounded-full'
                    aria-label='Close modal'>
                    <X size={18} />
                </button>

                {/* Content Layout */}
                <div className='flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden'>
                    {/* Left Column: Description & Metadata */}
                    <div className='order-2 lg:order-1 lg:w-2/5 p-6 lg:p-8 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col'>
                        <div className='font-mono text-xs font-bold text-[var(--neon-blue)] uppercase tracking-wider mb-2'>
                            Structured Identity Showcase
                        </div>
                        <h2 className='text-3xl lg:text-4xl font-heading font-extrabold text-white mb-2 leading-tight'>
                            {product.title}
                        </h2>
                        {product.subtitle && (
                            <p className='text-sm text-[var(--neon-pink)] font-semibold mb-6'>
                                {product.subtitle}
                            </p>
                        )}

                        <div className='text-slate-300 text-sm leading-relaxed mb-6 font-sans space-y-3'>
                            <p>{product.description}</p>
                        </div>

                        {/* Pill Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className='flex flex-wrap gap-1.5 mb-6'>
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className='px-2.5 py-1 text-[11px] font-mono font-medium bg-white/5 text-[var(--neon-blue)] border border-white/10 rounded-full'>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className='mt-auto p-4 bg-black/40 rounded-xl border border-white/10 text-xs text-slate-400 font-sans italic'>
                            {standard}
                        </div>
                    </div>

                    {/* Right Column: Media Viewer & Specifications */}
                    <div className='order-1 lg:order-2 lg:w-3/5 flex flex-col shrink-0 lg:overflow-y-auto p-4 md:p-6'>
                        {/* Media Player Stage */}
                        <div className='w-full flex items-center justify-center shrink-0 gap-3'>
                            {mediaList.length > 1 && (
                                <button
                                    onClick={prevMedia}
                                    className='btn btn-icon w-9 h-9 min-h-0'
                                    aria-label='Previous media'>
                                    <ChevronLeft size={18} />
                                </button>
                            )}

                            <div
                                className='relative flex-1 w-full bg-black aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15'
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}>
                                {currentMedia.label && (
                                    <div className='absolute top-3 left-3 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-slate-200 tracking-wider uppercase border border-white/15'>
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
                                        className='w-full h-full object-cover animate-fadeIn'
                                    />
                                ) : (
                                    <img
                                        key={currentMedia.url}
                                        src={currentMedia.url}
                                        alt={`${product.title} preview`}
                                        className='w-full h-full object-contain animate-fadeIn'
                                    />
                                )}
                            </div>

                            {mediaList.length > 1 && (
                                <button
                                    onClick={nextMedia}
                                    className='btn btn-icon w-9 h-9 min-h-0'
                                    aria-label='Next media'>
                                    <ChevronRight size={18} />
                                </button>
                            )}
                        </div>

                        {/* Media Carousel Dots */}
                        {mediaList.length > 1 && (
                            <div className='flex justify-center gap-1.5 mt-3'>
                                {mediaList.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            setCurrentMediaIndex(idx)
                                        }
                                        className={`h-1.5 rounded-full transition-all ${
                                            idx === currentMediaIndex
                                                ? "w-6 bg-[var(--neon-blue)]"
                                                : "w-2 bg-white/30 hover:bg-white/60"
                                        }`}
                                        aria-label={`Slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Specification List */}
                        <div className='mt-6 p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col gap-3'>
                            <div className='font-mono text-xs text-[var(--neon-blue)] font-bold uppercase tracking-wider mb-1'>
                                Specifications & Architecture
                            </div>

                            {Object.entries(product.highlights).map(
                                ([key, value]) => {
                                    let icon = <Target size={16} />;
                                    let colorClass = "text-[var(--neon-blue)]";
                                    if (key === "style") {
                                        icon = <Palette size={16} />;
                                        colorClass = "text-[var(--neon-pink)]";
                                    } else if (key === "features") {
                                        icon = <Layers size={16} />;
                                        colorClass = "text-[var(--neon-green)]";
                                    } else if (key === "special") {
                                        icon = <Sparkles size={16} />;
                                        colorClass =
                                            "text-[var(--neon-yellow)]";
                                    }

                                    return (
                                        <div
                                            key={key}
                                            className='flex items-start gap-3'>
                                            <div
                                                className={`mt-0.5 shrink-0 ${colorClass}`}>
                                                {icon}
                                            </div>
                                            <div className='flex flex-col text-xs'>
                                                <span className='font-mono uppercase text-slate-400 tracking-wider text-[10px]'>
                                                    {key}
                                                </span>
                                                <span className='text-slate-200 font-sans mt-0.5 leading-relaxed'>
                                                    {value}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-3.5 mt-6 pt-4 border-t border-white/10'>
                            <button
                                onClick={onClose}
                                className='btn btn-outline flex-1 text-xs py-2.5'>
                                {lang === "hr" ? "Zatvori" : "Close"}
                            </button>
                            <button
                                onClick={onOrder}
                                className='btn btn-primary flex-1 text-xs py-2.5 flex items-center justify-center gap-2'>
                                <span>
                                    {lang === "hr"
                                        ? "Naruči ovaj stil"
                                        : "Order this style"}
                                </span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default TemplateModal;
