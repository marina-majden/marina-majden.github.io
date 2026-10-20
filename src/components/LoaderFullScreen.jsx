import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="rings anim-pan">
        <div style={{-delay: 06}} className="ring anim-zoomIn" />
        <div style={{-delay: 04}} className="ring anim-zoomIn" />
        <div style={{-delay: 03}} className="ring anim-zoomIn" />
        <div style={{-delay: 02}} className="ring anim-zoomIn" />
        <div style={{-delay: 01}} className="ring anim-zoomIn" />
        <div style={{-delay: 00}} className="ring anim-zoomIn" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .rings {
    --border-width: 2px;
    --border-style: solid;
    --animation-duration: 4s;
    --animation-delay: 100ms;
    --animation-count: infinite;
    --animation-direction: normal;
    --animation-fill-mode: both;
    --animation-timing: ease-in-out;
    position: relative;
    width: 400px;
    aspect-ratio: 1/1;
    animation-delay: var(--animation-delay);
    animation-duration: var(--animation-duration);
    animation-iteration-count: var(--animation-count);
    animation-timing-function: var(--animation-timing);
  }

  .rings > .ring {
    position: absolute;
    top: 50%;
    left: 50%;
    aspect-ratio: 1/1;
    border-width: var(--border-width);
    border-style: var(--border-style);
    border-radius: 50%;
    transform-origin: center;
    animation-duration: var(--animation-duration);
    animation-delay: calc(0.4s * var(--delay));
    animation-iteration-count: var(--animation-count);
    animation-direction: var(--animation-direction);
    animation-fill-mode: var(--animation-fill-mode);
    filter: opacity(0);
    will-change: transform;
    overflow: hidden;
  }

  .rings > .ring:nth-child(even) {
    border-color: whitesmoke;
    box-shadow:
      0 0 4px cyan,
      0 0 20px cyan,
      inset 0 0 4px cyan,
      inset 0 0 20px cyan;
  }

  .rings > .ring:nth-child(odd) {
    border-color: whitesmoke;
    box-shadow:
      0 0 4px magenta,
      0 0 20px magenta,
      inset 0 0 4px magenta,
      inset 0 0 20px magenta;
  }

  .rings > .ring:first-child {
    width: 50px;
    margin: -25px 0 0 -25px;
  }

  .rings > .ring:nth-child(2) {
    width: 64px;
    margin: -32px 0 0 -32px;
  }

  .rings > .ring:nth-child(3) {
    width: 78px;
    margin: -39px 0 0 -39px;
  }

  .rings > .ring:nth-child(4) {
    width: 92px;
    margin: -46px 0 0 -46px;
  }

  .rings > .ring:nth-child(5) {
    width: 104px;
    margin: -52px 0 0 -52px;
  }

  .rings > .ring:nth-child(6) {
    width: 118px;
    margin: -59px 0 0 -59px;
  }

  .anim-zoomIn {
    animation-name: zoomIn;
  }

  .anim-pan {
    animation-name: anim-pan;
  }

  @keyframes zoomIn {
    0% {
      transform: perspective(200px) translatez(0);
      filter: opacity(0);
    }
    60% {
      filter: opacity(100%);
    }
    100% {
      transform: perspective(200px) translatez(200px);
    }
  }

  @keyframes anim-pan {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(-50%, -45%, 0);
    }
    75% {
      transform: translate3d(45%, 35%, 0);
    }
    85% {
      transform: translate3d(-60%, 25%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }`;

export default Loader;

