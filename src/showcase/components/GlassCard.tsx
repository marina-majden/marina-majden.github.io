import React from "react";
import { motion } from "framer-motion";

// Define color variants for the colored glass card
const CARD_VARIANTS: Record<string, string> = {
    indigo: "border-indigo-500/20 bg-indigo-500/10",
    purple: "border-purple-500/20 bg-purple-500/10",
    cyan: "border-cyan-500/20 bg-cyan-500/10",
};

const ColoredGlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "indigo" | "purple" | "cyan";
}> = ({ children, className = "", variant = "indigo" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-500 ${CARD_VARIANTS[variant]} ${className}`}>
            <div
                className={`absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/5 to-transparent opacity-50 pointer-events-none`}
            />
            <div className='relative z-10'>{children}</div>
        </motion.div>
    );
};

const GlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => (
    <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition-colors ${className}`}>
        {children}
    </div>
);

export { GlassCard, ColoredGlassCard };
