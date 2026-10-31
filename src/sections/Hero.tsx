import React, { useState, useEffect, useRef } from "react";
import { Terminal, ArrowRight } from "lucide-react";
import FontSpecimen from "@/components/FontSpecimen";

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

const matrixSymbols = Array.from(
  "+ − × ÷ = ≠ ≈ ∞ √ ∑ ∏ ∫ ∂ ∆ π θ λ μ σ ω α β γ δ ε ζ η ι κ ν ξ ρ τ φ χ ψ ∈ ∉ ∩ ∪ ⊂ ⊃ ⊆ ⊇ ∧ ∨ ¬ ⇒ ⇔ ∀ ∃ ℕ ℤ ℚ ℝ ℂ | ∥ ∠ ⊥ ≅ ∝ ∴ ∵ ⊕ ⊗ ⊢ ⊨ ∇".split(
    " ",
  ),
);

const Hero: React.FC<HeroProps> = ({ t, scrollToSection }) => {
  const heroRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const lensExpandedRef = useRef(false);
  const lensProgressRef = useRef(0);
  const [heroLoaded, setHeroLoaded] = useState<boolean>(false);
  const [matrixCount, setMatrixCount] = useState(0);
  const [titleFont, setTitleFont] = useState<
    "font-cursive" | "font-headings" | "font-display"
  >("font-cursive");

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const lens = lensRef.current;
    const ring = lensRingRef.current;
    if (!hero || !lens || !ring) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let animationFrame = 0;
    let animationStart = 0;
    let animationFrom = 0;
    let maxScrollProgress = 0;
    const initialHeroTop = hero.getBoundingClientRect().top;
    const animationDuration = 480;

    const updateLens = (timestamp: number) => {
      animationFrame = 0;
      if (animationStart) {
        const progress = Math.min(
          1,
          (timestamp - animationStart) / animationDuration,
        );
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const targetProgress = lensExpandedRef.current ? 1 : 0;
        lensProgressRef.current =
          animationFrom + (targetProgress - animationFrom) * easedProgress;
        if (progress === 1) animationStart = 0;
      }

      const bounds = hero.getBoundingClientRect();
      const x = pointerX - bounds.left;
      const y = pointerY - bounds.top;
      const currentScrollProgress = Math.min(
        1,
        Math.max(0, (initialHeroTop - bounds.top) / bounds.height),
      );
      maxScrollProgress = Math.max(maxScrollProgress, currentScrollProgress);
      const expandedRadius = window.innerHeight / 4;
      const radius =
        5 +
        (expandedRadius - 5) *
          lensProgressRef.current *
          (1 - maxScrollProgress);

      lens.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
      lens.style.opacity = "1";
      ring.style.width = `${radius * 2}px`;
      ring.style.height = `${radius * 2}px`;
      ring.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.opacity = "1";

      if (animationStart) scheduleUpdate();
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateLens);
    };

    const updateMatrixCount = () => {
      const bounds = hero.getBoundingClientRect();
      const columns = Math.ceil(bounds.width / 40) + 2;
      const rows = Math.ceil(bounds.height / 40) + 2;
      setMatrixCount(columns * rows);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      scheduleUpdate();
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button, a")
      ) {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      animationFrom = lensProgressRef.current;
      lensExpandedRef.current = !lensExpandedRef.current;
      animationStart = performance.now();
      scheduleUpdate();
    };

    window.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("click", handleClick);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateMatrixCount);
    window.addEventListener("resize", scheduleUpdate);
    updateMatrixCount();
    scheduleUpdate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateMatrixCount);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate mx-auto mt-8 min-h-[calc(100svh-5rem)] w-full overflow-hidden py-8 md:mt-10"
    >
      <div ref={lensRef} className="hero-dimension-lens" aria-hidden="true">
        <div className="jp-matrix">
          {Array.from({ length: matrixCount }, (_, index) => (
            <span key={index}>
              {matrixSymbols[index % matrixSymbols.length]}
            </span>
          ))}
        </div>
        <div className="container relative z-10 mx-auto flex min-h-full flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="my-4 inline-block rounded-full border border-cyan-300/70 bg-black/70 px-3 py-1 backdrop-blur-sm">
            <span className="flex items-center gap-2 font-mono text-xs text-cyan-200">
              <Terminal size={12} /> v3.0.0 // Portfolio initialized
            </span>
          </div>
          <h1 className="w-full bg-linear-to-r from-cyan-100 via-cyan-300 to-fuchsia-300 bg-clip-text font-display text-6xl leading-loose text-transparent md:text-8xl lg:text-9xl">
            {t.hero.line1}
          </h1>
          <span className="mt-6 block font-links text-2xl font-semibold uppercase leading-none tracking-[0.2em] text-cyan-100">
            {t.hero.line2}
          </span>
          <span className="mt-6 block font-links text-2xl font-semibold uppercase leading-none tracking-[0.2em] text-fuchsia-200">
            {t.hero.line3}
          </span>
          <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="rounded-full border border-cyan-200 bg-cyan-300/15 px-6 py-3 font-semibold text-cyan-50">
              {t.hero.cta}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-fuchsia-200/50 px-6 py-3 font-semibold text-fuchsia-100">
              {t.nav.projects} <ArrowRight size={18} />
            </span>
          </div>
        </div>
      </div>
      <div
        ref={lensRingRef}
        className="hero-dimension-ring"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto flex min-h-[inherit] flex-col items-center justify-center gap-6 px-6 text-center">
        <div
          className={`inline-block my-4 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur-sm transition-all duration-800 ${
            heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-xs text-cyan-400 hover:text-cyan-500 transition-colors flex items-center gap-2 cursor-crosshair">
            <Terminal size={12} className="animate-pulse" /> v3.0.0 // Portfolio
            initialized
          </span>
        </div>
        <h1
          className={`w-full font-display bg-title-gradient bg-clip-text text-6xl leading-loose text-transparent animate-gradient-x transition-all duration-300 delay-300 md:text-8xl lg:text-9xl ${
            heroLoaded
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          {t.hero.line1}
        </h1>
        <span
          className={`block text-2xl text-slate-200 font-links uppercase mt-6 font-semibold z-30 tracking-[0.2em] leading-none transition-all duration-700 delay-500 ${
            heroLoaded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          {t.hero.line2}
        </span>
        <span
          className={`block text-2xl text-slate-200 font-links uppercase mt-6 font-semibold z-30 tracking-[0.2em] leading-none transition-all duration-700 delay-500 ${
            heroLoaded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          {t.hero.line3}
        </span>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
            heroLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="button-base button-primary backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            {t.hero.cta}
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="button-base button-ghost rounded-full transition-all duration-300 group"
          >
            {t.nav.projects}{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
