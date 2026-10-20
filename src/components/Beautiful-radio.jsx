import React from 'react';
import styled from 'styled-components';

const Radio = () => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        <input defaultValue="value-1" name="value-radio" id="value-1" type="radio" />
        <input defaultValue="value-2" name="value-radio" id="value-2" type="radio" />
        <input defaultValue="value-3" name="value-radio" id="value-3" type="radio" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    box-shadow: inset 0px 0px 10px 1px #ffffff;
    border-radius: 25px;
    border: 5px solid#000000;
    overflow: hidden;
  }

  .radio-input:has(input:nth-child(1):checked) {
    background: conic-gradient(from 300deg at 18% 50%, #e5719e, #7af4ec, #1a3271, #101a2e, #a859a0);
  }

  .radio-input:has(input:nth-child(2):checked) {
    background: conic-gradient(from 300deg at 51% 50%, #e5719e, #7af4ec, #1a3271, #101a2e, #a859a0);
  }

  .radio-input:has(input:nth-child(3):checked) {
    background: conic-gradient(from 300deg at 84% 50%, #e5719e, #7af4ec, #1a3271, #101a2e, #a859a0);
  }

  .radio-input input[type="radio"] {
    appearance: none;
    backdrop-filter: blur(16px);
    background-color: transparent;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    margin: 10px;
  }

  .radio-input input[type="radio"]::before {
    content: "";
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    /* transform: scale(0); */
    transition: 120ms transform ease-in-out;
    background-color: transparent;
    box-shadow: 0px 0px 10px 1px #ffffff;
    border: 1px solid #0000005d;
  }

  .radio-input input[type="radio"]:hover::before {
    background-color: #7af4ec;
    box-shadow: 0px 0px 10px 1px #7af4ec;
  }

  .radio-input input[type="radio"]:checked {
    background: conic-gradient(from 300deg at 50% 50%, #e5719e, #7af4ec, #1a3271, #101a2e, #a859a0);
  }

  .radio-input input[type="radio"]:checked::before {
    /* transform: scale(1); */
    width: 1em;
    height: 1em;
    background-color: #1e4ada94;
    box-shadow: 0px 0px 30px 20px #a35a99;
  }`;

export default Radio;
