import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import TemplateModal from "@/components/TemplateModal";
import { FALLBACK_IMAGE } from "@/data/constants.ts";

export interface TemplateItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: {
        purpose: string;
        style: string;
        features: string;
        special?: string;
    };
    videoUrl?: string;
    screenshotHome?: string;
    screenshotDesktop?: string;
    screenshotMobile?: string;
    tags?: string[];
}
interface TemplatesContent {
    title: string;
    subtitle: string;
    standard: string;
    items: TemplateItem[];
}

interface TemplatesProps {
    t: {
        templates: TemplatesContent;
    };
    scrollToSection: (section: string) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ t }) => {
    const { lang } = useLanguage();
    const taglist = t.templates.items.map((item) => item.tags || []).flat();
    const uniqueTags = Array.from(new Set(taglist));

    const [visibleCount, setVisibleCount] = useState(6);
    const [selecteditem, setSelecteditem] = useState<TemplateItem | null>(null);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        t.templates.items.forEach((item) => {
            if (item.tags) {
                item.tags.forEach((tag) => tags.add(tag));
            }
        });
        return Array.from(tags);
    }, [t.templates.items]);

    const filteredItems = useMemo(() => {
        return t.templates.items.filter((item) => {
            const matchesTags =
                selectedTags.length === 0 ||
                item.tags?.some((tag) => selectedTags.includes(tag));

            return matchesTags;
        });
    }, [t.templates.items, selectedTags]);

    const visibleProducts = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    useEffect(() => {
        setVisibleCount(6);
    }, [selectedTags]);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
    const openModal = (item: TemplateItem) => {
        setSelecteditem(item);
        document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
        setSelecteditem(null);
        document.body.style.overflow = "auto";
    };

    const handleOrder = () => {
        closeModal();
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.hash = "#services";
        }
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    const isAllChecked =
        selectedTags.length === 0 || selectedTags.length === allTags.length;

    // Pomoćna funkcija za klase tagova (DRY princip)
    const getTagClass = (isActive: boolean) =>
        `mb-2 px-4 py-1.5 rounded-full transition-all duration-200 ease-in-out font-mono font-semibold text-xs text-shadow-xs text-shadow-black tracking-wide cursor-pointer select-none flex items-center gap-1.5 ${
            isActive
                ? "bg-lake-500/30 text-lake-200 active:scale-95 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)] shadow-xs shadow-black"
                : "bg-lake-500/10 text-lake-500 hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(129,140,248,0.8)]"
        }`;

    return (
        <section
            className='py-16 px-4 md:px-8 bg-transparent min-h-screen'
            id='templates'>
            <div className='max-w-7xl mx-auto'>
                <Reveal>
                    <SectionTitle>{t.templates.title}</SectionTitle>
                </Reveal>
                <Reveal delay={100}>
                    <h3 className='text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl text-center mb-12 subtitles'>
                        {t.templates.subtitle}
                    </h3>
                </Reveal>

                {/* Filters */}

                <div className='max-w-4xl mb-10 mx-auto flex flex-col items-center space-y-6'>
                    {/* Tags */}
                    <Reveal delay={200}>
                        <div className='flex flex-wrap justify-center gap-2'>
                            <button
                                onClick={() => setSelectedTags([])}
                                className={getTagClass(isAllChecked)}>
                                {lang === "hr" ? "Sve" : "All"}
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={getTagClass(
                                        selectedTags.includes(tag),
                                    )}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Poruka ako nema rezultata */}
                {filteredItems.length === 0 && (
                    <div className='text-center py-20'>
                        <p className='text-xl text-gray-500'>
                            {lang === "hr"
                                ? "Nije pronađen nijedan predložak za vašu pretragu."
                                : "No templates found matching your criteria."}
                        </p>
                        <button
                            onClick={() => {
                                setSelectedTags([]);
                            }}
                            className='text-xl text-lake-700 font-link font-semibold hover:underline'>
                            {lang === "hr"
                                ? "Poništi filtere"
                                : "Clear filters"}
                        </button>
                    </div>
                )}

                {/* Template Grid  */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {visibleProducts.map((item: TemplateItem, id: number) => (
                        <div
                            key={id}
                            onMouseEnter={(e) => {
                                const video =
                                    e.currentTarget.querySelector("video");
                                if (video) video.play();
                            }}
                            onMouseLeave={(e) => {
                                const video =
                                    e.currentTarget.querySelector("video");
                                if (video) video.pause();
                            }}
                            className='bg-slate-900/50 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 border border-slate-700'>
                            <div className='h-56 overflow-hidden relative group'>
                                {item.videoUrl ? (
                                    <video
                                        src={`/templates/videos/${item.videoUrl}#t=0.1`}
                                        preload='metadata'
                                        loop
                                        muted
                                        playsInline
                                        className='w-full h-full object-cover cursor-pointer'
                                    />
                                ) : (
                                    <img
                                        src={
                                            item.screenshotHome ||
                                            FALLBACK_IMAGE
                                        }
                                        alt={item.title}
                                        loading='lazy'
                                        decoding='async'
                                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                    />
                                )}
                            </div>

                            <div className='p-6 flex flex-col grow relative'>
                                <div className='flex flex-wrap gap-2 mb-4 -mt-2'>
                                    {item.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-lake-300 bg-lake-900/30 rounded-full border border-lake-800/60 backdrop-blur-sm'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className='text-xl font-heading font-bold text-white mb-2'>
                                    {item.title}
                                </h3>
                                <p className='text-gray-300 font-sans text-sm grow mb-6 leading-relaxed'>
                                    {item.subtitle}
                                </p>

                                {/* Gumbi */}
                                <div className='flex items-center justify-between mt-auto space-x-3'>
                                    <button
                                        onClick={() => openModal(item)}
                                        className='flex-1 px-4 py-2.5 border-2 border-lake-600 text-lake-600 font-semibold text-sm rounded-xl  hover:text-background hover:bg-lake-500 transition-colors duration-200 ease-in focus:ring-2 focus:ring-lake-500 focus:outline-none cursor-pointer'>
                                        {lang === "hr" ? "Pogledaj" : "View"}
                                    </button>
                                    <button
                                        onClick={handleOrder}
                                        className='flex-1 px-4 py-2.5 bg-lake-600 text-white font-semibold text-sm rounded-xl hover:bg-lake-700 transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-lake-500 focus:outline-none'>
                                        {lang === "hr" ? "Naruči" : "Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginacija / Učitaj još */}
                {hasMore && (
                    <div className='mt-14 text-center'>
                        <button
                            onClick={handleLoadMore}
                            className='px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5'>
                            {lang === "hr" ? "Prikaži još" : "Load more"}
                        </button>
                    </div>
                )}
            </div>

            {/* Render the fullscreen Modal */}
            {selecteditem && (
                <TemplateModal
                    product={selecteditem}
                    isOpen={!!selecteditem}
                    standard={t.templates.standard}
                    onClose={closeModal}
                    onOrder={handleOrder}
                />
            )}
        </section>
    );
};

export default Templates;
