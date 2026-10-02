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
    const { lang } = useLanguage();

    return (
        <section
            id='services'
            className='py-20 mx-auto relative overflow-hidden'>
            {/* Ambient Lighting */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(0,255,136,0.06)_0%,rgba(0,245,255,0.04)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10' />

            <div className='max-w-6xl mx-auto px-4'>
                <Reveal>
                    <SectionTitle>{t.services.title}</SectionTitle>
                </Reveal>

                <Reveal delay={100}>
                    <p className='text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-6'>
                        {lang === "hr"
                            ? "Odaberite usluge koje su Vam potrebne — odabrane stavke automatski se prenose u poruku u kontakt formi ispod!"
                            : "Choose the services you need — selected options will automatically pre-fill your inquiry message in the contact form below!"}
                    </p>
                </Reveal>

                <Reveal delay={150}>
                    <div className='w-fit flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--neon-green)] mx-auto px-3.5 py-1 border border-white/10 rounded-full bg-[rgba(14,15,28,0.7)] backdrop-blur-md tracking-[0.2em] uppercase mb-8 shadow-sm'>
                        <span className='w-2 h-2 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)] animate-pulse' />
                        {t.services.subtitle || "Interdisciplinary Studio"}
                    </div>
                </Reveal>

                <Reveal delay={250}>
                    <Suspense fallback={<Spinner />}>
                        <Accordion />
                    </Suspense>
                </Reveal>
            </div>
        </section>
    );
};

export default Services;
