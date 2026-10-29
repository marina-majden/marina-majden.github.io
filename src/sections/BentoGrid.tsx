import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { experimentalApps, ExperimentalApp } from "@/data/apps";
import { useLanguage } from "@/context/LanguageContext";
import {
  PixelMoon,
  PixelBrush,
  PixelStar,
  MiniPixelHeart,
} from "@/components/PixelArt";
import {
  ArrowUpRight,
  Sparkles,
  Box,
  Network,
  Palette,
  Compass,
  Timer,
  Music,
  VenusAndMars,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const BentoGrid: React.FC = () => {
  const { lang } = useLanguage();
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);

  const getAppIcon = (id: string) => {
    switch (id) {
      case "cleanflow":
        return (
          <img
            src={cleanflow.logo}
            alt="cleanflow-logo"
            width="72px"
            height="72px"
          />
        );
      case "elementos":
        return <PixelMoon scale={0.75} className="scale-75" />;
      case "tarot":
        return <VenusAndMars size={36} className="text-neon-violet" />;
      case "liquid":
        return <Box size={24} className="text-neon-blue" />;
      case "neural-network":
        return <Network size={24} className="text-neon-violet" />;
      case "chromalab":
        return <Palette size={24} className="text-neon-pink" />;
      case "color-chemist":
        return <Sparkles size={24} className="text-neon-yellow" />;
      case "flowchart":
        return <Compass size={24} className="text-neon-green" />;
      case "countdown":
        return <Timer size={24} className="text-neon-yellow" />;
      case "plur":
        return <Music size={24} className="text-neon-blue" />;
      default:
        return <MiniPixelHeart scale={0.9} />;
    }
  };

  // Helper to render appropriate link (internal React Router vs external HTML app)
  const renderAppLink = (
    app: ExperimentalApp,
    children: React.ReactNode,
    className: string,
  ) => {
    if (app.route.startsWith("/pages/")) {
      return (
        <Link to={app.route} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={app.directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  };

  // Map app by id
  const appsById: Record<string, ExperimentalApp> = {};
  experimentalApps.forEach((a) => {
    appsById[a.id] = a;
  });

  const cleanflow = appsById["cleanflow"];
  const elementos = appsById["elementos"];
  const liquid = appsById["liquid"];
  const chromalab = appsById["chromalab"];
  const tarot = appsById["tarot"];
  const neural = appsById["neural-network"];
  const chemist = appsById["color-chemist"];
  const flowchart = appsById["flowchart"];
  const countdown = appsById["countdown"];
  const plur = appsById["plur"];
  const screenshots = cleanflow?.images ?? [];
  const isScreenshotOpen = activeScreenshot !== null;
  const screenshotCount = screenshots.length;

  useEffect(() => {
    if (!isScreenshotOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveScreenshot(null);
      if (event.key === "ArrowLeft") {
        setActiveScreenshot((current) =>
          current === null
            ? null
            : (current - 1 + screenshotCount) % screenshotCount,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveScreenshot((current) =>
          current === null ? null : (current + 1) % screenshotCount,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isScreenshotOpen, screenshotCount]);

  const showPreviousScreenshot = () => {
    setActiveScreenshot((current) =>
      current === null
        ? null
        : (current - 1 + screenshots.length) % screenshots.length,
    );
  };

  const showNextScreenshot = () => {
    setActiveScreenshot((current) =>
      current === null ? null : (current + 1) % screenshots.length,
    );
  };

  return (
    <section id="lab" className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-137.5 h-137.5 bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,rgba(191,0,255,0.06)_50%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionTitle>
            {lang === "hr" ? "Igralište" : "Playground"}
          </SectionTitle>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-gray-300 max-w-2xl mx-auto text-base lg:text-lg text-center mt-3 mb-12">
            {lang === "hr"
              ? "Prostor za moje autorske projekte. Sve aplikacije i alati su potpuno beslatni i možete ih koristiti direktno u pregledniku. Ako vam se nešto svidi, možete pomoći održavanju projekta donacijom ili doprinijeti razvoju suradnjom na GitHubu."
              : "A space for my personal projects. All apps and tools are completely free to use and you can run them right here in the browser. If there is something you really like, you can support the project with donation. If you wish to engage, you can expand the project on the GitHub. "}
          </p>
        </Reveal>

        {/* 12-Column Editorial Bento Grid */}
        <div className="bento-grid w-screen max-w-5xl p-0 m-auto">
          {/* Bento Box 1: CleanFlow(Hero Featured - 7 cols) */}
          {cleanflow && (
            <div
              className="bento-card col-span-12 lg:col-span-7 row-span-2 group min-h-80"
              style={
                {
                  "--bento-accent": "var(--color-neon-blue)",
                } as React.CSSProperties
              }
            >
              {/* Radial Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,245,255,0.18)_0%,transparent_70%)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bento-eyebrow">
                    {lang === "hr"
                      ? "01 // Igrica za spremanje i organizaciju doma"
                      : "01 // Gamified Cleaning & Housekeeping App"}
                  </span>
                  {cleanflow.badge && (
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[rgba(0,245,255,0.15)] text-neon-blue border border-neon-blue">
                      {cleanflow.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="grow">
                    {" "}
                    <h3 className="text-3xl font-headings font-extrabold text-white mb-2">
                      {cleanflow.title}
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                      {cleanflow.description}
                    </p>
                  </div>
                  <div className="shrink">
                    <img
                      src={cleanflow.logo}
                      alt="CleanQuest logo"
                      width="92px"
                      height="92px"
                    />
                  </div>
                </div>
              </div>

              {/* Screenshots Gallery */}
              <div className="my-auto flex flex-wrap items-center justify-between object-fit">
                {screenshots.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveScreenshot(index)}
                    aria-label={`${lang === "hr" ? "Otvori cijelu sliku" : "View full image"} ${index + 1}`}
                    className="w-1/3 cursor-zoom-in rounded-md focus-visible:outline-2 focus-visible:outline-neon-blue"
                  >
                    <img
                      src={image}
                      alt={`${cleanflow.title} screenshot ${index + 1}`}
                      className="w-full rounded-md border-neon-blue"
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {cleanflow.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {renderAppLink(
                  cleanflow,
                  <>
                    <span>{lang === "hr" ? "Pokreni" : "Launch"}</span>
                    <ArrowUpRight size={22} />
                  </>,
                  "button-base button-ghost text-xs px-4 py-1.5 min-h-0",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 2: Elementos (Featured Medium - 5 cols) */}
          {elementos && (
            <div
              className="bento-card col-span-12 lg:col-span-5 row-span-2 group min-h-80"
              style={
                {
                  "--bento-accent": "var(--color-neon-pink)",
                } as React.CSSProperties
              }
            >
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,0,170,0.15)_0%,transparent_70%)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bento-eyebrow">02 // Ambient Space</span>
                  {elementos.badge && (
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[rgba(255,0,170,0.15)] text-neon-pink border border-neon-pink">
                      {elementos.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-headings font-extrabold text-white mb-2">
                  {elementos.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {elementos.description}
                </p>
              </div>

              <div className="my-auto flex items-center justify-center py-2">
                {getAppIcon("elementos")}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {elementos.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {renderAppLink(
                  elementos,
                  <>
                    <span>{lang === "hr" ? "Istraži" : "Explore"}</span>
                    <ArrowUpRight size={15} />
                  </>,
                  "button-base button-ghost text-xs px-4 py-1.5 min-h-0",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 3: Liquid Cube (4 cols) */}
          {liquid && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-4 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-blue)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">{getAppIcon("liquid")}</div>
                <span className="bento-eyebrow">Physics • 3D</span>
                <h3 className="text-xl font-headings font-bold text-white">
                  {liquid.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {liquid.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">
                  WebGL Fluid
                </span>
                {renderAppLink(
                  liquid,
                  <ArrowUpRight size={15} />,
                  "text-neon-blue hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 4: ChromaLab (5 cols) */}
          {chromalab && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-5 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-violet)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">
                  {getAppIcon("chromalab")}
                </div>
                <span className="bento-eyebrow">OKLCH • Color Science</span>
                <h3 className="text-xl font-headings font-bold text-white">
                  {chromalab.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {chromalab.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">
                  CSS @property
                </span>
                {renderAppLink(
                  chromalab,
                  <ArrowUpRight size={15} />,
                  "text-neon-violet hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 5: tarot Experience (3 cols) */}
          {tarot && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-3 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-yellow)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">{getAppIcon("tarot")}</div>
                <span className="bento-eyebrow">Pixel Art • Retro</span>
                <h3 className="text-xl font-headings font-bold text-white">
                  {tarot.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {tarot.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">
                  Retro 8-bit
                </span>
                {renderAppLink(
                  tarot,
                  <ArrowUpRight size={15} />,
                  "text-neon-yellow hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 6: Neural Network (4 cols) */}
          {neural && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-4 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-green)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">
                  {getAppIcon("neural-network")}
                </div>
                <span className="bento-eyebrow">Three.js • Bloom</span>
                <h3 className="text-xl font-headings font-bold text-white">
                  {neural.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {neural.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">
                  Synapse Graph
                </span>
                {renderAppLink(
                  neural,
                  <ArrowUpRight size={15} />,
                  "text-neon-green hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 7: Color Chemist (3 cols) */}
          {chemist && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-3 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-pink)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">
                  {getAppIcon("color-chemist")}
                </div>
                <span className="bento-eyebrow">Palette Mixer</span>
                <h3 className="text-lg font-headings font-bold text-white">
                  {chemist.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {chemist.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">
                  Canvas tool
                </span>
                {renderAppLink(
                  chemist,
                  <ArrowUpRight size={15} />,
                  "text-neon-pink hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 8: Flowchart Labirint (2 cols or 3 cols) */}
          {flowchart && (
            <div
              className="bento-card col-span-12 sm:col-span-6 lg:col-span-2 group"
              style={
                {
                  "--bento-accent": "var(--color-neon-blue)",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="bento-icon-circle">
                  {getAppIcon("flowchart")}
                </div>
                <span className="bento-eyebrow">Logic</span>
                <h3 className="text-base font-headings font-bold text-white">
                  {flowchart.title}
                </h3>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400">2D</span>
                {renderAppLink(
                  flowchart,
                  <ArrowUpRight size={15} />,
                  "text-neon-blue hover:scale-125 transition-transform",
                )}
              </div>
            </div>
          )}

          {/* Bento Box 9: 3D Countdown & Plur (3 cols) */}
          <div
            className="bento-card col-span-12 sm:col-span-6 lg:col-span-3 group"
            style={
              {
                "--bento-accent": "var(--color-neon-yellow)",
              } as React.CSSProperties
            }
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bento-icon-circle w-9 h-9 min-w-9 mb-0">
                  <Timer size={16} />
                </div>
                <div className="bento-icon-circle w-9 h-9 min-w-9 mb-0">
                  <Music size={16} />
                </div>
              </div>
              <span className="bento-eyebrow">Audio & Time Sculptures</span>
              <h3 className="text-lg font-headings font-bold text-white mt-1">
                Countdown & Plur
              </h3>
              <p className="text-xs text-slate-300">
                {lang === "hr"
                  ? "3D kinetički brojač vremena i audio-vizualni generativni eksperimenti."
                  : "3D kinetic countdown sculpture and generative audio-visual soundscapes."}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center gap-2">
              {countdown &&
                renderAppLink(
                  countdown,
                  <span>Countdown ↗</span>,
                  "font-mono text-[11px] text-neon-yellow hover:underline",
                )}
              {plur &&
                renderAppLink(
                  plur,
                  <span>Plur ↗</span>,
                  "font-mono text-[11px] text-neon-blue hover:underline",
                )}
            </div>
          </div>
        </div>
      </div>
      {activeScreenshot !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
            role="dialog"
            aria-modal="true"
            aria-label={`${cleanflow?.title ?? "Screenshot"} gallery`}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setActiveScreenshot(null);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setActiveScreenshot(null)}
              aria-label={lang === "hr" ? "Zatvori galeriju" : "Close gallery"}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={24} />
            </button>

            <img
              src={screenshots[activeScreenshot]}
              alt={`${cleanflow?.title ?? "Screenshot"} screenshot ${activeScreenshot + 1}`}
              className="h-auto max-h-[90vh] w-screen object-contain"
            />

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousScreenshot}
                  aria-label={
                    lang === "hr" ? "Prethodna slika" : "Previous image"
                  }
                  className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:left-6"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  type="button"
                  onClick={showNextScreenshot}
                  aria-label={lang === "hr" ? "Sljedeća slika" : "Next image"}
                  className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:right-6"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-white/80">
              {activeScreenshot + 1} / {screenshots.length}
            </span>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default BentoGrid;
