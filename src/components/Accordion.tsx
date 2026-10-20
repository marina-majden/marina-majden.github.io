import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { accordionServices } from "@/data/services";

export const HorizontalAccordion = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [visibleItem, setVisibleItem] = useState<number | null>(null);

  useEffect(() => {
    setVisibleItem(null);
    if (activeItem === null) return;

    const timeout = window.setTimeout(() => setVisibleItem(activeItem), 500);
    return () => window.clearTimeout(timeout);
  }, [activeItem]);

  return (
    <div className="flex flex-col md:flex-row items-stretch overflow-hidden gap-3 w-full max-w-275 h-full min-h-115 mx-auto p-4">
      {accordionServices.map((service) => {
        const isActive = activeItem === service.id;

        return (
          <div
            key={service.id}
            onMouseEnter={() => setActiveItem(service.id)}
            onMouseLeave={() => setActiveItem(null)}
            onClick={() => setActiveItem(service.id)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border transition-all duration-500 ease-smooth bg-[rgba(14,15,28,0.85)] backdrop-blur-xl group
              ${isActive ? "flex-5" : "flex-1"}`}
            style={{
              borderColor: isActive ? service.color : "rgba(255,255,255,0.1)",
            }}
          >
            {/* Background Glow */}
            <div
              className="absolute inset-0 pointer-events-none z-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 80%, ${service.color} 0%, transparent 70%)`,
              }}
            />

            {/* Top Border Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-10"
              style={{ background: service.color }}
            />

            <div className="relative z-10 flex flex-row items-end justify-start h-full w-full p-6 gap-6">
              {/* Vertical Title Group - Always Vertical */}
              <div
                className="flex flex-row items-center gap-3 shrink-0"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {/* Icon at the bottom (first in row when rotated 180) */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-md transition-colors"
                  style={{ color: service.color }}
                >
                  <service.icon size={24} />
                </div>

                {/* Text above Icon */}
                <div className="flex flex-col text-left justify-end">
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {service.title}
                  </span>
                  <span className="text-xs text-slate-400">
                    {service.subtitle}
                  </span>
                </div>
              </div>

              {/* Description Area - Instant visibility toggle */}
              {isActive && visibleItem === service.id && (
                <div className="flex flex-col justify-end w-full animate-in fade-in duration-300">
                  <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg mb-3 max-w-md">
                    <span
                      className="block text-base font-mono font-bold mb-1"
                      style={{ color: service.color }}
                    >
                      {service.price}
                    </span>
                    <p
                      className={`text-xs sm:text-sm text-slate-300 leading-relaxed animate-in fade-in duration-300 delay-150 ${isActive ? "visible" : "hidden"}`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-xs py-2 px-4 rounded-full border border-white/10 hover:bg-white/5 transition-all w-fit text-slate-200">
                    <Plus size={14} />
                    Odaberi uslugu
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalAccordion;
