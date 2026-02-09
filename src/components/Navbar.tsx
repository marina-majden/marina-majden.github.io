import React from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { FlaskConical, Globe, Menu, Sparkles, X } from "lucide-react";
import logo from "/logo.svg";

interface ContentNav {
    [key: string]: string;
}

interface Content {
    nav: ContentNav;
}

interface NavbarProps {
    scrolled: boolean;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    scrollToSection: (section: string) => void;
    lang: "hr" | "en";
    setLang: (lang: "hr" | "en") => void;
    t: Content;
}

const Navbar: React.FC<NavbarProps> = ({
    scrolled,
    menuOpen,
    setMenuOpen,
    scrollToSection,
    lang,
    setLang,
    t,
}) =>
    createPortal(
        <nav
            className={`fixed top-6 left-0 right-0 z-50 w-11/12 max-w-6xl px-0 py-2 mx-auto transition-all duration-300 ${
                scrolled
                    ? "md:glass md:rounded-full md:px-6 md:py-4 md:bg-black/80 backdrop-blur-lg border border-slate-900"
                    : "bg-transparent backdrop-blur-none border-none"
            }`}>
            <div className='flex justify-between items-center'>
                <a
                    href='#home'
                    className='cursor-pointer hover:scale-105 transition-transform duration-300 ease-in block'
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("home");
                    }}>
                    <img src={logo} alt='logo' width={36} height={36} />
                </a>

                <div className='hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-gray-300 font-medium'>
                    {["about", "skills", "services", "projects"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item);
                            }}
                            className='relative group hover:text-cyan-400 cursor-pointer transition-colors uppercase tracking-widest py-2'>
                            {t.nav[item]}
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full'></span>
                        </a>
                    ))}
                    <NavLink
                        to='/lab'
                        className={({ isActive }) =>
                            `text-lake-500 hover:text-lake-600 transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1 group ${
                                isActive ? "text-lake-400" : ""
                            }`
                        }>
                        <FlaskConical
                            size={14}
                            className='group-hover:rotate-45 group-hover:scale-105 transition-transform transition-300 ease'
                        />{" "}
                        {t.nav.lab}
                    </NavLink>
                    <NavLink
                        to='/showcase/lit-art'
                        className={({ isActive }) =>
                            `text-candy-500 hover:text-candy-600 transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1 group ${
                                isActive ? "text-candy-400" : ""
                            }`
                        }>
                        <Sparkles
                            size={14}
                            className='group-hover:-rotate-45 group-hover:scale-105 transition-transform transition-300 ease'
                        />{" "}
                        {t.nav.litart}
                    </NavLink>
                    <a
                        href='#contact'
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("contact");
                        }}
                        className='hidden md:block px-6 py-2 rounded-full cursor-pointer border border-white text-white hover:bg-cyan-500 transition-all text-xs uppercase tracking-widest'>
                        {t.nav.contact}
                    </a>

                    <button
                        onClick={() => setLang(lang === "hr" ? "en" : "hr")}
                        className='flex items-center gap-1 text-slate-200 hover:text-cyan-500 cursor-pointer transition-colors duration-500'>
                        <Globe size={16} />
                        <span className='uppercase text-xs font-bold'>
                            {lang}
                        </span>
                    </button>
                </div>

                <button
                    className='md:hidden text-white hover:text-cyan-400 cursor-pointer transition-colors'
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className='md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 font-mono animate-in slide-in-from-top-5 duration-300'>
                    {["about", "skills", "services", "projects"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item);
                            }}
                            className='text-left py-2 cursor-pointer hover:text-cyan-400 hover:pl-2 transition-all'>
                            {t.nav[item]}
                        </a>
                    ))}
                    <NavLink
                        to='/lab'
                        onClick={() => setMenuOpen(false)}
                        className='text-left py-2 cursor-pointer text-lake-400 hover:pl-2 transition-all'>
                        {t.nav.lab}
                    </NavLink>
                    <NavLink
                        to='/showcase/lit-art'
                        onClick={() => setMenuOpen(false)}
                        className='text-left py-2 cursor-pointer text-pink-400 hover:pl-2 transition-all'>
                        {t.nav.litart}
                    </NavLink>
                    <a
                        href='#contact'
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("contact");
                        }}
                        className='text-left py-2 cursor-pointer text-cyan-400 hover:pl-2 transition-all'>
                        {t.nav.contact}
                    </a>
                    <button
                        onClick={() => {
                            setLang(lang === "hr" ? "en" : "hr");
                            setMenuOpen(false);
                        }}
                        className='text-left py-2 cursor-pointer hover:text-pink-400 transition-color transition-300 ease flex items-center gap-2'>
                        <Globe size={16} />{" "}
                        {lang === "hr" ? "English" : "Hrvatski"}
                    </button>
                </div>
            )}
        </nav>,
        document.body,
    );

export default Navbar;
