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
    className={`text-5xl md:text-7xl lg:text-8xl font-bold font-headings title-gradient tracking-wide uppercase leading-tight transition-all duration-300 ${align}`}
  >
    {children}
  </h2>
);

export default SectionTitle;
