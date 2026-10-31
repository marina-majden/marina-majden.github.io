import type { CSSProperties } from "react";

const RING_CONFIGS = [
  { delay: 6, size: "w-[50px]", margin: "-ml-[25px] -mt-[25px]" },
  { delay: 4, size: "w-[64px]", margin: "-ml-[32px] -mt-[32px]" },
  { delay: 3, size: "w-[78px]", margin: "-ml-[39px] -mt-[39px]" },
  { delay: 2, size: "w-[92px]", margin: "-ml-[46px] -mt-[46px]" },
  { delay: 1, size: "w-[104px]", margin: "-ml-[52px] -mt-[52px]" },
  { delay: 0, size: "w-[118px]", margin: "-ml-[59px] -mt-[59px]" },
] as const;

export default function LoaderFullscreen() {
  return (
    <div className="relative aspect-square w-100 animate-ring-pan">
      {RING_CONFIGS.map((ring, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={ring.delay}
            style={{ "--delay": ring.delay } as CSSProperties}
            className={`
              absolute top-1/2 left-1/2 aspect-square overflow-hidden rounded-full border-2 border-solid
              opacity-0 will-change-transform animate-ring-zoom delay-[calc(0.4s*var(--delay))]
              ${ring.size} ${ring.margin}
              ${isEven ? "ring-glow-cyan" : "ring-glow-magenta"}
            `}
          />
        );
      })}
    </div>
  );
}
