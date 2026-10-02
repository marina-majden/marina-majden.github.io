import React, { useState, useEffect } from "react";
import {
    Code,
    Palette,
    Database,
    TrendingUp,
    Cloud,
    Check,
    Sparkles,
    ArrowDown,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useServices } from "@/context/ServicesContext";
import { showToast } from "./ToastHub";

interface Panel {
    id: number;
    title: string;
    sub: string;
    description: string;
    price: string;
    icon: React.ReactNode;
    color: string;
    accentToken: string;
}

const panelsEn: Panel[] = [
    {
        id: 1,
        title: "Web Development",
        sub: "Custom websites",
        description:
            "Build lightning-fast, fully responsive, and accessible websites tailored specifically to your brand with modern tech.",
        price: "From €800",
        icon: <Code size={24} />,
        color: "var(--neon-blue)",
        accentToken: "var(--neon-blue)",
    },
    {
        id: 2,
        title: "UI/UX Design",
        sub: "Engaging experiences",
        description:
            "Craft intuitive, user-centric interfaces that captivate your audience, convey your brand story, and drive conversions.",
        price: "From €400",
        icon: <Palette size={24} />,
        color: "var(--neon-pink)",
        accentToken: "var(--neon-pink)",
    },
    {
        id: 3,
        title: "Backend Systems",
        sub: "Robust & scalable",
        description:
            "Develop secure, clean, and high-performance server-side architectures to power your web applications.",
        price: "From €600",
        icon: <Database size={24} />,
        color: "var(--neon-green)",
        accentToken: "var(--neon-green)",
    },
    {
        id: 4,
        title: "SEO Optimization",
        sub: "Boost visibility",
        description:
            "Enhance your online presence with data-driven SEO strategies that rank you higher on search engines and bring organic clients.",
        price: "From €300",
        icon: <TrendingUp size={24} />,
        color: "var(--neon-yellow)",
        accentToken: "var(--neon-yellow)",
    },
    {
        id: 5,
        title: "Cloud & Deployment",
        sub: "Deploy anywhere",
        description:
            "Seamlessly migrate, configure domains, SSL, and manage your digital assets with scalable and reliable hosting solutions.",
        price: "From €500",
        icon: <Cloud size={24} />,
        color: "var(--neon-purple)",
        accentToken: "var(--neon-purple)",
    },
];

const panelsHr: Panel[] = [
    {
        id: 1,
        title: "Vizualni identitet",
        sub: "Ključ izgradnje branda",
        description:
            "Za one koji stvaraju više od biznisa potreban je jasan i autentičan vizualni jezik koji će uspješno komunicirati Vaše vrijednosti i privući prave klijente.",
        price: "100 - 300 €",
        icon: <Palette size={24} />,
        color: "var(--neon-pink)",
        accentToken: "var(--neon-pink)",
    },
    {
        id: 2,
        title: "UI/UX dizajn",
        sub: "Gdje forma susreće funkciju",
        description:
            "Uspješne web-stranice balansiraju na spoju estetike, funkcionalnosti i korisničkog iskustva. To je područje koje traži senzibilitet, istančana osjetila i dobar osjećaj za mjeru.",
        price: "200 - 400 €",
        icon: <Sparkles size={24} />,
        color: "var(--neon-blue)",
        accentToken: "var(--neon-blue)",
    },
    {
        id: 3,
        title: "Razvoj web-stranice",
        sub: "Pixel-perfect kod",
        description:
            "Izrada brzih, responzivnih i sigurnih web rješenja skrojenih prema vašim specifičnim potrebama, optimiziranih za sve uređaje i tražilice.",
        price: "300 - 800 €",
        icon: <Code size={24} />,
        color: "var(--neon-green)",
        accentToken: "var(--neon-green)",
    },
    {
        id: 4,
        title: "Postavljanje & Hosting",
        sub: "Sigurnost i stabilnost",
        description:
            "Konfiguracija domene, SSL certifikata, hosting servera i briga o tehničkim detaljima kako bi vaša stranica radila bez zastoja.",
        price: "100 - 200 €",
        icon: <Cloud size={24} />,
        color: "var(--neon-purple)",
        accentToken: "var(--neon-purple)",
    },
    {
        id: 5,
        title: "Održavanje & SEO",
        sub: "Dugoročni mir",
        description:
            "Web stranica je živi organizam. Nudim uslugu redovitog ažuriranja, sigurnosnih kopija, SEO optimizacije i sitnih izmjena.",
        price: "50 - 150 € / mj.",
        icon: <TrendingUp size={24} />,
        color: "var(--neon-yellow)",
        accentToken: "var(--neon-yellow)",
    },
];

