import React from "react";
import "./CyberCard.css";

// Centralizirani podaci o zonama osiguravaju DRY kod i lakše održavanje.
const TRACKERS = [
  {
    id: "tr1",
    position: "top-0 left-0",
    cardHover:
      "peer-hover/tr1:rotate-x-[20deg] peer-hover/tr1:-rotate-y-[20deg] peer-hover/tr1:after:opacity-100 peer-hover/tr1:after:-translate-x-[20%] peer-hover/tr1:after:-translate-y-[20%]",
  },
  {
    id: "tr2",
    position: "top-0 left-1/3",
    cardHover:
      "peer-hover/tr2:rotate-x-[20deg] peer-hover/tr2:rotate-y-0 peer-hover/tr2:after:opacity-100 peer-hover/tr2:after:translate-x-0 peer-hover/tr2:after:-translate-y-[20%]",
  },
  {
    id: "tr3",
    position: "top-0 left-2/3",
    cardHover:
      "peer-hover/tr3:rotate-x-[20deg] peer-hover/tr3:rotate-y-[20deg] peer-hover/tr3:after:opacity-100 peer-hover/tr3:after:translate-x-[20%] peer-hover/tr3:after:-translate-y-[20%]",
  },
  {
    id: "tr4",
    position: "top-1/3 left-0",
    cardHover:
      "peer-hover/tr4:rotate-x-0 peer-hover/tr4:-rotate-y-[20deg] peer-hover/tr4:after:opacity-100 peer-hover/tr4:after:-translate-x-[20%] peer-hover/tr4:after:translate-y-0",
  },
  {
    id: "tr5",
    position: "top-1/3 left-1/3",
    cardHover:
      "peer-hover/tr5:rotate-x-0 peer-hover/tr5:rotate-y-0 peer-hover/tr5:scale-105 peer-hover/tr5:shadow-[0_0_30px_var(--color-neon-blue)] peer-hover/tr5:after:opacity-100 peer-hover/tr5:after:translate-x-0 peer-hover/tr5:after:translate-y-0",
  },
  {
    id: "tr6",
    position: "top-1/3 left-2/3",
    cardHover:
      "peer-hover/tr6:rotate-x-0 peer-hover/tr6:rotate-y-[20deg] peer-hover/tr6:after:opacity-100 peer-hover/tr6:after:translate-x-[20%] peer-hover/tr6:after:translate-y-0",
  },
  {
    id: "tr7",
    position: "top-2/3 left-0",
    cardHover:
      "peer-hover/tr7:-rotate-x-[20deg] peer-hover/tr7:-rotate-y-[20deg] peer-hover/tr7:after:opacity-100 peer-hover/tr7:after:-translate-x-[20%] peer-hover/tr7:after:translate-y-[20%]",
  },
  {
    id: "tr8",
    position: "top-2/3 left-1/3",
    cardHover:
      "peer-hover/tr8:-rotate-x-[20deg] peer-hover/tr8:rotate-y-0 peer-hover/tr8:after:opacity-100 peer-hover/tr8:after:translate-x-0 peer-hover/tr8:after:translate-y-[20%]",
  },
  {
    id: "tr9",
    position: "top-2/3 left-2/3",
    cardHover:
      "peer-hover/tr9:-rotate-x-[20deg] peer-hover/tr9:rotate-y-[20deg] peer-hover/tr9:after:opacity-100 peer-hover/tr9:after:translate-x-[20%] peer-hover/tr9:after:translate-y-[20%]",
  },
];

export default function CyberCard() {
  return (
    <div className="relative w-[320px] h-[480px] group flex justify-center items-center">
      {/* 9 Nevidljivih trackera za CSS-only 3D hover detekciju */}
      {TRACKERS.map(({ id, position }) => (
        <div
          key={id}
          className={`absolute w-1/3 h-1/3 z-20 peer/${id} ${position}`}
        />
      ))}

      {/* Glavna kartica reagira na hover svih prethodnih peer trackera */}
      <div
        className={`
          absolute inset-0 bg-neutral-950/80 border border-white/10 rounded-[20px] 
          flex flex-col justify-center items-center overflow-hidden backdrop-blur-md
          shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out preserve-3d
          cyber-grid
          ${TRACKERS.map((t) => t.cardHover).join(" ")}
        `}
      >
        {/* HUD Rubovi (uglovi) */}
        <div className="absolute w-5 h-5 border-2 border-neon-blue transition-all duration-300 z-10 top-5 left-5 border-r-0 border-b-0 group-hover:w-[30px] group-hover:h-[30px] group-hover:shadow-[0_0_10px_var(--color-neon-blue)]" />
        <div className="absolute w-5 h-5 border-2 border-neon-blue transition-all duration-300 z-10 top-5 right-5 border-l-0 border-b-0 group-hover:w-[30px] group-hover:h-[30px] group-hover:shadow-[0_0_10px_var(--color-neon-blue)]" />
        <div className="absolute w-5 h-5 border-2 border-neon-blue transition-all duration-300 z-10 bottom-5 left-5 border-r-0 border-t-0 group-hover:w-[30px] group-hover:h-[30px] group-hover:shadow-[0_0_10px_var(--color-neon-blue)]" />
        <div className="absolute w-5 h-5 border-2 border-neon-blue transition-all duration-300 z-10 bottom-5 right-5 border-l-0 border-t-0 group-hover:w-[30px] group-hover:h-[30px] group-hover:shadow-[0_0_10px_var(--color-neon-blue)]" />

        {/* Unutarnji sadržaj kartice (isturen u 3D prostoru) */}
        <div className="z-30 text-center pointer-events-none translate-z-[40px]">
          <h1
            className="text-[3.5rem] font-black text-white leading-none relative mix-blend-lighten drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] glitch-text"
            data-text="CYBER"
          >
            CYBER
          </h1>
          <h1
            className="text-[3.5rem] font-black text-white leading-none relative mix-blend-lighten drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] glitch-text"
            data-text="CORE"
          >
            CORE
          </h1>
          <p className="mt-2.5 text-neon-blue tracking-[3px] text-xs uppercase font-medium">
            System Online
          </p>
        </div>
      </div>
    </div>
  );
}
