import { useState } from "react";
import "./SwitchCard.css";

export default function SwitchCard() {
  const [isDark, setIsDark] = useState(false);

  // Dinamičke klase temeljem state-a
  const themeClass = isDark ? "theme-dark" : "theme-light";
  const stageBgClass = isDark ? "bg-stage-dark" : "bg-stage-light";
  const posterBgClass = isDark ? "bg-poster-dark" : "bg-poster-light";

  return (
    <div
      className={`w-full max-w-150 backdrop-blur-xs font-serif transition-colors duration-500 ${themeClass}`}
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <div
        className={`relative w-150 max-w-full h-105 overflow-hidden flex items-center justify-center p-6 sm:p-4 rounded-[26px] ${stageBgClass} transition-all duration-500`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-5 sm:top-3.5 right-6 sm:right-3.5 z-20 flex items-center gap-2 px-3.5 py-2 border-2 border-(--ink) rounded-full bg-(--paper) text-(--ink) font-mono text-[11px] font-black tracking-[0.8px] cursor-pointer shadow-[4px_4px_0_var(--ink)] rotate-1 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] hover:-rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)] transition-all duration-300 sm:scale-90"
        >
          <span>SWITCH MOOD</span>
          <span className="relative w-5.5 h-3 border-2 border-current rounded-full">
            <span
              className={`absolute top-[2px] left-0.5 w-[4px] h-1 rounded-full bg-current transition-transform duration-300 ${
                isDark ? "translate-x-[10px]" : ""
              }`}
            ></span>
          </span>
        </button>

        {/* Poster Area */}
        <div
          className={`relative w-77.5 sm:w-71.5 h-90 sm:h-85 overflow-hidden backdrop-blur-xs border-3 border-(--ink) rounded-[12px_16px_11px_18px] shadow-[12px_12px_0_var(--shadow)] rotate-[-1.2deg] transition-all duration-500 hover:rotate-1 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0_var(--shadow)] ${posterBgClass}`}
        >
          {/* Inner Dashed Border & Line */}
          <div className="absolute inset-3 border-2 border-dashed border-[rgba(17,17,17,0.28)] rounded-[9px_14px_8px_12px] pointer-events-none z-10"></div>

          <div className="doodle-grain absolute inset-0 z-0 opacity-18 pointer-events-none"></div>
          <div className="doodle-grid absolute inset-0 opacity-8 pointer-events-none"></div>

          {/* Tapes */}
          <span
            className="absolute z-20 w-14.5 h-6.25 border-2 border-[rgba(17,17,17,0.65)] shadow-[2px_2px_0_rgba(17,17,17,0.22)] top-3.5 -left-3.5 rotate-[-18deg] bg-[rgba(24,183,255,0.7)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.3) 0 5px, transparent 5px 10px)",
            }}
          ></span>
          <span
            className="absolute z-20 w-14.5 h-6.25 border-2 border-[rgba(17,17,17,0.65)] shadow-[2px_2px_0_rgba(17,17,17,0.22)] top-[15px] -right-[14px] rotate-18 bg-[rgba(255,75,31,0.65)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0 5px, transparent 5px 10px)",
            }}
          ></span>

          {/* Dots */}
          <span className="absolute z-10 border-2 border-(--ink) rounded-full shadow-[2px_2px_0_var(--ink)] animate-[doodleproBlink_2.5s_ease-in-out_infinite] w-[11px] h-[11px] bg-[var(--pink)] top-[90px] right-10.5"></span>
          <span className="absolute z-10 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)] animate-[doodleproBlink_2.5s_ease-in-out_infinite] w-[8px] h-[8px] bg-[var(--blue)] top-[285px] left-[32px] delay-450"></span>
          <span className="absolute z-10 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)] animate-[doodleproBlink_2.5s_ease-in-out_infinite] w-[9px] h-[9px] bg-[var(--accent)] right-[28px] bottom-[88px] delay-700"></span>

          {/* Label */}
          <div className="absolute top-[38px] left-[28px] z-10 inline-flex px-2.5 py-1.5 border-2 border-[var(--ink)] rounded-[999px_999px_999px_6px] bg-[var(--ink)] text-[var(--paper)] font-mono text-[10px] font-black tracking-[1.4px] -rotate-2 shadow-[3px_3px_0_var(--accent)] transition-all duration-500">
            DOODLE MANIFESTO
          </div>

          {/* Title */}
          <div
            className={`absolute top-[93px] left-[25px] right-[18px] z-10 text-[var(--ink)] font-black text-[58px] sm:text-[51px] leading-[0.82] tracking-[-2px] uppercase transition-all duration-500 ${isDark ? "animate-[doodleproSketchGlitch_2.8s_steps(2)_infinite]" : ""}`}
            style={{
              fontFamily: 'Impact, "Arial Black", sans-serif',
              textShadow: isDark
                ? "4px 4px 0 #ff4f9a, -3px -2px 0 rgba(24,183,255,0.9)"
                : "none",
            }}
          >
            <span className="block relative">CREATE</span>
            <span
              className="block relative text-transparent"
              style={{
                WebkitTextStroke: `2px ${isDark ? "#ccff00" : "var(--ink)"}`,
              }}
            >
              DIFFERENT
              <div className="absolute left-1 bottom-1.5 w-[198px] h-[13px] -z-10 bg-[var(--accent)] rounded-[999px_18px_999px_14px] -rotate-2 opacity-80 transition-colors duration-500"></div>
            </span>
          </div>

          {/* Ribbon */}
          <div className="absolute -left-[48px] top-[218px] sm:top-[210px] z-[12] w-[410px] overflow-hidden py-2 bg-[var(--accent)] text-[var(--paper)] border-y-3 border-[var(--ink)] font-mono text-[12px] font-black tracking-[1px] whitespace-nowrap -rotate-[10deg] shadow-[0_7px_0_rgba(17,17,17,0.28)] transition-all duration-500">
            <div className="flex w-max animate-[doodleproMarquee_9s_linear_infinite]">
              <span className="pr-[18px]">
                PROFESSIONAL CHAOS 404 HANDMADE PIXELS 404
              </span>
              <span className="pr-[18px]">
                PROFESSIONAL CHAOS 404 HANDMADE PIXELS 404
              </span>
              <span className="pr-[18px]">
                PROFESSIONAL CHAOS 404 HANDMADE PIXELS 404
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute left-[26px] right-[26px] bottom-[24px] z-10 flex items-end justify-between pt-3 border-t-3 border-[var(--ink)] transition-colors duration-500">
            <div
              className="w-[72px] h-[38px] border-b-[5px] border-[var(--ink)] transition-colors duration-500"
              style={{
                background:
                  "repeating-linear-gradient(to right, var(--ink) 0 3px, transparent 3px 6px, var(--ink) 6px 8px, transparent 8px 12px, var(--ink) 12px 17px, transparent 17px 20px)",
              }}
            ></div>

            <div className="max-w-[145px] text-right text-[var(--ink)] transition-colors duration-500">
              <strong className="block mb-1 font-mono text-[10px] tracking-[1px]">
                VOL. 404
              </strong>
              <p className="m-0 text-[11px] leading-tight opacity-80">
                Handmade pixels. Professional chaos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
