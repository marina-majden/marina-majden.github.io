import React, { lazy, Suspense } from "react";
import { Spinner } from "@/components/SpinnerLoader.tsx";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { useLanguage } from "@/components/LanguageContext";

const Accordion = lazy(() => import("@/components/Accordion.tsx"));

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
    const lang = useLanguage().lang;
    return (
        <section id='services' className='py-10 mx-auto'>
            <Reveal>
                <SectionTitle>{t.services.title}</SectionTitle>
            </Reveal>

            <Reveal delay={100}>
                <h2 className='subtitles'>
                    {lang === "hr"
                        ? "Odaberite one usluge koje su Vam potrebne!"
                        : "Choose the services you need!"}
                </h2>
            </Reveal>
            <Reveal delay={200}>
                <div className='w-fit flex items-center justify-center align-center gap-2 text-[10px] text-lake-500 mx-auto px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50  tracking-[0.3em] uppercase mb-4'>
                    <span className='loader-pulse'></span>
                    {t.services.subtitle}
                </div>
            </Reveal>
            <Reveal delay={300}>
                <Suspense fallback={<Spinner />}>
                    <Accordion />
                </Suspense>
            </Reveal>
        </section>
    );
};

export default Services;
