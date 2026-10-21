import React, { useState } from "react";

export interface NeonFact {
  term: string;
  description: string;
}

export interface RainbowNeonGlowProps {
  title?: string;
  subtitle?: string;
  kicker?: string;
  facts?: NeonFact[];
  initialTheme?: "dark" | "light";
}

const DEFAULT_FACTS: NeonFact[] = [
  {
    term: "hue path",
    description: "interpolated in oklch, chroma held through the middle",
  },
  {
    term: "widening",
    description: "scale the pre-blurred layer, not the blur radius",
  },
  {
    term: "contrast",
    description: "opaque surface keeps the glow outside the reading area",
  },
];

export const RainbowNeonGlow: React.FC<RainbowNeonGlowProps> = ({
  title = "A glow that changes colour across the surface",
  subtitle = "Stacked shadows in separate hues, or one blurred gradient layer. The first is cheap and stepped; the second is smooth and costs a rasterised layer.",
  kicker = "Two routes to a hue sweep",
  facts = DEFAULT_FACTS,
  initialTheme = "dark",
}) => {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <section
      aria-labelledby="neon-glow-heading"
      className={`w-full min-h-screen relative block box-border font-sans transition-colors duration-300 ${
        isDark
          ? "bg-[#0a0a0c] text-[#f4f4f7] bg-radial-grid"
          : "bg-[#ececef] text-[#121216]"
      }`}
    >
      <div className="max-w-[68rem] mx-auto p-[clamp(1.75rem,5vw,2.5rem)_clamp(1.25rem,5vw,2.25rem)_clamp(2.25rem,6vw,3rem)] grid gap-[clamp(1.5rem,4vw,2rem)]">
        {/* Theme Switcher Button */}
        <div className="absolute top-[clamp(10px,2vw,18px)] right-[clamp(10px,2vw,18px)] z-10 flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex items-center gap-1.6 min-h-[44px] px-3.2 border border-current text-[0.7rem] tracking-[0.12em] uppercase cursor-pointer transition-opacity duration-200 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark ? "opacity-70 text-[#f4f4f7]" : "opacity-70 text-[#121216]"
            }`}
            aria-label="Toggle light or dark theme"
          >
            <svg
              className="w-3.6 h-3.6 flex-none"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="8"
                cy="8"
                r="2.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Flip light / dark
          </button>
        </div>

        {/* Header */}
        <header className="flex flex-col">
          <p className="m-0 mb-2 font-[var(--font-display)] text-[0.8rem] tracking-[0.08em] color-[var(--color-neon-h3)]">
            {kicker}
          </p>
          <h2
            id="neon-glow-heading"
            className="m-0 font-[var(--font-display)] text-[clamp(1.4rem,4.8vw,2.1rem)] font-semibold tracking-[-0.01em] text-balance"
          >
            {title}
          </h2>
          <p
            className={`mt-2.4 mb-0 max-w-[42rem] text-[0.9rem] leading-[1.6] text-pretty ${
              isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
            }`}
          >
            {subtitle}
          </p>
        </header>

        {/* Comparison Section */}
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2">
          {/* Option 1: Stacked Shadows */}
          <figure className="m-0 grid gap-2.8 min-inline-size-0">
            <figcaption
              className={`flex items-center gap-2.4 flex-wrap text-[0.78rem] min-inline-size-0 ${
                isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
              }`}
            >
              <span
                className={`py-0.8 px-2 border rounded-[0.2rem] font-[var(--font-display)] text-[0.68rem] tracking-[0.04em] ${
                  isDark ? "border-[#26262e]" : "border-[#c8c8d0]"
                }`}
              >
                Stacked shadows
              </span>
              four hues, offset per edge &mdash; stepped, one property
            </figcaption>

            <div
              className={`grid place-items-center min-h-[clamp(12rem,34vw,16rem)] p-[clamp(1.75rem,7vw,3rem)] border rounded-2xl bg-black/25 overflow-hidden ${
                isDark ? "border-[#26262e]" : "border-[#c8c8d0]"
              }`}
            >
              <div
                className={`relative w-full max-w-[20rem] grid gap-1.6 p-[clamp(1rem,4vw,1.4rem)] border rounded-xl isolate ${
                  isDark
                    ? "bg-[#121216] border-[#26262e]"
                    : "bg-white border-[#c8c8d0]"
                }`}
                style={{
                  boxShadow: `
                    -0.4rem -0.4rem clamp(1rem, 4vw, 1.5rem) color-mix(in srgb, var(--color-neon-h1) 45%, transparent),
                     0.4rem  0.4rem clamp(1rem, 4vw, 1.5rem) color-mix(in srgb, var(--color-neon-h3) 45%, transparent),
                    -0.4rem  0.4rem clamp(1.25rem, 5vw, 1.9rem) color-mix(in srgb, var(--color-neon-h4) 35%, transparent),
                     0.4rem -0.4rem clamp(1.25rem, 5vw, 1.9rem) color-mix(in srgb, var(--color-neon-h2) 35%, transparent)
                  `,
                }}
              >
                <p className="m-0 font-[var(--font-display)] text-[1.05rem] font-semibold">
                  Prism release
                </p>
                <p
                  className={`m-0 text-[0.82rem] leading-[1.55] text-pretty ${
                    isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
                  }`}
                >
                  Four shadow layers, each in its own hue, offset a few pixels
                  so the overlaps mix.
                </p>
              </div>
            </div>
          </figure>

          {/* Option 2: Blurred Gradient */}
          <figure className="m-0 grid gap-2.8 min-inline-size-0">
            <figcaption
              className={`flex items-center gap-2.4 flex-wrap text-[0.78rem] min-inline-size-0 ${
                isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
              }`}
            >
              <span className="py-0.8 px-2 border border-[color-mix(in_srgb,var(--color-neon-h3)_45%,transparent)] rounded-[0.2rem] font-[var(--font-display)] text-[0.68rem] tracking-[0.04em] color-[var(--color-neon-h3)]">
                Blurred gradient
              </span>
              the glow is the gradient &mdash; smooth, one extra layer
            </figcaption>

            <div
              className={`grid place-items-center min-h-[clamp(12rem,34vw,16rem)] p-[clamp(1.75rem,7vw,3rem)] border rounded-2xl bg-black/25 overflow-hidden ${
                isDark ? "border-[#26262e]" : "border-[#c8c8d0]"
              }`}
            >
              <div
                className={`relative w-full max-w-[20rem] grid gap-1.6 p-[clamp(1rem,4vw,1.4rem)] border rounded-xl isolate ${
                  isDark
                    ? "bg-[#121216] border-[#26262e]"
                    : "bg-white border-[#c8c8d0]"
                }`}
              >
                {/* Pseudo-element glow using a scaled, blurred gradient layer behind */}
                <div
                  className="absolute inset-0 rounded-[inherit] scale-[1.06] opacity-85 blur-[clamp(0.75rem,3.5vw,1.35rem)] -z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg in oklch, var(--color-neon-h1), var(--color-neon-h2) 38%, var(--color-neon-h3) 68%, var(--color-neon-h4))",
                  }}
                  aria-hidden="true"
                />
                <p className="m-0 font-[var(--font-display)] text-[1.05rem] font-semibold">
                  Prism release
                </p>
                <p
                  className={`m-0 text-[0.82rem] leading-[1.55] text-pretty ${
                    isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
                  }`}
                >
                  A duplicate of this shape, filled with the gradient, scaled up
                  and blurred behind the surface.
                </p>
              </div>
            </div>
          </figure>
        </div>

        {/* Technical Facts Section */}
        <dl
          className={`m-0 grid border-t ${
            isDark ? "border-[#26262e]" : "border-[#c8c8d0]"
          }`}
        >
          {facts.map((fact, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline gap-1 sm:gap-3.6 py-2.4 border-b ${
                isDark ? "border-[#26262e]" : "border-[#c8c8d0]"
              }`}
            >
              <dt className="font-[var(--font-display)] text-[0.74rem] tracking-[0.06em] color-[var(--color-neon-h3)]">
                {fact.term}
              </dt>
              <dd
                className={`m-0 text-[0.84rem] leading-[1.5] min-inline-size-0 ${
                  isDark ? "text-[#9a9aa6]" : "text-[#4d4d58]"
                }`}
              >
                {fact.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default RainbowNeonGlow;
