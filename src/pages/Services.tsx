import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { X, Check } from "lucide-react";

interface ServiceItem {
    title: string;
    desc: string;
    imgUrl: string;
    imgClass: string;
}

interface ServiceModalItem {
    id: string;
    title: string;
    desc: string;
    img: string;
}

interface ServicesContent {
    title: string;
    subtitle?: string;
    list: ServiceItem[];
    modal: {
        items: ServiceModalItem[];
        btn: string;
        total: string;
    };
}

interface ServicesProps {
    t: {
        services: ServicesContent;
    };
}

const Services: React.FC<ServicesProps> = ({ t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (id: string) => {
        setSelectedServices((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    return (
        <section id='services'>
            <div className='py-10 container mx-auto px-6'>
                <Reveal>
                    <SectionTitle>{t.services.title}</SectionTitle>
                </Reveal>
                <div className='inline-flex items-center gap-2 text-[10px] text-cyan-500 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50  tracking-[0.3em] uppercase mb-4'>
                    <span className='loader-pulse'></span>
                    {t.services.subtitle}
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-6 gap-6'>
                    {t.services.list.map(
                        (service: ServiceItem, idx: number) => (
                            <Reveal
                                key={idx}
                                delay={idx * 150}
                                className={`glass rounded-xl overflow-hidden group cursor-pointer ${
                                    idx === 0
                                        ? "lg:col-span-1"
                                        : idx === 1
                                          ? "lg:col-span-2"
                                          : idx === 2
                                            ? "lg:col-span-3"
                                            : ""
                                }`}>
                                <div className='h-48 overflow-hidden relative'>
                                    <img
                                        src={service.imgUrl}
                                        className={service.imgClass}
                                        alt='Tech Art'
                                    />
                                    <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors'></div>
                                </div>
                                <div className='p-6'>
                                    <h3 className='text-lg font-heading font-semibold text-lake-500 mb-2 group-hover:text-cyan-300 transition-colors'>
                                        {service.title}
                                    </h3>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className='text-sm text-gray-300 font-sans hover:text-cyan-400 transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-cyan-500'>
                                        More &rarr;
                                    </button>
                                </div>
                            </Reveal>
                        ),
                    )}
                </div>
            </div>

            {/* Full Screen Modal */}
            {isModalOpen &&
                createPortal(
                    <div className='fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='absolute top-6 right-6 text-slate-400 hover:text-white transition-colors'>
                            <X size={32} />
                        </button>
                        <h2 className='text-4xl font-bold font-link my-6 text-gradient'>
                            Odaberite usluge prema vašim potrebama
                        </h2>

                        <div className='w-full max-w-6xl h-[80vh] flex flex-col'>
                            <div className='flex-1 flex overflow-hidden p-4'>
                                <div className='flex flex-col md:flex-row w-full h-full gap-4'>
                                    {t.services.modal.items.map((item, idx) => {
                                        const isSelected =
                                            selectedServices.includes(item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() =>
                                                    toggleService(item.id)
                                                }
                                                className={`
                                                relative rounded-2xl border cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden
                                                flex-1 hover:flex-[3] md:hover:flex-[4]
                                                flex flex-row items-center p-6 group
                                                ${
                                                    isSelected
                                                        ? "bg-cyan-900/20 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                                        : "bg-slate-900/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60"
                                                }
                                            `}>
                                                {/* Image Background */}
                                                <div className='absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
                                                    <img
                                                        src={item.img}
                                                        alt=''
                                                        className='w-1/2 h-1/2 object-contain grayscale-30 group-hover:grayscale-0 transition-all duration-500'
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className='relative z-10 flex items-end justify-between w-full h-full gap-6'>
                                                    <div className='flex flex-col justify-between items-center h-full'>
                                                        <span
                                                            className={`font-heading font-bold text-lg md:text-xl transition-colors duration-300 [writing-mode:vertical-rl] rotate-180 ${isSelected ? "text-cyan-100" : "text-slate-300 group-hover:text-white"}`}>
                                                            {item.title}
                                                        </span>
                                                        <div
                                                            className={`rounded-full p-1 transition-all duration-300 border ${
                                                                isSelected
                                                                    ? "text-cyan-400 bg-cyan-950/50 border-transparent"
                                                                    : "text-transparent bg-slate-800/50 border-slate-700/50"
                                                            }`}>
                                                            <Check size={20} />
                                                        </div>
                                                    </div>
                                                    <div className='max-w-0 opacity-0 group-hover:max-w-96 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden'>
                                                        <p className='text-slate-400 text-sm leading-relaxed min-w-[200px]'>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className='mt-auto border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-6'>
                                <div className='text-slate-300'>
                                    <span className='text-sm uppercase tracking-widest text-slate-500 block mb-1'>
                                        {t.services.modal.total}
                                    </span>
                                    <div className='flex flex-wrap gap-2'>
                                        {selectedServices.length > 0 ? (
                                            selectedServices.map((id) => {
                                                const service =
                                                    t.services.modal.items.find(
                                                        (i) => i.id === id,
                                                    );
                                                return (
                                                    <span
                                                        key={id}
                                                        className='px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-md border border-cyan-900/50'>
                                                        {service?.title}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className='text-slate-600 italic'>
                                                -
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className='px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95'>
                                    {t.services.modal.btn}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </section>
    );
};

export default Services;
