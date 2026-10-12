import React from "react";

const titleFonts = [
  { className: "font-cursive", label: "Devina Garden", token: "cursive" },
  {
    className: "font-headings",
    label: "Another Typewriter",
    token: "headings",
  },
  { className: "font-display", label: "Barber Chop", token: "display" },
] as const;

interface FontSpecimenProps {
  text: string;
  selectedFont: (typeof titleFonts)[number]["className"];
  onSelectFont: (font: FontSpecimenProps["selectedFont"]) => void;
}

const FontSpecimen: React.FC<FontSpecimenProps> = ({
  text,
  selectedFont,
  onSelectFont,
}) => (
  <section aria-label="Title typeface comparison" className="w-full max-w-5xl">
    <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
      Choose a title typeface
    </p>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {titleFonts.map((font) => (
        <button
          key={font.token}
          type="button"
          aria-pressed={selectedFont === font.className}
          onClick={() => onSelectFont(font.className)}
          className={`min-w-0 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan ${
            selectedFont === font.className
              ? "border-neon-cyan/60 bg-slate-900/70 shadow-[0_0_20px_rgba(0,245,255,0.12)]"
              : "border-white/10 bg-slate-950/40 hover:border-white/25"
          }`}
        >
          <span className="block truncate font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate-400">
            {font.label}
          </span>
          <span
            className={`mt-1 block truncate bg-title-gradient bg-clip-text text-2xl leading-tight text-transparent animate-gradient-x ${font.className}`}
          >
            {text}
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default FontSpecimen;
