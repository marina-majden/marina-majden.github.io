import React, { useRef } from "react";

const SpotlightCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Umjesto 100 span elemenata, koristimo React za precizno praćenje miša
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Direktno ažuriramo CSS varijable za brze performanse bez re-rendera
    cardRef.current.style.setProperty("--x", `${x}%`);
    cardRef.current.style.setProperty("--y", `${y}%`);
  };

  return (
    <>
      <style>{`
        .spotlight-card {
          --x: 50%;
          --y: 50%;
          --spotlight-radius: 140px;
          /* Omogućuje glatko kretanje svjetla */
          transition: --x 0.05s linear, --y 0.05s linear;
        }

        .card-lit {
          -webkit-mask-image: radial-gradient(
            circle var(--spotlight-radius) at var(--x) var(--y),
            black 0%,
            rgba(0, 0, 0, 0.7) 35%,
            rgba(0, 0, 0, 0.2) 65%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle var(--spotlight-radius) at var(--x) var(--y),
            black 0%,
            rgba(0, 0, 0, 0.7) 35%,
            rgba(0, 0, 0, 0.2) 65%,
            transparent 100%
          );
        }

        /* Kompleksni glow efekt na gumbu kad pređemo mišem preko njega */
        .spotlight-card:has(.btn-explore:hover) .btn-explore-lit {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.8);
          text-shadow:
            0 0 6px #ffffff,
            0 0 15px rgba(255, 255, 255, 0.9),
            0 0 25px rgba(255, 255, 255, 0.6),
            0 0 40px rgba(255, 255, 255, 0.4);
          box-shadow:
            0 0 20px rgba(255, 255, 255, 0.35),
            inset 0 0 12px rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .btn-explore:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight-card group relative w-[320px] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.95)] font-sans"
      >
        {/* 1. Tamni (osnovni) sloj */}
        <div className="flex flex-col gap-4 p-[38px_30px] rounded-[24px] bg-[#09090c] border border-[#121217]">
          <span className="self-start text-[11px] font-semibold tracking-[1.2px] uppercase py-1 px-2.5 rounded-full text-[#26262e] bg-[#0f0f14] border border-[#181820]">
            Object #404
          </span>
          <div className="text-[22px] font-bold tracking-[-0.5px] leading-tight text-[#1a1a20]">
            Hidden Artifact
          </div>
          <p className="text-[14px] leading-relaxed text-[#16161b]">
            The card is shrouded in complete darkness. The cursor beam smoothly
            reveals fragments of the surface.
          </p>
          <button
            type="button"
            className="btn-explore relative z-20 mt-1.5 py-3 px-5 rounded-xl text-[14px] font-semibold tracking-[0.5px] cursor-pointer transition-all duration-250 bg-[#0d0d12] text-[#2e2e38] border border-[#181822]"
          >
            Explore
          </button>
        </div>

        {/* 2. Osvijetljeni sloj (vidljiv samo kroz masku pri hoveru na karticu) */}
        <div
          aria-hidden="true"
          className="card-lit absolute inset-0 flex flex-col gap-4 p-[38px_30px] rounded-[24px] bg-[#16161f] border border-white/35 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="self-start text-[11px] font-semibold tracking-[1.2px] uppercase py-1 px-2.5 rounded-full text-[#e4e4e7] bg-white/5 border border-white/20">
            Object #404
          </span>
          <div className="text-[22px] font-bold tracking-[-0.5px] leading-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
            Hidden Artifact
          </div>
          <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
            The card is shrouded in complete darkness. The cursor beam smoothly
            reveals fragments of the surface.
          </p>
          <button
            type="button"
            tabIndex={-1}
            className="btn-explore-lit relative z-20 mt-1.5 py-3 px-5 rounded-xl text-[14px] font-semibold tracking-[0.5px] transition-all duration-250 bg-white/5 text-[#d1d1d6] border border-white/25"
          >
            Explore
          </button>
        </div>
      </div>
    </>
  );
};
export default SpotlightCard;
