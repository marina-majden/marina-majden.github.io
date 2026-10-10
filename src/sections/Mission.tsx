import React from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "@/components/Reveal";
import Card3D from "@/components/Card3D";
import Marquee from "@/components/Marquee";
import { useLanguage } from "@/components/LanguageContext";

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
  const { lang } = useLanguage();

  return (
    <section id="mission" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-[5h-125[radial-gradient(circle,rgba(191,0,255,0.08)_0%,rgba(0,245,255,0.05)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <Reveal>
          <SectionTitle>{t.about.title}</SectionTitle>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-10">
            {lang === "hr"
              ? "Naša ljubav je u stvaranju piksel-savršenih web stranica. Svaki detalj gradimo s namjerom, pažnjom i toplom ljudskom empatijom."
              : "Our love is in creating pixel-perfect websites. Every single detail is crafted with intention, mathematical precision, and human empathy."}
          </p>
        </Reveal>

        {/* 3D Interactive Feature Card Stage */}
        <Reveal delay={200} className="w-full flex justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full my-4">
            {/* 3D Card with Pixel Heart */}
            <Card3D />

            {/* Mission Pillars Cards */}
            <div className="flex flex-col gap-4 max-w-md w-full">
              <div className="p-5 rounded-2xl bg-[rgba(14,15,28,0.7)] border border-(--border-subtle) backdrop-blur-md shadow-md hover:border-(--neon-blue) transition-all duration-300">
                <div className="font-mono text-xs font-bold text-(--neon-blue) uppercase tracking-wider mb-1">
                  01 // Autentičnost
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">
                  {t.about.p1}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "hr"
                    ? "Piksel-savršeni dizajn koji ne kopira generičke predloške, nego stvara jedinstveni digitalni karakter."
                    : "Pixel-perfect design that rejects generic cookie-cutter templates in favor of authentic digital personality."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[rgba(14,15,28,0.7)] border border-(--border-subtle) backdrop-blur-md shadow-md hover:border-(--neon-pink) transition-all duration-300">
                <div className="font-mono text-xs font-bold text-(--neon-pink) uppercase tracking-wider mb-1">
                  02 // Narativ & Emocija
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">
                  {t.about.p2}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "hr"
                    ? "Povezujemo precizni kod i humanu priču kako bi vaši posjetitelji osjetili stvarnu vrijednost vašeg rada."
                    : "Connecting clean architecture with human storytelling so your audience feels the true value of your work."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[rgba(14,15,28,0.7)] border border-(--border-subtle) backdrop-blur-md shadow-md hover:border-(--neon-green) transition-all duration-300">
                <div className="font-mono text-xs font-bold text-(--neon-green) uppercase tracking-wider mb-1">
                  03 // Topli digitalni prostor
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">
                  {t.about.p3}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "hr"
                    ? "Web stranice koje poštuju korisnika: pristupačne, brze i ugodne za pregledavanje na svakom uređaju."
                    : "Web experiences that respect the user: accessible, lightning fast, and delightful to browse."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Marquee underneath looping 'in * love * in * pixel *' */}
        <div className="w-full mt-10">
          <Marquee />
        </div>
      </div>
    </section>
  );
};

export default Mission;
