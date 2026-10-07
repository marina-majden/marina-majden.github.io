import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Globe, Menu, X, Sparkles } from "lucide-react";
import { PixelHeartHero, WMHeartLogo } from "@/components/PixelArt";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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

export const Navbar: React.FC<NavbarProps> = ({
    scrolled,
    menuOpen,
    setMenuOpen,
    scrollToSection,
    lang,
    setLang,
    t,
}) => {
    const handleSectionClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sectionId: string,
    ) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            scrollToSection(sectionId);
        }
        setMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-4 left-0 right-0 z-50 w-[94%] max-w-6xl mx-auto rounded-full transition-all duration-300 border ${
                scrolled
                    ? "bg-[rgba(7,7,14,0.92)] border-(--border-medium) shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,245,255,0.12)] backdrop-blur-2xl py-2 px-4 md:px-6"
                    : "bg-[rgba(14,15,28,0.75)] border-(--border-subtle) backdrop-blur-xl py-2.5 px-4 md:px-6 shadow-md"
            }`}>
            <div className='flex justify-between items-center'>
                {/* Brand Logo & Name */}
                <Link
                    to='/'
                    className='flex items-center gap-2.5 cursor-pointer group select-none'
                    onClick={(e) => handleSectionClick(e, "home")}>
                    <PixelHeartHero />
                    <span className='font-heading text-lg md:text-xl font-extrabold text-white tracking-wide group-hover:text-[var(--neon-blue)] transition-colors'>
                        Web Mashina
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className='hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold'>
                    <a
                        href='/#mission'
                        onClick={(e) => handleSectionClick(e, "mission")}
                        className='hover:text-[var(--neon-blue)] transition-colors py-1 relative group'>
                        {t.nav.mission}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--neon-blue)] transition-all duration-200 group-hover:w-full' />
                    </a>

                    <a
                        href='/#webshop'
                        onClick={(e) => handleSectionClick(e, "webshop")}
                        className='hover:text-[var(--neon-blue)] transition-colors py-1 relative group'>
                        {t.nav.webshop}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--neon-blue)] transition-all duration-200 group-hover:w-full' />
                    </a>

                    <a
                        href='/#lab'
                        onClick={(e) => handleSectionClick(e, "lab")}
                        className='hover:text-[var(--neon-pink)] transition-colors py-1 relative group flex items-center gap-1'>
                        <Sparkles
                            size={12}
                            className='text-[var(--neon-pink)]'
                        />
                        {t.nav.lab}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--neon-pink)] transition-all duration-200 group-hover:w-full' />
                    </a>

                    <a
                        href='/#projects'
                        onClick={(e) => handleSectionClick(e, "projects")}
                        className='hover:text-[var(--neon-blue)] transition-colors py-1 relative group'>
                        {t.nav.projects}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--neon-blue)] transition-all duration-200 group-hover:w-full' />
                    </a>

                    <a
                        href='/#services'
                        onClick={(e) => handleSectionClick(e, "services")}
                        className='hover:text-[var(--neon-green)] transition-colors py-1 relative group'>
                        {t.nav.services}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--neon-green)] transition-all duration-200 group-hover:w-full' />
                    </a>

                    {/* Contact Button */}
                    <a
                        href='#contact'
                        onClick={(e) => handleSectionClick(e, "contact")}
                        className='btn btn-outline text-xs px-4 py-1.5 min-h-0 rounded-full'>
                        {t.nav.contact} ↗
                    </a>

                    {/* Compact Theme Palette Dots */}
                    <div className='pl-2 border-l border-white/10'>
                        <ThemeSwitcher compact={true} />
                    </div>

                    {/* Language Switcher */}
                    <button
                        type='button'
                        onClick={() => setLang(lang === "hr" ? "en" : "hr")}
                        className='flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/10'
                        title={
                            lang === "hr"
                                ? "Promijeni jezik"
                                : "Switch language"
                        }>
                        <Globe size={13} />
                        <span className='text-[11px] font-bold'>
                            {lang === "hr" ? "EN" : "HR"}
                        </span>
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <div className='flex items-center gap-2 lg:hidden'>
                    <ThemeSwitcher compact={true} />

                    <button
                        type='button'
                        className='text-white hover:text-[var(--neon-blue)] p-1.5 cursor-pointer transition-colors'
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label='Toggle navigation menu'>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className='lg:hidden absolute top-[calc(100%+8px)] left-0 w-full bg-[rgba(7,7,14,0.96)] backdrop-blur-2xl border border-[var(--border-medium)] rounded-3xl p-6 flex flex-col gap-3.5 font-mono text-sm shadow-2xl animate-in slide-in-from-top-3 duration-200'>
                    <a
                        href='/#mission'
                        onClick={(e) => handleSectionClick(e, "mission")}
                        className='py-2 text-slate-200 hover:text-[var(--neon-blue)] transition-colors'>
                        {t.nav.mission}
                    </a>

                    <a
                        href='/#webshop'
                        onClick={(e) => handleSectionClick(e, "webshop")}
                        className='py-2 text-slate-200 hover:text-[var(--neon-blue)] transition-colors'>
                        {t.nav.webshop}
                    </a>

                    <a
                        href='/#lab'
                        onClick={(e) => handleSectionClick(e, "lab")}
                        className='py-2 text-[var(--neon-pink)] transition-colors flex items-center gap-1.5'>
                        <Sparkles size={14} />
                        {t.nav.lab}
                    </a>

                    <a
                        href='/#projects'
                        onClick={(e) => handleSectionClick(e, "projects")}
                        className='py-2 text-slate-200 hover:text-[var(--neon-blue)] transition-colors'>
                        {t.nav.projects}
                    </a>

                    <a
                        href='/#services'
                        onClick={(e) => handleSectionClick(e, "services")}
                        className='py-2 text-[var(--neon-green)] transition-colors'>
                        {t.nav.services}
                    </a>

                    <div className='pt-3 border-t border-white/10 flex items-center justify-between'>
                        <a
                            href='#contact'
                            onClick={(e) => handleSectionClick(e, "contact")}
                            className='btn btn-primary text-xs px-5 py-2'>
                            {t.nav.contact} ↗
                        </a>

                        <button
                            type='button'
                            onClick={() => {
                                setLang(lang === "hr" ? "en" : "hr");
                                setMenuOpen(false);
                            }}
                            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold cursor-pointer'>
                            <Globe size={14} />
                            <span>
                                {lang === "hr"
                                    ? "English (EN)"
                                    : "Hrvatski (HR)"}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
