import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import TemplateModal from "@/components/TemplateModal";

export interface TemplateItem {
    id: string;
    title: string;
    shortDesc: string;
    longDesc: string;
    features: string[];
    coverImage: string;
    gallery: string[];
    videoUrl?: string;
    tags: string[];
}
interface TemplatesContent {
    title: string;
    subtitle: string;
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
    const taglist = t.templates.items.map((item) => item.tags).flat();
    const uniqueTags = Array.from(new Set(taglist));
    console.log("Unique Tags:", uniqueTags);

    const [visibleCount, setVisibleCount] = useState(6);
    const [selecteditem, setSelecteditem] = useState<TemplateItem | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
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
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                searchTerm === "" ||
                item.title.toLowerCase().includes(searchLower) ||
                item.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchLower),
                );

            const matchesTags =
                selectedTags.length === 0 ||
                item.tags?.some((tag) => selectedTags.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [t.templates.items, searchTerm, selectedTags]);

    const visibleProducts = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    useEffect(() => {
        setVisibleCount(6);
    }, [searchTerm, selectedTags]);

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

    return (
        <section
            className='py-16 px-4 md:px-8 bg-transparent min-h-screen'
            id='templates'>
            <div className='max-w-7xl mx-auto'>
                <Reveal>
                    <SectionTitle>{t.templates.title}</SectionTitle>
                </Reveal>
                <Reveal delay={100}>
                    <div className='text-center mb-12'>
                        <h3 className='text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl'>
                            {t.templates.subtitle}
                        </h3>
                    </div>
                </Reveal>

                {/* Search and filters */}

                <div className='max-w-4xl mb-10 mx-auto flex flex-col items-center space-y-6'>
                    <Reveal delay={200}>
                        <div className='relative w-full max-w-md'>
                            <input
                                type='text'
                                placeholder={
                                    lang === "hr"
                                        ? "Pretraži predloške ili tagove..."
                                        : "Search templates or tags..."
                                }
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full px-5 py-3 pl-12 rounded-full border border-lake-800 bg-lake-800/20 text-gray-400 focus:ring-2 focus:ring-lake-600/50 focus:border-lake-600/80 shadow-sm transition-all outline-none'
                            />
                            <svg
                                className='absolute left-4 top-3.5 h-5 w-5 text-gray-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                        </div>
                    </Reveal>

                    {/* Tags */}
                    <Reveal delay={300}>
                        <div className='flex flex-wrap justify-center gap-2'>
                            <button
                                onClick={() => setSelectedTags([])}
                                className={`px-4 py-2 rounded-3xl text-sm font-semibold text-lake-600 border border-lake-600/80 hover:bg-lake-600/60 transition-colors duration-200 ease-in-out ${
                                    isAllChecked
                                        ? "bg-lake-600/60 text-lake-100 border-lake-600"
                                        : "bg-background/50 "
                                }`}>
                                {lang === "hr" ? "Sve" : "All"}
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-4 py-2 rounded-3xl text-sm font-semibold tracking-wider text-lake-600 border border-lake-600/80 hover:text-lake-200 hover:bg-lake-600/60  transition-colors duration-100 ease-in-out shadow-md ${
                                        selectedTags.includes(tag)
                                            ? "bg-lake-600/60 text-lake-100 border-inset"
                                            : "bg-background/50 text-lake-600"
                                    }`}>
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
                                setSearchTerm("");
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
                            className='bg-slate-900/50 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 border border-slate-700'>
                            <div className='h-56 overflow-hidden relative group'>
                                <img
                                    src={item.coverImage}
                                    alt={item.title}
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                            </div>

                            <div className='p-6 flex flex-col grow relative'>
                                <div className='flex flex-wrap gap-2 mb-3 -mt-2'>
                                    {item.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2.5 py-1 text-[10px] md:text-xs font-link font-bold uppercase tracking-wider text-lake-700 bg-lake-50 rounded-xl border border-lake-500 hover:text-background hover:bg-lake-500 transition-colors duration-200 ease-in-out cursor-pointer'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className='text-xl font-heading font-bold text-white mb-2'>
                                    {item.title}
                                </h3>
                                <p className='text-gray-300 font-sans text-sm grow mb-6 leading-relaxed'>
                                    {item.shortDesc}
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
                    onClose={closeModal}
                    onOrder={handleOrder}
                />
            )}
        </section>
    );
};

export default Templates;
