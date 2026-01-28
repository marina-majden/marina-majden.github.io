const GLITCH_ANIMATION = {
    opacity: [1, 0.8, 1, 1, 0.1, 1, 0.9, 1, 0.1, 1, 0.95, 1],
    textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d946ef, 0 0 40px #d946ef",
        "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #d946ef, 0 0 20px #d946ef",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d946ef, 0 0 40px #d946ef",
    ],
    boxShadow: [
        "0 0 5px #a855f7, 0 0 10px #a855f7, inset 0 0 5px #a855f7",
        "0 0 2px #a855f7, 0 0 5px #a855f7, inset 0 0 2px #a855f7",
        "0 0 5px #a855f7, 0 0 10px #a855f7, inset 0 0 5px #a855f7",
    ],
};

const GLITCH_TRANSITION = {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror" as const,
    times: [0, 0.05, 0.1, 0.2, 0.22, 0.25, 0.3, 0.35, 0.36, 0.4, 0.8, 1],
};

const CARD_VARIANTS = {
    indigo: "border-indigo-500/30 bg-indigo-900/10 hover:border-indigo-500/50 hover:bg-indigo-900/20 shadow-[0_0_40px_-10px_rgba(79,70,229,0.1)]",
    purple: "border-purple-500/30 bg-purple-900/10 hover:border-purple-500/50 hover:bg-purple-900/20 shadow-[0_0_40px_-10px_rgba(168,85,247,0.1)]",
    cyan: "border-cyan-500/30 bg-cyan-900/10 hover:border-cyan-500/50 hover:bg-cyan-900/20 shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)]",
};

export { GLITCH_ANIMATION, GLITCH_TRANSITION, CARD_VARIANTS };
