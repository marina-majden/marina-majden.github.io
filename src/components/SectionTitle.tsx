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
        className={`text-5xl md:text-6xl lg:text-9xl  font-extrabold font-heading leading-relaxed text-gradient animate-gradient-x transition-all duration-300  ${align}`}>
        {children}
    </h2>
);

export default SectionTitle;
