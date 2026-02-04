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
        className={`text-5xl md:text-6xl lg:text-7xl tracking-tighter font-bold font-heading leading-relaxed gradient-neon-effect ${align}`}>
        {children}
    </h2>
);

export default SectionTitle;
