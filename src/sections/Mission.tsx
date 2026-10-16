import React, { useState, useEffect, useRef, useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "@/components/Reveal";
import Card3D from "@/components/Card3D";
import Marquee from "@/components/Marquee";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

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
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const isCroatian = lang === "hr";

  const containerRef = useRef<HTMLDivElement>(null);
  const poleAnchorRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const knotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulsePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const pillars = useMemo(
    () => [
      {
        id: "authenticity",
        title: t.about.p1,
        label: isCroatian ? "Autentičnost" : "Authenticity",
        tag: isCroatian ? "01 // Autentičnost" : "01 // Authenticity",
        subtitle: isCroatian
          ? "Piksel-savršen i originalan karakter"
          : "Pixel-perfect & original character",
        icon: "✦",
        color: "#00f5ff",
        glow: "rgba(0, 245, 255, 0.35)",
        badgeText: isCroatian ? "UNIKATNO" : "ORIGINAL",
        description: isCroatian
          ? "Piksel-savršeni dizajn koji ne kopira generičke predloške, nego stvara jedinstveni digitalni karakter prilagođen vašoj viziji."
          : "Pixel-perfect design that rejects generic cookie-cutter templates in favor of authentic digital personality tailored to your vision.",
        position: "lg:left-0 xl:left-4 lg:top-[16%] lg:-translate-y-1/2",
      },
      {
        id: "story",
        title: t.about.p2,
        label: isCroatian ? "Narativ & emocija" : "Story & emotion",
        tag: isCroatian ? "02 // Narativ & emocija" : "02 // Story & emotion",
        subtitle: isCroatian
          ? "Humana priča i stvarna vrijednost"
          : "Human storytelling & true connection",
        icon: "♡",
        color: "#ff00aa",
        glow: "rgba(255, 0, 170, 0.35)",
        badgeText: isCroatian ? "EMOCIJA" : "EMPATHY",
        description: isCroatian
          ? "Povezujemo precizni kod i humanu priču kako bi vaši posjetitelji osjetili stvarnu vrijednost i toplinu vašeg rada."
          : "Connecting clean architecture with human storytelling so your audience feels the true value and warmth of your work.",
        position: "lg:left-0 xl:left-4 lg:top-[68%] lg:-translate-y-1/2",
      },
      {
        id: "space",
        title: t.about.p3,
        label: isCroatian
          ? "Topli digitalni prostor"
          : "A welcoming digital space",
        tag: isCroatian
          ? "03 // Topli digitalni prostor"
          : "03 // Welcoming space",
        subtitle: isCroatian
          ? "Ugodan i pristupačan web"
          : "Delightful & accessible web",
        icon: "◉",
        color: "#00ff88",
        glow: "rgba(0, 255, 136, 0.35)",
        badgeText: isCroatian ? "PRISTUPAČNO" : "ACCESSIBLE",
        description: isCroatian
          ? "Web stranice koje poštuju korisnika: pristupačne, brze, inkluzivne i ugodne za pregledavanje na svakom uređaju."
          : "Web experiences that respect the user: accessible, lightning fast, inclusive, and delightful to browse on every device.",
        position: "lg:right-0 xl:right-4 lg:top-[42%] lg:-translate-y-1/2",
      },
    ],
    [t.about.p1, t.about.p2, t.about.p3, isCroatian],
  );

  // Floating physics and dynamic tether lines (simulating balloons tied to a pole)
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    // Floating parameters for each balloon: [frequencyY, amplitudeY, frequencyX, amplitudeX, tiltAmplitude, phase]
    const floatParams = [
      { fY: 0.85, aY: 11, fX: 0.65, aX: 8, rot: 2.2, phase: 0 },
      { fY: 0.72, aY: 13, fX: 0.55, aX: 9, rot: -2.4, phase: 2.3 },
      { fY: 0.78, aY: 10, fX: 0.6, aX: 8, rot: 2.0, phase: 4.1 },
    ];

    const update = () => {
      const now = performance.now();
      const time = (now - startTime) / 1000;

      const container = containerRef.current;
      const pole = poleAnchorRef.current;

      if (!container || !pole) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const cRect = container.getBoundingClientRect();
      const isDesktop = cRect.width >= 1024;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const poleRect = pole.getBoundingClientRect();
      const poleX = poleRect.left + poleRect.width / 2 - cRect.left;
      const poleY = poleRect.top + poleRect.height / 2 - cRect.top;

      pillars.forEach((_, i) => {
        const pEl = pillarRefs.current[i];
        const knotEl = knotRefs.current[i];
        const pathEl = pathRefs.current[i];
        const glowEl = glowPathRefs.current[i];
        const pulseEl = pulsePathRefs.current[i];

        if (!pEl) return;

        const p = floatParams[i];
        const t = time + p.phase;

        // Floating offset calculation
        let floatX = 0;
        let floatY = 0;
        let floatRot = 0;

        if (!prefersReducedMotion) {
          if (isDesktop) {
            floatY = Math.sin(t * p.fY) * p.aY + Math.cos(t * 0.4) * 3;
            floatX = Math.cos(t * p.fX) * p.aX + Math.sin(t * 0.3) * 2;
            floatRot = (floatX / p.aX) * p.rot;
          } else {
            // On mobile/tablet, only apply gentle vertical breathing to preserve layout
            floatY = Math.sin(t * p.fY) * 4;
          }
        }

        pEl.style.transform = `translate3d(${floatX.toFixed(2)}px, ${floatY.toFixed(2)}px, 0) rotate(${floatRot.toFixed(2)}deg)`;

        // Calculate and update the dynamic tether line curve
        if (isDesktop && knotEl && pathEl) {
          const knotRect = knotEl.getBoundingClientRect();
          const knotX = knotRect.left + knotRect.width / 2 - cRect.left;
          const knotY = knotRect.top + knotRect.height / 2 - cRect.top;

          const dx = knotX - poleX;
          const dy = knotY - poleY;
          const dist = Math.hypot(dx, dy) || 1;

          // Gentle natural sway wave along the string
          const wave = prefersReducedMotion
            ? 0
            : Math.sin(time * 2.2 + i * 1.8) * 6;
          const normX = (-dy / dist) * wave;
          const normY = (dx / dist) * wave;

          // Control point 1: leaves the pole anchor with slight upward/outward arch
          const cp1X = poleX + dx * 0.35 + normX * 0.7;
          const cp1Y = poleY + dy * 0.25 - 20 + normY * 0.7;

          // Control point 2: enters the balloon knot vertically from underneath
          const dropOffset = Math.min(80, Math.max(35, dist * 0.18));
          const cp2X = knotX - dx * 0.05 + normX * 0.5;
          const cp2Y = knotY + dropOffset + normY * 0.5;

          const d = `M ${poleX.toFixed(1)} ${poleY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${knotX.toFixed(1)} ${knotY.toFixed(1)}`;

          pathEl.setAttribute("d", d);
          if (glowEl) glowEl.setAttribute("d", d);
          if (pulseEl) {
            pulseEl.setAttribute("d", d);
            // Traveling light pulses flowing up the string from pole to balloon
            pulseEl.style.strokeDashoffset = `${-(time * 38).toFixed(1)}px`;
          }
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pillars]);

  return (
    <section id="mission" className="relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(191,0,255,0.08)_0%,rgba(0,245,255,0.05)_50%,transparent_70%)] blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        <Reveal>
          <SectionTitle>{t.about.title}</SectionTitle>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-base text-gray-300 lg:text-lg">
            {isCroatian
              ? "Naša ljubav je u stvaranju piksel-savršenih web stranica. Svaki detalj gradimo s namjerom, pažnjom i toplom ljudskom empatijom."
              : "Our love is in creating pixel-perfect websites. Every single detail is crafted with intention, mathematical precision, and human empathy."}
          </p>
        </Reveal>

        <Reveal delay={200} className="w-full">
          <div
            ref={containerRef}
            className="relative flex w-full flex-col items-center gap-8 lg:min-h-195 lg:justify-center"
          >
            {/* Dynamic SVG Balloon Tether Strings (visible on desktop) */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible z-10 lg:block"
            >
              {pillars.map((pillar, i) => (
                <g key={`tether-${pillar.id}`}>
                  {/* Outer ambient glow halo */}
                  <path
                    ref={(el) => {
                      glowPathRefs.current[i] = el;
                    }}
                    fill="none"
                    stroke={pillar.color}
                    strokeWidth="4"
                    strokeOpacity="0.22"
                    strokeLinecap="round"
                  />
                  {/* Core tether cord */}
                  <path
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    fill="none"
                    stroke={pillar.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  {/* Animated traveling light pulses / beads */}
                  <path
                    ref={(el) => {
                      pulsePathRefs.current[i] = el;
                    }}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.75"
                    strokeDasharray="4 14"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                </g>
              ))}
            </svg>

            {/* Central feature card (the "Pole" that the balloons are tied to) */}
            <div className="relative z-20 flex flex-col items-center lg:absolute lg:left-1/2 lg:top-[52%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              {/* Pole Anchor Node / Tether Mast */}
              <div
                ref={poleAnchorRef}
                className="relative z-30 -mb-4 flex items-center gap-4 rounded-full border border-cyan-500/90  bg-slate-900 px-4 py-3"
              >
                <span className="relative flex h-2 w-2 cursor-crosshair">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-85" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                </span>
                <span className="relative flex h-2 w-2 cursor-crosshair">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-85" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_#ff00aa]" />
                </span>
                <span className="relative flex h-2 w-2 cursor-crosshair">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-85" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#00ff88]" />
                </span>
              </div>

              <Card3D lang={lang} />
            </div>

            {/* Floating Mission Pillars (the "Balloons" tied to the pole) */}
            {pillars.map((pillar, index) => {
              const isExpanded = expandedPillar === index;

              return (
                <div
                  key={pillar.id}
                  ref={(el) => {
                    pillarRefs.current[index] = el;
                  }}
                  className={`relative z-30 w-full max-w-sm will-change-transform lg:absolute lg:w-72 xl:w-80 ${pillar.position}`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedPillar(isExpanded ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedPillar(isExpanded ? null : index);
                      }
                    }}
                    className="group relative w-full cursor-pointer rounded-2xl border bg-[rgba(13,16,30,0.15)] p-5 text-left shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      borderColor: isExpanded
                        ? pillar.color
                        : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isExpanded
                        ? `0 20px 48px rgba(0, 0, 0, 0.7), 0 0 25px ${pillar.glow}`
                        : undefined,
                    }}
                  >
                    {/* Top accent highlight shimmer line */}
                    <div
                      className="pointer-events-none absolute inset-x-4 top-0 h-px transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)`,
                        opacity: isExpanded ? 1 : 0.65,
                      }}
                    />

                    {/* Subtle radial corner glow */}
                    <div
                      className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-35"
                      style={{ background: pillar.color }}
                    />

                    {/* Header: Icon, Eyebrow, and Expand Arrow */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Balloon Icon Badge */}
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-bold transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `rgba(${
                              pillar.color === "#00f5ff"
                                ? "0,245,255"
                                : pillar.color === "#ff00aa"
                                  ? "255,0,170"
                                  : "0,255,136"
                            }, 0.14)`,
                            border: `1px solid ${pillar.color}`,
                            color: pillar.color,
                            boxShadow: `0 0 6px ${pillar.glow}`,
                          }}
                        >
                          {pillar.icon}
                        </div>

                        <div>
                          <span
                            className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
                            style={{ color: pillar.color }}
                          >
                            {pillar.tag}
                            <span
                              className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{
                                backgroundColor: pillar.color,
                                boxShadow: `0 0 6px ${pillar.color}`,
                              }}
                            />
                          </span>
                          <p className="text-xs text-slate-400 font-sans line-clamp-1">
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse Chevron */}
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 group-hover:border-white/20 group-hover:text-white"
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          borderColor: isExpanded ? pillar.color : undefined,
                          color: isExpanded ? pillar.color : undefined,
                        }}
                      >
                        <ChevronDown size={14} />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 border-t border-white/10 pt-3.5 transition-all duration-300">
                        <h4 className="mb-2 text-sm font-headings font-extrabold text-white leading-snug">
                          {pillar.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-300 font-sans">
                          {pillar.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 font-mono text-[10px]">
                          <span className="text-slate-400">
                            {isCroatian ? "Status stupa" : "Pillar status"}
                          </span>
                          <span
                            className="font-bold tracking-wider"
                            style={{ color: pillar.color }}
                          >
                            ● {pillar.badgeText}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Balloon Tie Knot / Tether Ferrule */}
                    <div
                      ref={(el) => {
                        knotRefs.current[index] = el;
                      }}
                      className="pointer-events-none absolute -bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
                    >
                      <div
                        className="flex h-4 w-4 items-center justify-center rounded-full border bg-[#070714] shadow-[0_0_8px_currentColor] transition-transform duration-300 group-hover:scale-125"
                        style={{
                          borderColor: pillar.color,
                          color: pillar.color,
                        }}
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: pillar.color }}
                        />
                      </div>
                      <div
                        className="h-1.5 w-0.5 opacity-80"
                        style={{ backgroundColor: pillar.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="z-50 mt-10 w-screen">
          <Marquee />
        </div>
      </div>
    </section>
  );
};

export default Mission;
