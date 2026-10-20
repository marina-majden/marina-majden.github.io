import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="radar-pattern">
        <div className="radar-center" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radar-pattern {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #09090b; /* Deep zinc black */

    /* Base square grid */
    background-image: linear-gradient(
        rgba(139, 92, 246, 0.1) 0.1em,
        transparent 0.1em
      ),
      linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0.1em, transparent 0.1em);
    background-size: 3em 3em;
    overflow: hidden;
  }

  /* Concentric Radar Rings */
  .radar-pattern::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150vw; /* Ensures rings cover the screen even if rotated */
    height: 150vh;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
      circle,
      transparent 0,
      transparent 2.9em,
      rgba(139, 92, 246, 0.2) 3em
    );
    z-index: 1;
  }

  /* The Sweeping Radar Beam */
  .radar-pattern::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40em;
    height: 40em;
    margin-top: -20em;
    margin-left: -20em;
    border-radius: 50%;
    /* Conic gradient creates the sweeping beam light */
    background: conic-gradient(
      from 0deg,
      transparent 75%,
      rgba(139, 92, 246, 0.5) 100%
    );
    animation: radar-spin 4s linear infinite;
    z-index: 2;
  }

  /* Glowing Center Dot */
  .radar-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    transform: translate(-50%, -50%);
    background-color: #a78bfa;
    border-radius: 50%;
    z-index: 3;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  /* Animations */
  @keyframes radar-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse-dot {
    0%,
    100% {
      box-shadow: 0 0 0.8em 0.2em rgba(139, 92, 246, 0.6);
    }
    50% {
      box-shadow: 0 0 2em 0.5em rgba(139, 92, 246, 1);
    }
  }`;

export default Pattern;

