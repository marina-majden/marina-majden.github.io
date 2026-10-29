import React from "react";

/* da ne yaboravim :  className="
        relative m-2.5 h-[3em] w-[3em] appearance-none grid place-content-center rounded-full
        bg-transparent backdrop-blur-lg translate-y-[-0.075em] cursor-pointer before:content-[''] before:h-[0.5em] before:w-[0.5em] before:rounded-full
        before:bg-transparent before:border before:border-[#000000bd]
        before:shadow-[0px_0px_10px_1px_#f1eeff] before:transition-all before:duration-120 before:ease-in-out
        hover:before:bg-[#7af4ec] hover:before:shadow-[0px_0px_10px_1px_#7af4ec]
         checked:bg-[conic-gradient(from_300deg_at_50%_50%,#e5719e,#7af4ec,#1a3271,#101a2e,#a859a0)]
        checked:before:h-[1em] checked:before:w-[1em]
        checked:before:bg-[#1e4ada94] checked:before:shadow-[0px_0px_30px_20px_#a35a99] checked:transition-all checked:duration-120 checked:ease-in-out
      " */

export const Radio: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="
          radio-input flex overflow-hidden rounded-full 
          transition-all duration-300 ease-in-out
          [&:has(input:nth-child(1):checked)]:bg-[conic-gradient(from_300deg_at_18%_50%,#e5719e,#7af4ec,#1a3271,#101a2e,#a859a0)]
          [&:has(input:nth-child(2):checked)]:bg-[conic-gradient(from_300deg_at_51%_50%,#e5719e,#7af4ec,#1a3271,#101a2e,#a859a0)]
          [&:has(input:nth-child(3):checked)]:bg-[conic-gradient(from_300deg_at_84%_50%,#e5719e,#7af4ec,#1a3271,#101a2e,#a859a0)]
        "
      >
        <RadioInput id="value-1" defaultValue="value-1" name="value-radio" />
        <RadioInput id="value-2" defaultValue="value-2" name="value-radio" />
        <RadioInput id="value-3" defaultValue="value-3" name="value-radio" />
      </div>
    </div>
  );
};

interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RadioInput: React.FC<RadioInputProps> = (props) => {
  return (
    <input
      type="radio"
      {...props}
      className="
        relative m-2.5 h-[3em] w-[3em] appearance-none grid place-content-center rounded-full
        bg-transparent backdrop-blur-lg translate-y-[-0.075em] cursor-pointer before:content-[''] before:h-[0.5em] before:w-[0.5em] before:rounded-full
        before:bg-transparent before:border before:border-[#000000bd]
        before:shadow-[0px_0px_10px_1px_#f1eeff] before:transition-all before:duration-120 before:ease-in-out
        hover:before:bg-[#7af4ec] hover:before:shadow-[0px_0px_10px_1px_#7af4ec]
         checked:bg-[conic-gradient(from_300deg_at_50%_50%,#e5719e,#7af4ec,#1a3271,#101a2e,#a859a0)]
        checked:before:h-[1em] checked:before:w-[1em]
        checked:before:bg-[#1e4ada94] checked:before:shadow-[0px_0px_30px_20px_#a35a99] checked:transition-all checked:duration-120 checked:ease-in-out
      "
    />
  );
};

export default Radio;
