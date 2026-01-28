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
        className={`text-6xl md:text-7xl lg:text-8xl font-bold font-di leading-tight text-gradient ${align}`}>
        {children}
    </h2>
);

export default SectionTitle;
