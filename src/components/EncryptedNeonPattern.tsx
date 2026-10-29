import React, { useId } from "react";

export interface EncryptedNeonPatternProps {
  className?: string;
  glowColor?: string;
}

const EncryptedNeonPattern: React.FC<EncryptedNeonPatternProps> = ({
  className = "",
  glowColor = "#00f0ff",
}) => {
  // Unique ID generator u React 19 za spriječavanje SVG Filter Collisions
  const filterId = useId();
  const cleanFilterId = `neon-texture-${filterId.replace(/:/g, "")}`;

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#0d0d1a,#1a1a2f_50%,#2a1a4f)] [filter:url(#${cleanFilterId})] ${className}`}
    >
      {/* Dynamic Ambient Neon Data Stream Overlay */}
      <div
        className="absolute inset-0 animate-pulse-stream opacity-50 will-change-[opacity]"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(0, 240, 255, 0.2) 0%, transparent 20%),
            radial-gradient(circle at 70% 60%, rgba(100, 50, 255, 0.15) 0%, transparent 15%)
          `,
        }}
      />

      {/* SVG Texture Filter */}
      <svg
        className="pointer-events-none absolute hidden h-0 w-0"
        aria-hidden="true"
      >
        <filter id={cleanFilterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves={2}
            result="noise"
          />
          <feSpecularLighting
            in="noise"
            surfaceScale={2}
            specularConstant={0.9}
            specularExponent={25}
            lightingColor={glowColor}
            result="specular"
          >
            <fePointLight x={100} y={100} z={90} />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="SourceGraphic"
            operator="over"
            result="litNoise"
          />
          <feBlend mode="screen" in="SourceGraphic" in2="litNoise" />
        </filter>
      </svg>
    </div>
  );
};

export default EncryptedNeonPattern;
