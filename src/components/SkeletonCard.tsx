import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <>
      <div
        role="status"
        aria-label="Loading"
        className="w-full h-full rounded-[20px] border border-white/10 bg-white/4 shadow-[0_28px_80px_rgba(0,0,0,0.55)] overflow-hidden backdroqp-blur-[12px] font-sans"
      >
        {/* Header */}
        <div className="grid grid-cols-[42px_1fr_auto] gap-3 p-3.5 border-b border-white/8 bg-linear-to-b from-white/6 to-white/3 items-center">
          <div className="w-10.5 h-10.5 rounded-md border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),rgba(255,255,255,0.05)_45%,rgba(0,0,0,0.22)_100%),linear-gradient(135deg,rgba(110,231,255,0.35),rgba(176,140,255,0.25))]" />

          <div className="flex flex-col">
            <div className="w-[62%] h-3.25 rounded-full bg-white/6 border border-white/[0.07] mt-0.5 mb-2 overflow-hidden relative before:absolute before:inset-y-[-60%] before:inset-x-[-40%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.1)_22%,rgba(255,255,255,0.2)_30%,transparent_44%)] before:translate-x-[-60%] before:animate-[shimmer_1.15s_cubic-bezier(0.2,0.8,0.2,1)_infinite] before:mix-blend-screen" />
            <div className="w-[44%] h-2.75 rounded-full bg-white/6 border border-white/[0.07] opacity-90 overflow-hidden relative before:absolute before:inset-y-[-60%] before:inset-x-[-40%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.1)_22%,rgba(255,255,255,0.2)_30%,transparent_44%)] before:translate-x-[-60%] before:animate-[shimmer_1.15s_cubic-bezier(0.2,0.8,0.2,1)_infinite] before:mix-blend-screen" />
          </div>

          <div className="text-xs px-2.5 py-2 rounded-full border border-white/10 bg-white/4 text-white/70">
            Uploading
          </div>
        </div>

        {/* Middle Body */}
        <div className="p-3.5">
          <div className="w-full h-3 rounded-full bg-white/6 border border-white/[0.07] my-2.5 overflow-hidden relative before:absolute before:inset-y-[-60%] before:inset-x-[-40%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.1)_22%,rgba(255,255,255,0.2)_30%,transparent_44%)] before:translate-x-[-60%] before:animate-[shimmer_1.15s_cubic-bezier(0.2,0.8,0.2,1)_infinite] before:mix-blend-screen" />
          <div className="w-full h-3 rounded-full bg-white/6 border border-white/[0.07] my-2.5 overflow-hidden relative before:absolute before:inset-y-[-60%] before:inset-x-[-40%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.1)_22%,rgba(255,255,255,0.2)_30%,transparent_44%)] before:translate-x-[-60%] before:animate-[shimmer_1.15s_cubic-bezier(0.2,0.8,0.2,1)_infinite] before:mix-blend-screen" />
          <div className="w-[62%] h-3 rounded-full bg-white/6 border border-white/[0.07] my-2.5 overflow-hidden relative before:absolute before:inset-y-[-60%] before:inset-x-[-40%] before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.1)_22%,rgba(255,255,255,0.2)_30%,transparent_44%)] before:translate-x-[-60%] before:animate-[shimmer_1.15s_cubic-bezier(0.2,0.8,0.2,1)_infinite] before:mix-blend-screen" />
        </div>

        {/* Bottom Bar */}
        <div className="h-2.5 mx-3.5 mb-3.5 mt-0.5 rounded-full relative overflow-hidden bg-white/6 border border-white/9">
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(110,231,255,0),rgba(110,231,255,0.55),rgba(176,140,255,0.55),rgba(110,231,255,0))] translate-x-[-70%] animate-[flow2_1.05s_cubic-bezier(0.2,0.8,0.2,1)_infinite]" />
          <span
            aria-hidden="true"
            className="absolute inset-x-[-40%] inset-y-[-30%] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.12)_22%,rgba(255,255,255,0.28)_28%,transparent_40%)] translate-x-[-55%] animate-[glint2_1.05s_cubic-bezier(0.2,0.8,0.2,1)_infinite] mix-blend-screen"
          />
        </div>
      </div>
    </>
  );
};
