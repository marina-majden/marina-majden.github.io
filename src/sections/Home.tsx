import { useState, useEffect, lazy, Suspense } from "react";
import { Spinner } from "@/components/SpinnerLoader.tsx";
import Footer from "./Footer.tsx";
import Navbar from "@/components/Navbar.tsx";
import Contact from "./Contact.tsx";
import Hero from "./Hero.tsx";
import { content, type ContentSection } from "../data/data";
import BackgroundCanvas from "@/components/BackgroundCanvas.tsx";
import Mission from "./Mission.tsx";
import { useLanguage } from "@/components/LanguageContext";

const Projects = lazy(() => import("./Projects.tsx"));
const Services = lazy(() => import("./Services.tsx"));
const Templates = lazy(() => import("./Templates.tsx"));

const Home: React.FC = () => {
    const { lang, setLang } = useLanguage();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    const t: ContentSection = content[lang] || content.hr;
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
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
            <Mission t={t} />
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
