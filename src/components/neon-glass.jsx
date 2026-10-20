import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="encrypted-neon-pattern">
        <span className="data-stream-overlay" />
        <svg className="texture-filter">
          <filter id="neon-texture">
            <feTurbulence result="noise" numOctaves={2} baseFrequency="0.6" type="fractalNoise" />
            <feSpecularLighting result="specular" lightingColor="#00f0ff" specularExponent={25} specularConstant="0.9" surfaceScale={2} in="noise">
              <fePointLight z={90} y={100} x={100} />
            </feSpecularLighting>
            <feComposite result="litNoise" operator="over" in2="SourceGraphic" in="specular" />
            <feBlend mode="screen" in2="litNoise" in="SourceGraphic" />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .encrypted-neon-pattern {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0d0d1a, #1a1a2f 50%, #2a1a4f);
    filter: url(#neon-texture);
    position: relative;
  }

  .data-stream-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 30% 40%,
        rgba(0, 240, 255, 0.2) 0%,
        transparent 20%
      ),
      radial-gradient(
        circle at 70% 60%,
        rgba(100, 50, 255, 0.15) 0%,
        transparent 15%
      );
    animation: pulse-stream 3s ease-in-out infinite;
  }

  @keyframes pulse-stream {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.9;
    }
  }`;

export default Pattern;

