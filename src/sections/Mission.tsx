import React, { lazy, Suspense } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "@/components/Reveal";
import { Spinner } from "@/components/SpinnerLoader.tsx";

const CardScanner = lazy(() => import("@/components/CardScanner.tsx"));

interface AboutContent {
    title: string;
    p1: string;
    p2: string;
    p3: string;
}
interface AboutProps {
    t: { about: AboutContent };
}

const Mission: React.FC<AboutProps> = ({ t }) => {
    return (
        <section id='about' className='min-h-screen w-screen'>
            <div className='w-screen h-screen flex flex-col justify-evenly items-center'>
                <Reveal>
                    <SectionTitle>{t.about.title}</SectionTitle>
                </Reveal>
                <Suspense fallback={<Spinner />}>
                    <CardScanner />
                </Suspense>
            </div>
        </section>
    );
};

export default Mission;
