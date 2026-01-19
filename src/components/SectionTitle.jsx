const SectionTitle = ({ children, align = "text-center" }) => (
    <h2
        className={`text-5xl md:text-7xl font-bold py-6 mb-12 ${align} bg-clip-text text-transparent text-shadow-black text-shadow-2xl bg-linear-to-tr from-cyan-500 to-purple-400 font-serif z-30 leading-16`}>
        {children}
    </h2>
);
export default SectionTitle;
