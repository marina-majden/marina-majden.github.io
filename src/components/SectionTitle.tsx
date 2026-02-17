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
        className={`text-5xl md:text-7xl lg:text-8xl font-extrabold font-display leading-relaxed text-gradient animate-gradient-x transition-all duration-300  ${align}`}>
        {children}
    </h2>
);

export default SectionTitle;
