import React from "react";

const TicketCard: React.FC = () => {
  return (
    <>
      {/* Skriveni SVG Filter za noise efekt */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="bump">
          <feTurbulence
            result="noise"
            numOctaves="3"
            baseFrequency="0.7"
            type="fractalNoise"
          />
          <feSpecularLighting
            in="noise"
            result="specular"
            lightingColor="#fffffc"
            specularExponent="25"
            specularConstant="0.8"
            surfaceScale="0.15"
          >
            <fePointLight z="210" y="100" x="100" />
          </feSpecularLighting>
          <feComposite
            result="noise2"
            operator="in"
            in="specular"
            in2="SourceGraphic"
          />
          <feBlend mode="screen" in2="noise2" in="SourceGraphic" />
        </filter>
      </svg>

      <div className="ticket-card relative grid grid-rows-[auto_1fr_auto] gap-4 w-45 h-80 py-3 font-sans text-base select-none overflow-hidden rounded-lg">
        {/* Background - nalazi se ispod sadržaja zahvaljujući z-indexu na ostalim elementima */}
        <div className="ticket-bg absolute inset-0 bg-white">
          <div className="ticket-holo absolute inset-0" />
        </div>

        {/* Note dekoracije */}
        <div className="absolute inset-0 overflow-hidden text-[5rem] text-[#e7e7e7] mix-blend-color-burn translate-y-[20%] z-1">
          ♪♪♪♪♪
        </div>
        <div className="absolute inset-0 overflow-hidden text-[5rem] text-[#e7e7e7] mix-blend-color-burn translate-y-[40%] z-1">
          ♪♪♪♪
        </div>
        <div className="absolute inset-0 overflow-hidden text-[5rem] text-[#e7e7e7] mix-blend-color-burn translate-y-[60%] z-1">
          ♪♪♪♪♪
        </div>

        {/* Header */}
        <div className="relative mx-2 text-center z-1 font-['Impact',sans-serif] text-[2.75rem] tracking-[2px] text-white/60 [text-shadow:0_0_0_#000] [-webkit-text-stroke:0.5px_#fff] mix-blend-difference">
          TICKET
          <div className="absolute top-[1.3em] right-0 rotate-185 text-[1.1em] text-white leading-[0.5] opacity-20">
            ✁
          </div>
        </div>

        {/* Body */}
        <div className="mx-[1em] p-[0.5em] font-extralight z-1">
          <em>Day pass</em>
          <br />
          May 14<sup>th</sup> 2026
          <br />
          Venue address, State, #####
        </div>

        {/* Footer */}
        <div className="mx-[1em] mb-[1em] flex flex-col z-1">
          <div className="mb-3 text-center rounded-[999px_0] text-black font-extralight">
            Seat <span className="font-semibold">E7</span>
          </div>
          <div className="ticket-barcode self-center w-0 h-8 translate-x-9.25" />
        </div>
      </div>
    </>
  );
};

export default TicketCard;
