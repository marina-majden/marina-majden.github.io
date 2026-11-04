import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RetroTvProps {
  title: string;
  videoSrc?: string;
  posterSrc?: string;
  accent: string;
  onPreview: () => void;
  onPrevious: () => void;
  onNext: () => void;
  activeIndex: number;
  slideCount: number;
  onSelectSlide: (index: number) => void;
}

const RetroTv: React.FC<RetroTvProps> = ({
  title,
  videoSrc,
  posterSrc,
  accent,
  onPreview,
  onPrevious,
  onNext,
  activeIndex,
  slideCount,
  onSelectSlide,
}) => (
  <div className="relative mx-auto w-full max-w-5xl px-3 pb-4 sm:px-8">
    <div
      className="relative z-20 rounded-[2rem] border border-white/70 bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 p-3 shadow-[inset_-10px_-10px_24px_rgba(0,0,0,0.2),inset_8px_8px_18px_rgba(255,255,255,0.9),0_24px_50px_rgba(0,0,0,0.55)] sm:rounded-[2.75rem] sm:p-5"
      style={{
        boxShadow: `inset -10px -10px 24px rgba(0,0,0,.2), inset 8px 8px 18px rgba(255,255,255,.9), 0 24px 50px rgba(0,0,0,.55), 0 0 34px color-mix(in srgb, ${accent} 28%, transparent)`,
      }}
    >
      <button
        type="button"
        onClick={onPreview}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] border-[7px] border-slate-800 bg-black text-left shadow-[inset_0_0_24px_rgba(0,0,0,.9),0_0_24px_color-mix(in_srgb,var(--tv-accent)_35%,transparent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 sm:rounded-[2rem] sm:border-[10px]"
        style={{ "--tv-accent": accent } as React.CSSProperties}
        aria-label={title}
      >
        {videoSrc ? (
          <video
            key={videoSrc}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          <img
            src={posterSrc}
            alt={`${title} preview`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        )}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_12px_14px_28px_rgba(255,255,255,.14),inset_-12px_-16px_30px_rgba(0,0,0,.62)]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 50%, rgba(0,0,0,.16) 50%)",
            backgroundSize: "100% 4px",
          }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-12 sm:px-7 sm:pb-6">
          <span
            className="block border-l-2 pl-3 font-headings text-lg font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-2xl"
            style={{ borderColor: accent }}
          >
            {title}
          </span>
        </span>
      </button>
    </div>

    <div
      className="relative z-10 mx-auto -mt-1 flex h-16 w-[64%] max-w-80 items-center justify-center border-x border-white/20 bg-gradient-to-b from-slate-700 to-slate-950 px-4 shadow-[inset_0_8px_14px_rgba(255,255,255,0.06),0_10px_18px_rgba(0,0,0,0.55)] sm:h-20"
      style={{ clipPath: "polygon(34% 0, 66% 0, 88% 100%, 12% 100%)" }}
    >
      <div
        className="flex h-full w-[72%] flex-col items-center justify-center gap-2 py-2 sm:gap-2.5"
        role="group"
        aria-label="Featured template navigation"
        style={{ clipPath: "polygon(31% 0, 69% 0, 92% 100%, 8% 100%)" }}
      >
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectSlide(index)}
            aria-label={`Show featured template ${index + 1}`}
            aria-pressed={activeIndex === index}
            className="h-2 rounded-full transition-all duration-300 hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            style={{
              width: `${56 + index * 12}%`,
              backgroundColor: activeIndex === index ? "#ff3cac" : "#be185d",
              opacity: activeIndex === index ? 1 : 0.55,
              boxShadow:
                activeIndex === index
                  ? "0 0 8px #ec4899, 0 0 18px rgba(236,72,153,.9)"
                  : "0 0 7px rgba(236,72,153,.45)",
            }}
          />
        ))}
      </div>
    </div>

    <div
      className="relative z-10 mx-auto -mt-px flex h-18 w-[min(80%,25rem)] items-center justify-between rounded-t-[16px] rounded-b-lg border border-t-0 border-slate-500/70 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 px-5 shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.35),inset_3px_3px_10px_rgba(255,255,255,0.08),0_12px_20px_rgba(0,0,0,0.65)] sm:h-20 sm:px-8"
      style={{ clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}
    >
      <button
        type="button"
        onClick={onPrevious}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-gradient-to-br from-slate-500 to-slate-800 text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.28),inset_-3px_-3px_6px_rgba(0,0,0,0.5),0_5px_12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-[var(--tv-accent)] hover:text-[var(--tv-accent)] hover:shadow-[0_0_18px_var(--tv-accent),inset_2px_2px_4px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        style={{ "--tv-accent": accent } as React.CSSProperties}
        aria-label="Previous featured template"
        title="Previous featured template"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        className="grid grid-cols-5 gap-1.5 rounded-full border border-gray-500/60 bg-gray-800 p-3 shadow-[inset_0_0_12px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.3)]"
        aria-hidden="true"
      >
        {Array.from({ length: 15 }, (_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-gray-950 shadow-[inset_0_1px_2px_rgba(255,255,255,0.28)]"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-gradient-to-br from-slate-500 to-slate-800 text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.28),inset_-3px_-3px_6px_rgba(0,0,0,0.5),0_5px_12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-[var(--tv-accent)] hover:text-[var(--tv-accent)] hover:shadow-[0_0_18px_var(--tv-accent),inset_2px_2px_4px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        style={{ "--tv-accent": accent } as React.CSSProperties}
        aria-label="Next featured template"
        title="Next featured template"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

export default RetroTv;
