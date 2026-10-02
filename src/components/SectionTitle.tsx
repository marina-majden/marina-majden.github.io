import React, { ReactNode } from "react";

interface SectionTitleProps {
    children: ReactNode;
    align?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    align = "text-center",
}) => (
    <h2
        className={`text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-wide uppercase leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-pink)] animate-gradient-x transition-all duration-300 drop-shadow-[0_0_25px_rgba(0,245,255,0.25)] ${align}`}>
        {children}
    </h2>
);

export default SectionTitle;
