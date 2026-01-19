import { FlaskConical, Globe, Menu, Sparkles, X } from "lucide-react";

const Navbar = ({
    scrolled,
    menuOpen,
    setMenuOpen,
    scrollToSection,
    setActiveTab,
    lang,
    setLang,
    t,
}) => (
    <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl transition-all duration-300 ${
            scrolled
                ? "glass rounded-full px-6 py-4 bg-black/20"
                : "bg-transparent w-full px-6 py-4"
        }`}>
        <div className='flex justify-between items-center'>
            <h1
                className='text-5xl text-gradient font-extrabold my-2 font-logo cursor-pointer hover:scale-105 transition-transform duration-300 ease'
                onClick={() => scrollToSection("home")}>
                &lt;M /&gt;
            </h1>

            <div className='hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-gray-300 font-medium'>
                {["about", "skills", "services", "projects"].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className='relative group hover:text-cyan-400 cursor-pointer transition-colors uppercase tracking-widest py-2'>
                        {t.nav[item]}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full'></span>
                    </button>
                ))}
                <button
                    onClick={() => setActiveTab("lab")}
                    className='text-lake-500 hover:text-lake-400 transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1 group'>
                    <FlaskConical
                        size={14}
                        className='group-hover:rotate-x-45 group-hover:scale-105 transition-transform transition-300 ease'
                    />{" "}
                    {t.nav.lab}
                </button>
                <button
                    onClick={() => setActiveTab("litart")}
                    className='text-neon-pink hover:text-pink-600 transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1 group'>
                    <Sparkles
                        size={14}
                        className='group-hover:scale-105 transition-transform transition-300 ease'
                    />{" "}
                    {t.nav.litart}
                </button>
                <button
                    onClick={() => scrollToSection("contact")}
                    className='hidden md:block px-6 py-2 rounded-full cursor-pointer border border-white/50 text-white hover:bg-cyan-500/20 transition-all text-xs uppercase tracking-widest'>
                    {t.nav.contact}
                </button>

                <button
                    onClick={() => setLang(lang === "hr" ? "en" : "hr")}
                    className='flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer transition-colors duration-500'>
                    <Globe size={16} />
                    <span className='uppercase text-xs font-bold'>{lang}</span>
                </button>
            </div>

            <button
                className='md:hidden text-white hover:text-cyan-400 cursor-pointer transition-colors'
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {menuOpen && (
            <div className='md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b  border-slate-800 p-6 flex flex-col gap-4 font-mono animate-in slide-in-from-top-5 duration-300'>
                {["about", "skills", "services", "projects"].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className='text-left py-2 cursor-pointer hover:text-cyan-400 hover:pl-2 transition-all'>
                        {t.nav[item]}
                    </button>
                ))}
                <button
                    onClick={() => setActiveTab("lab")}
                    className='text-left py-2 cursor-pointer text-lake-400 hover:pl-2 transition-all'>
                    {t.nav.lab}
                </button>
                <button
                    onClick={() => setActiveTab("litart")}
                    className='text-left py-2 cursor-pointer text-pink-400 hover:pl-2 transition-all'>
                    {t.nav.litart}
                </button>
                <button
                    onClick={() => scrollToSection("contact")}
                    className='text-left py-2 cursor-pointer text-cyan-400 hover:pl-2 transition-all'>
                    {t.nav.contact}
                </button>
                <button
                    onClick={() => {
                        setLang(lang === "hr" ? "en" : "hr");
                        setMenuOpen(false);
                    }}
                    className='text-left py-2 cursor-pointer hover:text-pink-400 transition-color transition-300 ease flex items-center gap-2'>
                    <Globe size={16} /> {lang === "hr" ? "English" : "Hrvatski"}
                </button>
            </div>
        )}
    </nav>
);
export default Navbar;
