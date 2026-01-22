const SectionTitle = ({ children, align = "text-center" }) => (
    <h2
        className={`font-2 text-6xl md:text-8xl font-bold leading-tight text-gradient  ${align}`}>
        {children}
    </h2>
);
export default SectionTitle;
