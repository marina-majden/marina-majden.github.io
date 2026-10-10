import React, { useRef } from "react";

interface FeatureCard3DProps {
  /** Jezik za prikaz tekstova (zadano: 'hr') */
  lang?: "hr" | "en";
  /** Akcija koja se okida na klik kartice */
  onAction?: () => void;
}

export const Card3D: React.FC<FeatureCard3DProps> = ({
  lang = "hr",
  onAction,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Poštivanje korisničkih postavki za smanjeni pokret
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Izračun rotacije s maksimalnim nagibom od 12 stupnjeva
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    card.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Vraćanje u početni položaj uz spring easing animaciju
    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  };

  const handleClick = () => {
    // Ovdje bi inače išao showToast iz ToastHuba
    console.log(
      lang === "hr"
        ? "Pikselizirano srce: naša je ljubav u stvaranju piksel-savršenih stranica! ♡"
        : "Pixelated Heart: our love is in creating pixel-perfect websites! ♡",
    );
    if (onAction) onAction();
  };

  return (
    <>
      {/* Specifičan CSS za kompleksnu pixel-art sjenu srca - preteško za inline Tailwind klase */}
      <style>
        {`
          .feature-3d-stage {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
            perspective: 1200px;
            position: relative;
          }

          .feature-card-3d {
            position: relative;
            width: 390px;
            min-height: 540px;
            padding: 28px;
            border-radius: var(--radius-xl);
            background:
              radial-gradient(circle at 20% 20%, rgba(191, 0, 255, 0.28), transparent 32%),
              radial-gradient(circle at 80% 25%, rgba(255, 0, 170, 0.22), transparent 30%),
              radial-gradient(circle at 70% 80%, rgba(0, 245, 255, 0.22), transparent 35%),
              #070712;
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 245, 255, 0.12);
            transform-style: preserve-3d;
            transition: transform 0.4s var(--ease-spring), box-shadow 0.4s ease;
            overflow: hidden;
            cursor: pointer;
          }

          .feature-card-3d:hover {
            transform: rotateX(6deg) rotateY(-8deg) translateY(-10px);
            box-shadow: 0 55px 120px rgba(0, 0, 0, 0.9), 0 0 70px rgba(0, 245, 255, 0.22);
          }

          .feature-card-3d::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.5px;
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.9), rgba(255, 255, 255, 0.1) 35%, rgba(255, 255, 255, 0.05) 60%, rgba(255, 0, 170, 0.85));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .pixel-heart-hero {
            position: relative;
            width: 14px;
            height: 14px;
            background: transparent;
            box-shadow: 
              14px 0 #ff00aa, 28px 0 #ff00aa, 56px 0 #bf00ff, 70px 0 #bf00ff,
              0 14px #ff00aa, 14px 14px #ffffff, 28px 14px #ff00aa, 42px 14px #bf00ff, 56px 14px #bf00ff, 70px 14px #00f5ff, 84px 14px #00f5ff,
              0 28px #ff00aa, 14px 28px #ff00aa, 28px 28px #bf00ff, 42px 28px #bf00ff, 56px 28px #00f5ff, 70px 28px #00f5ff, 84px 28px #00f5ff,
              14px 42px #ff00aa, 28px 42px #bf00ff, 42px 42px #bf00ff, 56px 42px #00f5ff, 70px 42px #00f5ff,
              28px 56px #bf00ff, 42px 56px #bf00ff, 56px 56px #00f5ff,
              42px 70px #bf00ff;
            animation: floatPixelHeart 4s ease-in-out infinite;
          }
          @keyframes floatPixelHeart {
            0%, 100% { transform: translateY(0) rotate(-2deg); filter: drop-shadow(0 0 15px rgba(255, 0, 170, 0.45)); }
            50% { transform: translateY(-15px) rotate(2deg); filter: drop-shadow(0 0 25px rgba(0, 245, 255, 0.45)); }
          }
          @media (prefers-reduced-motion: reduce) {
            .pixel-heart-hero { animation: none !important; filter: drop-shadow(0 0 15px rgba(255, 0, 170, 0.45)); }
          }
        `}
      </style>

      <div className="feature-3d-stage">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          role="region"
          aria-label="3D Interactive Pixel Heart Card"
          className="feature-card-3d relative w-full h-full p-8 flex flex-col justify-between select-none rounded-[32px] [transform-style:preserve-3d] will-change-transform group overflow-hidden"
        >
          {/* Unutarnji odsjaj (Glow) */}
          <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(0,245,255,0.12),transparent_60%)] pointer-events-none [transform:translateZ(-1px)]" />

          {/* Top telemetry bar */}
          <div className="flex justify-between items-start w-full [transform:translateZ(40px)] transition-transform duration-300">
            <span className="font-mono text-[11px] text-[#00f5ff] tracking-[0.14em] uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88] animate-pulse" />
              {lang === "hr" ? "Živo digitalno srce" : "Live Digital Emblem"}
            </span>
            <span className="font-mono text-[10px] bg-white/10 text-white px-2 py-1 rounded uppercase tracking-widest">
              Zero-Asset • 60 FPS
            </span>
          </div>

          {/* Suspended Pixel Heart Stage */}
          <div className="flex-grow flex items-center justify-center pt-8 pr-20 pb-20 [transform:translateZ(60px)]">
            <div
              className="pixel-heart-hero"
              aria-label="Pulsating Pixel Heart"
            />
          </div>

          {/* Typography & Bottom Bar */}
          <div className="w-full [transform:translateZ(40px)] border-t border-white/10 pt-5 mt-6">
            <div className="mb-4">
              <div className="font-mono text-xs text-[#ff00aa] uppercase tracking-wider mb-2 font-bold">
                essence.exe
              </div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-2 leading-snug">
                {lang === "hr"
                  ? "Naša ljubav je u stvaranju piksel-savršenih stranica."
                  : "Our love is in creating pixel-perfect websites."}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {lang === "hr"
                  ? "Spajamo ranu digitalnu nostalgiju s modernom preciznošću i fluidnim 3D web iskustvima."
                  : "Blending early digital nostalgia with contemporary precision and fluid 3D web experiences."}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-[#00f5ff] flex items-center gap-1.5">
                <span className="text-[#ff00aa]">♡</span> 100% CRAFT
              </span>
              <button
                type="button"
                className="bg-transparent text-[#ff00aa] border border-[#ff00aa60] shadow-[inset_0_0_10px_rgba(255,0,170,0.12),0_0_10px_rgba(255,0,170,0.12)] px-4 py-2 text-xs rounded-full font-bold uppercase tracking-wider hover:bg-[#ff00aa20] hover:shadow-[inset_0_0_15px_rgba(255,0,170,0.45),0_0_20px_rgba(255,0,170,0.45)] hover:-translate-y-[2px] transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                {lang === "hr" ? "Otkrij ✦" : "Discover ✦"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card3D;
