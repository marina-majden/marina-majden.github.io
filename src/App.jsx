import SpinnerLoader from "./components/SpinnerLoader.tsx";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Skills from "./pages/Skills";
import Playground from "./canvas/Playground";
import Lab from "./lab/Lab.tsx";
import { content } from "./data/data";
import { useState, useEffect } from "react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import BackgroundGlows from "./components/BackgroundGlows";
import Split from "./components/Split.tsx";

export default function App() {
    const [lang, setLang] = useState("hr");
    const [activeTab, setActiveTab] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const t = content[lang];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setMenuOpen(false);

        if (activeTab === "litart" && id !== "litart") {
            setActiveTab("home");
            // Wait for state update and re-render of home, then scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: "smooth" });
                else window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
            return;
        }

        setActiveTab(id);
        if (id === "litart") return;

        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (activeTab === "litart") {
        return <Playground t={t} lang={lang} setActiveTab={scrollToSection} />;
    }

    if (activeTab === "lab") {
        return <Lab setActiveTab={scrollToSection} />;
    }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

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
                setActiveTab={setActiveTab}
                lang={lang}
                setLang={setLang}
                t={t}
            />
            <Hero t={t} scrollToSection={scrollToSection} />
            <Split />
            <About t={t} />
            <Skills t={t} />
            <Services t={t} />
            <Projects t={t} />
            <Contact t={t} />
            <Footer t={t} />
        </div>
    );
}
