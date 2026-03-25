import { useState, useEffect, lazy, Suspense } from "react";
import { Spinner, SpinnerLoader } from "@/components/SpinnerLoader.tsx";
import Footer from "./Footer.tsx";
import Navbar from "@/components/Navbar.tsx";
import Contact from "./Contact.tsx";
import Hero from "./Hero.tsx";
import { content, type ContentSection } from "../data/data";
import BackgroundCanvas from "@/components/BackgroundCanvas.tsx";
import About from "./About.tsx";

const Projects = lazy(() => import("./Projects.tsx"));
const Services = lazy(() => import("./Services.tsx"));
const Templates = lazy(() => import("./Templates.tsx"));

const Home: React.FC = () => {
    const [lang, setLang] = useState<"hr" | "en">("hr");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const t: ContentSection = content[lang];
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Initial loading state for the homepage assets
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (id: string): void => {
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
    const message =
        "Exciting time in the world right now. Exciting time! - Mr. Robot, S01E01";
    console.log(message);

    return (
        <div className='max-w-screen w-full h-full p-0 m-0 overflow-x-hidden'>
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
            <About t={t} />
            <Suspense fallback={<Spinner />}>
                <Templates t={t} scrollToSection={scrollToSection} />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <Services t={t} />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <Projects t={t} scrollToSection={scrollToSection} />
            </Suspense>
            <Contact t={t} />
            <Footer t={t} />
        </div>
    );
};

export default Home;
