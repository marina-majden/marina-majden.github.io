import React from "react";
import { motion } from "framer-motion";
import {
    GLITCH_ANIMATION,
    GLITCH_TRANSITION,
} from "../../data/constants.ts";

const NeonSign = () => (
    <div className='fixed top-28 -right-4 md:top-24 md:right-8 z-0 pointer-events-none select-none transform rotate-[8deg] hidden sm:block opacity-60 mix-blend-screen'>
        <motion.div
            animate={GLITCH_ANIMATION}
            transition={GLITCH_TRANSITION}
            className='px-4 py-2 md:px-6 md:py-3 border-2 border-purple-500/10 rounded-xl bg-black/10 backdrop-blur-[2px]'>
            <span className='font-link font-bold text-2xl md:text-3xl tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-cyan-400/50 via-fuchsia-400/50 to-indigo-400/50'>
                Project Showcase
            </span>
        </motion.div>
    </div>
);

export default NeonSign;