export const Accordion: React.FC = () => {
    const { lang } = useLanguage();
    const panels = lang === "hr" ? panelsHr : panelsEn;
    const [activeId, setActiveId] = useState<number>(panels[0].id);
    const { selectedServices, toggleService, isServiceSelected } =
        useServices();

    const handleServiceToggle = (title: string) => {
        toggleService(title);
        const selected = !isServiceSelected(title);
        showToast(
            selected
                ? lang === "hr"
                    ? `Dodano u kontakt poruku: ${title}`
                    : `Added to message: ${title}`
                : lang === "hr"
                  ? `Uklonjeno: ${title}`
                  : `Removed: ${title}`,
            "heart",
        );
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Auto cycle
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveId((prevId) => {
                const currentIndex = panels.findIndex((p) => p.id === prevId);
                const nextIndex = (currentIndex + 1) % panels.length;
                return panels[nextIndex].id;
            });
        }, 6000);
        return () => clearInterval(timer);
    }, [activeId, panels]);

    return (
        <div className='flex flex-col items-center justify-center overflow-hidden bg-transparent p-2 md:p-4 font-sans text-slate-100 gap-8 w-full max-w-6xl mx-auto'>
            {/* Main Accordion Stage */}
            <div className='flex min-h-[460px] h-full w-full max-w-[1100px] flex-col md:flex-row items-stretch overflow-hidden gap-3'>
                {panels.map((panel) => {
                    const isActive = activeId === panel.id;
                    const isSelected = isServiceSelected(panel.title);

                    return (
                        <div
                            key={panel.id}
                            onClick={() => setActiveId(panel.id)}
                            style={{
                                flexGrow: isActive ? 5 : 1,
                                borderColor: isActive
                                    ? panel.accentToken
                                    : "var(--border-subtle)",
                                boxShadow: isActive
                                    ? `0 12px 32px rgba(0,0,0,0.7), 0 0 24px ${panel.accentToken}33`
                                    : "none",
                            }}
                            className={`relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[rgba(14,15,28,0.85)] backdrop-blur-xl ${
                                isActive
                                    ? "min-h-[280px] md:min-h-0"
                                    : "min-h-[70px] md:min-h-0"
                            }`}>
                            {/* Radial Glow Overlay (No heavy photos, pure clean light) */}
                            <div
                                style={{
                                    background: `radial-gradient(circle at 50% 80%, ${panel.accentToken}22 0%, transparent 70%)`,
                                }}
                                className='absolute inset-0 pointer-events-none z-0'
                            />

                            {/* Top Accent Strip */}
                            <div
                                style={{ background: panel.accentToken }}
                                className='absolute top-0 left-0 right-0 h-1 z-10'
                            />

                            {/* Content Layout */}
                            <div className='relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between h-full w-full p-4 md:p-6 gap-4'>
                                {/* Header / Label */}
                                <div className='flex items-center md:items-end gap-3'>
                                    <div
                                        className='flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-md transition-colors'
                                        style={{ color: panel.accentToken }}>
                                        {panel.icon}
                                    </div>

                                    <div className='flex flex-col text-left'>
                                        <span className='text-base sm:text-lg font-heading font-bold text-white tracking-wide'>
                                            {panel.title}
                                        </span>
                                        <span className='text-xs text-slate-400'>
                                            {panel.sub}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Description & Select Button */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col justify-end w-full md:w-auto ${
                                        isActive
                                            ? "max-h-[300px] opacity-100 mt-2 md:mt-0"
                                            : "max-h-0 opacity-0 hidden md:flex"
                                    }`}>
                                    <div className='bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg mb-3 max-w-md'>
                                        <span
                                            className='block text-base font-mono font-bold mb-1'
                                            style={{
                                                color: panel.accentToken,
                                            }}>
                                            {panel.price}
                                        </span>
                                        <p className='text-xs sm:text-sm text-slate-300 leading-relaxed font-sans'>
                                            {panel.description}
                                        </p>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleServiceToggle(panel.title);
                                        }}
                                        className={`btn text-xs py-2 px-4 rounded-full transition-all duration-300 w-full sm:w-auto min-h-0 ${
                                            isSelected
                                                ? "btn-primary shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                                                : "btn-outline"
                                        }`}>
                                        <span>
                                            {isSelected
                                                ? lang === "hr"
                                                    ? "✓ Odabrano za poruku"
                                                    : "✓ Selected for message"
                                                : lang === "hr"
                                                  ? "+ Odaberi uslugu"
                                                  : "+ Select service"}
                                        </span>
                                        {isSelected && <Check size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected Services Dynamic Status Bar */}
            <div className='w-full max-w-[1100px] p-4 md:p-6 rounded-2xl bg-[rgba(14,15,28,0.8)] border border-[var(--border-subtle)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto'>
                    <span className='font-mono text-xs font-bold text-[var(--neon-blue)] uppercase tracking-wider whitespace-nowrap'>
                        {lang === "hr" ? "Odabrano:" : "Selected:"}
                    </span>
                    <div className='flex flex-wrap gap-1.5'>
                        {selectedServices.length > 0 ? (
                            selectedServices.map((title) => (
                                <span
                                    key={title}
                                    onClick={() => handleServiceToggle(title)}
                                    className='px-3 py-1 bg-[rgba(0,245,255,0.12)] text-[var(--neon-blue)] border border-[rgba(0,245,255,0.3)] text-xs rounded-full cursor-pointer hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-400 transition-colors'
                                    title={
                                        lang === "hr"
                                            ? "Klikni za uklanjanje"
                                            : "Click to remove"
                                    }>
                                    {title} ✕
                                </span>
                            ))
                        ) : (
                            <span className='text-xs text-slate-400 italic font-mono'>
                                {lang === "hr"
                                    ? "Kliknite 'Odaberi uslugu' kako bi se automatski unijela u kontakt formu"
                                    : "Click 'Select service' to auto-populate the contact form"}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    type='button'
                    onClick={scrollToContact}
                    className='btn btn-primary text-xs px-6 py-2.5 whitespace-nowrap shrink-0 flex items-center gap-2'>
                    <span>
                        {lang === "hr"
                            ? "Idi na kontakt formu"
                            : "Go to Contact Form"}
                    </span>
                    <ArrowDown size={14} />
                </button>
            </div>
        </div>
    );
};

export default Accordion;
