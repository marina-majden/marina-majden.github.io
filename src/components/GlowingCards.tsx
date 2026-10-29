import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

export interface RainbowNeonGlowProps {
  initialTheme?: "dark" | "light";
}

const RainbowNeonGlow: React.FC<RainbowNeonGlowProps> = ({
  initialTheme = "dark",
}) => {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <section
      className={`w-full max-w-5xl min-h-screen relative block box-border font-sans transition-colors duration-300 ${
        isDark ? "text-[#cfcfdd] bg-radial-grid" : "text-[#363641]"
      }`}
    >
      <div className="max-w-272 mx-auto p-[clamp(1.75rem,5vw,2.5rem)_clamp(1.25rem,5vw,2.25rem)_clamp(2.25rem,6vw,3rem)] grid gap-[clamp(1.5rem,4vw,2rem)]">
        {/* Theme Switcher Button */}
        <div className="absolute top-[clamp(10px,2vw,18px)] right-[clamp(10px,2vw,18px)] z-10 flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex h-11 w-11 items-center justify-center cursor-pointer transition-opacity duration-200 hover:opacity-100  ${
              isDark ? "opacity-70 text-[#f4f4f7]" : "opacity-70 text-[#75757e]"
            }`}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Comparison Section */}
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2">
          {/* Option 1: Stacked Shadows */}

          <div className="grid place-items-center min-h-[clamp(12rem,34vw,16rem)] p-[clamp(1.75rem,7vw,3rem)] rounded-xl bg-#121216 overflow-hidden">
            <div
              className="relative w-full max-w-[20rem] grid gap-1.6 p-[clamp(1rem,4vw,1.4rem)] border rounded-xl isolate "
              style={{
                boxShadow: `
                    -0.4rem -0.4rem clamp(1rem, 4vw, 1.5rem) color-mix(in srgb, var(--color-neon-pink) 45%, transparent),
                     0.4rem  0.4rem clamp(1rem, 4vw, 1.5rem) color-mix(in srgb, var(--color-neon-cyan) 45%, transparent),
                    -0.4rem  0.4rem clamp(1.25rem, 5vw, 1.9rem) color-mix(in srgb, var(--color-neon-violet) 35%, transparent),
                     0.4rem -0.4rem clamp(1.25rem, 5vw, 1.9rem) color-mix(in srgb, var(--color-neon-blue) 35%, transparent)
                  `,
              }}
            >
              <p className="m-0 font-display text-[1.05rem] font-semibold">
                Prism release
              </p>
              <p
                className={`m-0 text-[0.82rem] leading-[1.55] text-pretty ${
                  isDark ? "text-[#b7b7c5]" : "text-[#585874]"
                }`}
              >
                Four shadow layers, each in its own hue, offset a few pixels so
                the overlaps mix.
              </p>
            </div>
          </div>

          {/* Option 2: Blurred Gradient */}

          <div className="grid place-items-center min-h-[clamp(12rem,34vw,16rem)] p-[clamp(1.75rem,7vw,3rem)] rounded-xl overflow-hidden">
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
                    "linear-gradient(115deg in oklch, var(--color-neon-pink), var(--color-neon-cyan) 38%, var(--color-neon-blue) 68%, var(--color-neon-violet))",
                }}
                aria-hidden="true"
              />
              <p className="m-0 font-display text-[1.05rem] font-semibold">
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
        </div>
      </div>
    </section>
  );
};

export default RainbowNeonGlow;
