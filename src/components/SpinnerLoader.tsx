import React from "react";

const GalleryLoader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="gallery-loader" aria-label="Loading" role="status"></div>
    </div>
  );
};

const CardLoader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="card-loader" aria-label="Loading" role="status"></div>
    </div>
  );
};

const AtomicLoader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="atomic-loader" aria-label="Loading" role="status"></div>
    </div>
  );
};

const particleColors = ["#00f5ff", "#bf00ff", "#ff00aa", "#00ff88", "#ffd24d"];

const AtomLoader: React.FC = () => {
  const electrons = [
    { color: particleColors[0], radius: 44, duration: 2.8, delay: 0 },
    { color: particleColors[1], radius: 58, duration: 2.2, delay: 0.3 },
    { color: particleColors[2], radius: 72, duration: 3.2, delay: 0.6 },
    { color: particleColors[3], radius: 58, duration: 2.7, delay: 1.1 },
    { color: particleColors[4], radius: 44, duration: 3.4, delay: 1.4 },
  ];

  return (
    <div className="relative flex w-screen h-screen items-center justify-center align-center content-center bg-transparent">
      <div
        className="atom-loader"
        data-testid="atom-loader"
        aria-label="Loading"
        role="status"
      >
        <style>{`
        .atom-loader {
          position: relative;
          display: grid;
          place-items: center;
          width: 500px;
          height: 500px;
        
          filter: drop-shadow(0 0 18px rgba(0, 245, 255, 0.35));
        }

        .atom-core {
          position: absolute;
          inset: 50% auto auto 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at 35% 35%, #ffffff 0%, #dffcff 18%, #00f5ff 36%, #bf00ff 74%, rgba(7,7,14,0.9) 100%);
          box-shadow: 0 0 24px rgba(0, 245, 255, 0.75), 0 0 40px rgba(191, 0, 255, 0.4);
          z-index: 3;
        }

        .atom-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.01);
        }

        .ring-one {
          inset: 14px;
          border-color: rgba(0, 245, 255, 0.4);
          box-shadow: inset 0 0 18px rgba(0, 245, 255, 0.08), 0 0 28px rgba(0, 245, 255, 0.08);
          animation: atomSpin 3.6s linear infinite;
        }

        .ring-two {
          inset: 28px;
          border-color: rgba(255, 0, 170, 0.45);
          box-shadow: inset 0 0 16px rgba(255, 0, 170, 0.05), 0 0 24px rgba(255, 0, 170, 0.08);
          animation: atomSpinReverse 2.9s linear infinite;
        }

        .ring-three {
          inset: 42px;
          border-color: rgba(0, 255, 136, 0.32);
          animation: atomSpin 4.1s linear infinite;
        }

        .atom-electron {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 12px;
          height: 12px;
          margin-left: -6px;
          margin-top: -6px;
          border-radius: 50%;
          background: var(--electron-color);
          box-shadow: 0 0 8px var(--electron-color), 0 0 18px var(--electron-color);
          transform: rotate(var(--rotation)) translateX(var(--radius));
          animation: electronOrbit var(--duration) linear infinite;
          animation-delay: var(--delay);
        }

        .atom-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--particle-color);
          box-shadow: 0 0 10px var(--particle-color);
          opacity: 0.85;
          animation: particleFloat var(--float-duration) ease-in-out infinite alternate;
        }

        @keyframes atomSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes atomSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes electronOrbit {
          0% {
            transform: rotate(var(--rotation)) translateX(var(--radius)) scale(0.9);
            opacity: 0.5;
          }
          25% {
            transform: rotate(calc(var(--rotation) + 90deg)) translateX(var(--radius)) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: rotate(calc(var(--rotation) + 180deg)) translateX(var(--radius)) scale(1.1);
            opacity: 1;
          }
          75% {
            transform: rotate(calc(var(--rotation) + 270deg)) translateX(var(--radius)) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: rotate(calc(var(--rotation) + 360deg)) translateX(var(--radius)) scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes particleFloat {
          0% { transform: translateY(0) scale(0.8); opacity: 0.3; }
          100% { transform: translateY(-12px) scale(1.2); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .atom-ring,
          .atom-electron,
          .atom-particle {
            animation: none !important;
          }
        }
      `}</style>

        <div className="atom-ring ring-one" />
        <div className="atom-ring ring-two" />
        <div className="atom-ring ring-three" />

        {electrons.map((electron, index) => (
          <span
            key={index}
            className="atom-electron"
            style={{
              ["--electron-color" as string]: electron.color,
              ["--radius" as string]: `${electron.radius}px`,
              ["--rotation" as string]: `${index * 72}deg`,
              ["--duration" as string]: `${electron.duration}s`,
              ["--delay" as string]: `${electron.delay}s`,
            }}
          />
        ))}

        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="atom-particle"
            style={{
              ["--particle-color" as string]:
                particleColors[index % particleColors.length],
              ["--float-duration" as string]: `${2.2 + index * 0.35}s`,
              left: `${18 + index * 12}%`,
              top: `${12 + (index % 4) * 20}%`,
            }}
          />
        ))}

        <div className="atom-core" />
      </div>
    </div>
  );
};

const Tiles: React.FC = () => {
  return (
    <div
      className="p-4 mx-auto w-36 h-36 will-change-auto grid grid-cols-3 gap-2"
      aria-hidden="true"
    >
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-300"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile delay-150"></span>
      <span className="w-full h-full bg-lake-500/30 will-change-transform animate-tile"></span>
    </div>
  );
};

const Coil: React.FC = () => {
  return (
    <div
      className="relative p-4 mx-auto w-36 h-36 will-change-auto border border-red"
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-white  border-3 border-black/50 border-t-lake-500 rounded-full transform-gpu rotate-0 scale-1 "></span>
      <span className="absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-150 "></span>
      <span className="absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-300"></span>
      <span className="absolute inset-0 rounded-full border-3 border-black/50 border-t-lake-500 transform-gpu rotate-0 scale-1 animate-conil delay-450 "></span>
    </div>
  );
};

const Spinner: React.FC = () => {
  return (
    <div className="relative flex h-full item-center justify-center bg-transparent">
      {/* Main Container Size */}
      <div className="relative h-32 w-32">
        {/* Outer Ring - Slow Spin */}
        <div
          className="absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-b-purple-500/50 border-r-lake-500/40"
          style={{ animationDuration: "3s" }}
        ></div>

        {/* Inner Ring - Fast Reverse Spin */}
        <div
          className="absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-100/10 border-t-candy-500/50"
          style={{
            animationDuration: "2s",
            animationDirection: "reverse",
          }}
        ></div>
      </div>
    </div>
  );
};

const SpinnerLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <AtomLoader />
      </div>
    </div>
  );
};

export {
  GalleryLoader,
  CardLoader,
  AtomicLoader,
  Spinner,
  SpinnerLoader,
  Tiles,
  Coil,
  AtomLoader,
};
