import { useState, useEffect } from "react";
import SpinnerLoader from "../components/SpinnerLoader.tsx";
import Footer from "./Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Contact from "./Contact.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Projects from "./Projects.jsx";
import Services from "./Services.jsx";
import Skills from "./Skills.jsx";
import { content } from "../data/data.js";
import BackgroundCanvas from "../components/BackgroundCanvas.tsx";
import BackgroundGlows from "../components/BackgroundGlows.tsx";
import Split from "../components/Split.tsx";

export default function Home() {
    const [lang, setLang] = useState<"hr" | "en">("hr");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    const t = content[lang];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Initial loading state for the homepage assets
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (id: string) => {
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (loading) {
        return <SpinnerLoader />;
    }

    return (
        <div className='bg-background/20 max-w-screen p-0 m-0 min-h-screen text-slate-200 font-sans selection:bg-candy-500 selection:text-cyan-500 selection:text-shadow-black selection:text-shadow-md overflow-x-hidden'>
            <BackgroundGlows />
            <BackgroundCanvas />
            <Navbar
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                scrollToSection={scrollToSection}
                lang={lang}
                setLang={setLang}
                t={t}
            />
            <Hero t={t} scrollToSection={scrollToSection} />
            <Split />
            <About t={t} />
            <Skills t={t} />
            <Services t={t} />
            <Projects t={t} scrollToSection={scrollToSection} />
            <Contact t={t} />
            <Footer t={t} />
        </div>
    );
}
