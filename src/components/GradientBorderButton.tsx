import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children = "Let's get started",
  ...props
}) => {
  return (
    <div className="relative group block p-0 m-auto">
      <button
        className="relative inline-block p-px font-semibold tracking-widest font-stretch-150% uppercase leading-6 text-neon-cyan bg-gray-800 shadow-2xl cursor-pointer rounded-full shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        {...props}
      >
        {/* Gradient Border (vidljiv na ) */}
        <span className="absolute inset-0 rounded-full bg-linear-45 from-teal-400 via-blue-500 to-purple-500 p-0.5 opacity-100 group-hover:bg-linear-135 transition-colors duration-300 ease-in-out" />

        {/* Unutarnja tamna pozadina i sadržaj */}
        <span className="relative z-10 block px-6 py-3 rounded-full bg-gray-950">
          <div className="relative z-10 flex items-center space-x-2">
            <span className="transition-all duration-500 group-hover:translate-x-1">
              {children}
            </span>
            <svg
              className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </span>
      </button>
    </div>
  );
};
export default GradientButton;
