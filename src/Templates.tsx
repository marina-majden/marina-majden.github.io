import React, { useState, useMemo } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import TemplateModal from "@/components/TemplateModal";
import { FALLBACK_IMAGE } from "@/constants";

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

const ACCENT_COLORS = [
    "var(--neon-blue)",
    "var(--neon-pink)",
    "var(--neon-yellow)",
    "var(--neon-green)",
    "var(--neon-purple)",
    "var(--neon-orange)",
];

export const Templates: React.FC<TemplatesProps> = ({ t }) => {
    const { lang } = useLanguage();

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

    const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

    const openModal = (item: TemplateItem) => {
        setSelecteditem(item);
    };

    const closeModal = () => {
        setSelecteditem(null);
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
        setVisibleCount(6);
    };

    const clearTags = () => {
        setSelectedTags([]);
        setVisibleCount(6);
    };

    const isAllChecked =
        selectedTags.length === 0 || selectedTags.length === allTags.length;

    // Filter tags styled like BentoLab tags
    const getFilterTagClass = (isActive: boolean) =>
        `px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none flex items-center gap-2 ${
            isActive
                ? "bg-[rgba(0,245,255,0.14)] text-[var(--neon-blue)] border border-[var(--neon-blue)] shadow-[0_0_12px_rgba(0,245,255,0.25)] scale-[1.02]"
                : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20"
        }`;

    return (
        <section
            className='py-20 px-4 md:px-8 bg-transparent min-h-screen relative overflow-hidden'
            id='webshop'>
            {/* Background Ambience */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(0,245,255,0.06)_0%,rgba(191,0,255,0.04)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10' />

            <div className='max-w-7xl mx-auto'>
                <Reveal>
                    <SectionTitle>{t.templates.title}</SectionTitle>
                </Reveal>
                <Reveal delay={100}>
                    <p className='text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-10 leading-relaxed font-sans'>
                        {t.templates.subtitle}
                    </p>
                </Reveal>

                {/* Filter Tags beneath Title (Designed like BentoLab tags) */}
                <div className='max-w-4xl mb-12 mx-auto flex flex-col items-center'>
                    <Reveal delay={200}>
                        <div className='flex flex-wrap justify-center gap-2 md:gap-2.5'>
                            <button
                                type='button'
                                onClick={clearTags}
                                className={getFilterTagClass(isAllChecked)}>
                                <span
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                                        isAllChecked
                                            ? "bg-[var(--neon-blue)] shadow-[0_0_6px_var(--neon-blue)] animate-pulse"
                                            : "bg-white/20"
                                    }`}
                                />
                                <span>{lang === "hr" ? "Sve" : "All"}</span>
                            </button>
                            {allTags.map((tag) => {
                                const isActive = selectedTags.includes(tag);
                                return (
                                    <button
                                        type='button'
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={getFilterTagClass(isActive)}>
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                                                isActive
                                                    ? "bg-[var(--neon-blue)] shadow-[0_0_6px_var(--neon-blue)] animate-pulse"
                                                    : "bg-white/20"
                                            }`}
                                        />
                                        <span>{tag}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>

                {/* No results message */}
                {filteredItems.length === 0 && (
                    <div className='text-center py-16 px-6 max-w-md mx-auto rounded-2xl bg-[rgba(14,15,28,0.7)] border border-white/10 backdrop-blur-md shadow-lg'>
                        <p className='text-sm text-slate-300 font-sans mb-4 leading-relaxed'>
                            {lang === "hr"
                                ? "Nije pronađen nijedan predložak za vaš odabir oznaka."
                                : "No templates found matching the selected tags."}
                        </p>
                        <button
                            type='button'
                            onClick={clearTags}
                            className='btn btn-outline text-xs px-5 py-2'>
                            {lang === "hr"
                                ? "Poništi filtere"
                                : "Clear filters"}
                        </button>
                    </div>
                )}

                {/* Structured Identity Profile Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {visibleProducts.map((item: TemplateItem, id: number) => {
                        const accent = ACCENT_COLORS[id % ACCENT_COLORS.length];
                        const initials = item.title
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                        return (
                            <article
                                key={item.id}
                                className='cyber-profile-card group'
                                style={
                                    {
                                        "--card-accent": accent,
                                    } as React.CSSProperties
                                }>
                                {/* Card Header with Monogram Avatar & Spec Tag */}
                                <div className='flex items-start justify-between gap-3'>
                                    <div className='profile-card-header'>
                                        <div className='profile-avatar'>
                                            {initials}
                                        </div>
                                        <div className='profile-names'>
                                            <h3 className='profile-name font-heading text-xl md:text-2xl text-white'>
                                                {item.title}
                                            </h3>
                                            <p className='profile-role line-clamp-1'>
                                                {item.highlights.style}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className='font-mono font-bold text-[11px] px-2.5 py-1 rounded-full border shrink-0 tracking-wider shadow-xs'
                                        style={{
                                            color: accent,
                                            borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
                                            backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                                        }}>
                                        0{id + 1} // TM
                                    </span>
                                </div>

                                {/* Tags in the box (BentoLab style in all caps) */}
                                <div className='flex flex-wrap gap-1.5'>
                                    {item.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Viewport Mockup Window */}
                                <div
                                    onMouseEnter={(e) => {
                                        const video =
                                            e.currentTarget.querySelector(
                                                "video",
                                            );
                                        if (video) video.play().catch(() => {});
                                    }}
                                    onMouseLeave={(e) => {
                                        const video =
                                            e.currentTarget.querySelector(
                                                "video",
                                            );
                                        if (video) video.pause();
                                    }}
                                    onClick={() => openModal(item)}
                                    className='relative h-48 rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[var(--card-accent)] transition-all duration-300 shadow-inner flex flex-col cursor-pointer'>
                                    <div className='h-6 bg-[rgba(14,15,28,0.9)] border-b border-white/10 px-3 flex items-center gap-1.5 shrink-0 z-10'>
                                        <span className='w-2 h-2 rounded-full bg-rose-500/80' />
                                        <span className='w-2 h-2 rounded-full bg-amber-500/80' />
                                        <span className='w-2 h-2 rounded-full bg-emerald-500/80' />
                                        <span className='ml-2 font-mono text-[9px] text-slate-400 truncate opacity-70'>
                                            wm://templates/{item.id}
                                        </span>
                                    </div>

                                    <div className='relative w-full flex-1 overflow-hidden'>
                                        {item.videoUrl ? (
                                            <video
                                                src={`/templates/videos/${item.videoUrl}#t=0.1`}
                                                preload='metadata'
                                                loop
                                                muted
                                                playsInline
                                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                            />
                                        ) : (
                                            <img
                                                src={
                                                    item.screenshotHome
                                                        ? `/templates/images/${item.screenshotHome}`
                                                        : FALLBACK_IMAGE
                                                }
                                                alt={item.title}
                                                loading='lazy'
                                                decoding='async'
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        FALLBACK_IMAGE;
                                                }}
                                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                            />
                                        )}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60' />
                                    </div>
                                </div>

                                {/* Structured Specification Details */}
                                <dl className='profile-details-list'>
                                    <div className='profile-row'>
                                        <dt>
                                            {lang === "hr"
                                                ? "Namjena"
                                                : "Purpose"}
                                        </dt>
                                        <dd className='text-xs line-clamp-1 font-sans text-slate-200'>
                                            {item.highlights.purpose}
                                        </dd>
                                    </div>
                                    <div className='profile-row'>
                                        <dt>
                                            {lang === "hr" ? "Stil" : "Style"}
                                        </dt>
                                        <dd className='text-xs line-clamp-1 font-sans text-slate-200'>
                                            {item.highlights.style}
                                        </dd>
                                    </div>
                                    {item.highlights.special && (
                                        <div className='profile-row'>
                                            <dt>
                                                {lang === "hr"
                                                    ? "Posebno"
                                                    : "Special"}
                                            </dt>
                                            <dd className='text-xs line-clamp-1 font-sans text-slate-200'>
                                                {item.highlights.special}
                                            </dd>
                                        </div>
                                    )}
                                </dl>

                                {/* Action Buttons */}
                                <div className='flex items-center justify-between gap-3 mt-auto pt-1'>
                                    <button
                                        type='button'
                                        onClick={() => openModal(item)}
                                        className='btn-secondary flex-1 text-xs py-2.5 min-h-0 cursor-pointer'>
                                        {lang === "hr" ? "Pogledaj" : "Inspect"}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleOrder}
                                        className='btn btn-primary flex-1 text-xs py-2.5 min-h-0 cursor-pointer'>
                                        {lang === "hr" ? "Naruči" : "Order"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Pagination / Load more */}
                {hasMore && (
                    <div className='mt-14 text-center'>
                        <button
                            type='button'
                            onClick={handleLoadMore}
                            className='btn btn-outline px-8 py-3 text-xs font-mono font-semibold tracking-wider uppercase cursor-pointer hover:border-[var(--neon-blue)] hover:text-white transition-all'>
                            {lang === "hr" ? "Prikaži još ✦" : "Load more ✦"}
                        </button>
                    </div>
                )}
            </div>

            {/* Render fullscreen Modal */}
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
