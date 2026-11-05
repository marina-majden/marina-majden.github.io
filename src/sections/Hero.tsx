import React, { useEffect, useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import CrystalBall from "@/components/CrystalBall";

interface HeroContent {
  line1: string;
  line2: string;
  line3: string;
  cta: string;
}

interface NavContent {
  projects: string;
}

interface HeroProps {
  t: {
    hero: HeroContent;
    nav: NavContent;
  };
  scrollToSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ t, scrollToSection }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate mx-auto mt-8 min-h-[calc(100svh-5rem)] w-full overflow-hidden pt-8 md:mt-10 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <CrystalBall sceneOnly className="absolute inset-0 overflow-hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-page-bg via-page-bg/80 to-transparent md:hidden" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] items-end px-4 pb-6 sm:px-6 md:min-h-[calc(100svh-12rem)] md:items-center md:pb-0">
        <div className="w-full max-w-3xl text-center md:text-left">
          <div
            className={`mb-7 inline-flex items-center gap-2 rounded-full border border-border-medium bg-page-bg/70 px-3 py-1.5 font-mono text-xs text-neon-cyan shadow-sm backdrop-blur-md transition-all duration-700 ${
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Terminal size={13} className="animate-pulse" aria-hidden="true" />
            <span>v3.0.0 // Portfolio initialized</span>
          </div>

          <h1
            className={`w-full bg-title-gradient bg-clip-text font-display text-6xl leading-[0.98] text-transparent transition-all duration-700 delay-100 sm:text-7xl md:text-8xl ${
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {t.hero.line1}
          </h1>

          {t.hero.line2 && (
            <p
              className={`mt-6 max-w-2xl font-links text-xl font-semibold uppercase leading-snug tracking-[0.12em] text-neon-cyan transition-all duration-700 delay-200 sm:text-2xl ${
                heroLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              {t.hero.line2}
            </p>
          )}

          {t.hero.line3 && (
            <p
              className={`mt-5 max-w-xl font-sans text-base leading-relaxed text-text-soft transition-all duration-700 delay-300 sm:text-lg ${
                heroLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              {t.hero.line3}
            </p>
          )}

          <div
            className={`mt-8 flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-500 sm:flex-row md:justify-start ${
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="button-base button-primary min-h-12 px-6 text-xs transition-transform hover:scale-105 active:scale-95"
            >
              {t.hero.cta}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="button-base button-ghost min-h-12 rounded-full px-6 text-xs transition-transform hover:scale-105 active:scale-95"
            >
              {t.nav.projects}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
