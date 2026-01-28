import React from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

interface ServiceItem {
    title: string;
    desc: string;
    imgUrl: string;
    imgClass: string;
}

interface ServicesContent {
    title: string;
    list: ServiceItem[];
}

interface ServicesProps {
    t: {
        services: ServicesContent;
    };
}

const Services: React.FC<ServicesProps> = ({ t }) => (
    <section
        id='services'
        className='py-24 bg-linear-to-b- from-slate-900 to-slate-950'>
        <div className='container mx-auto px-6'>
            <Reveal>
                <SectionTitle>{t.services.title}</SectionTitle>
            </Reveal>
            <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-1 text-[10px] text-cyan-500 text-dynamic-cyan tracking-[0.3em] uppercase mb-4'>
                <span className='loader-pulse'></span>
                Interdisciplinarni studio
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-6 gap-6'>
                {t.services.list.map((service: ServiceItem, idx: number) => (
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
                            <p className='text-lg text-gray-300 font-sans'>
                                {service.desc}
                            </p>
                            <p className='text-lg text-gray-300 font-sans'>
                                {service.desc}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
