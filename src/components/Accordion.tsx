import React, { useState, useEffect } from "react";
import {
    Code,
    Palette,
    Database,
    TrendingUp,
    Cloud,
    Check,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

// Definicija tipa za naše kartice
interface Panel {
    id: number;
    title: string;
    sub: string;
    description: string;
    price: string;
    icon: React.ReactNode;
    bgUrl: string;
    color: string;
}

const panelsEn: Panel[] = [
    {
        id: 1,
        title: "Web Development",
        sub: "Custom websites",
        description:
            "Build lightning-fast, fully responsive, and accessible websites tailored specifically to your brand.",
        price: "From €800",
        icon: <Code size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-lake-700)",
    },
    {
        id: 2,
        title: "UI/UX Design",
        sub: "Engaging experiences",
        description:
            "Craft intuitive, user-centric interfaces that captivate your audience and drive conversions.",
        price: "From €400",
        icon: <Palette size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-peach-500)",
    },
    {
        id: 3,
        title: "Backend Systems",
        sub: "Robust & scalable",
        description:
            "Develop secure and high-performance server-side architectures to power your web applications.",
        price: "From €600",
        icon: <Database size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-mint-500)",
    },
    {
        id: 4,
        title: "SEO Optimization",
        sub: "Boost visibility",
        description:
            "Enhance your online presence with data-driven SEO strategies that rank you higher on search engines.",
        price: "From €300",
        icon: <TrendingUp size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-candy-500)",
    },
    {
        id: 5,
        title: "Cloud Architecture",
        sub: "Deploy anywhere",
        description:
            "Seamlessly migrate and manage your digital assets with scalable and reliable cloud solutions.",
        price: "From €500",
        icon: <Cloud size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-purple-600)",
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
        bgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-teal-700)",
    },
    {
        id: 2,
        title: "UI/UX dizajn",
        sub: "Gdje forma susreće funkciju",
        description:
            "Da, AI alati mogu generirati <i>nekakav</i> web-dizajn, ali <b>uspješne</b> web-stranice balansiraju na vrlo delikatnom spoju estetike, funkcionalnosti i korisničkog iskustva. To je kompleksno područje koje, uz klasično teorijsko znanje, zahtijeva i intuitivno razumijevanje ljudskog ponašanja, preduhitrivanje trendova i anticipiranje korisničkih zahtjeva, između ostalog. To su stvari koje traže poseban senzibilitet, istančana osjetila, dobar osjećaj za mjeru i na kraju krajeva, zdrav ljudski razum. Žao mi je, Roboti.",
        price: "200 - 400 €",
        icon: <Palette size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-lake-700)",
    },
    {
        id: 3,
        title: "Izrada web-stranice",
        sub: "",
        description:
            "Izrada munjevito brzih, potpuno responzivnih i pristupačnih web stranica krojenih točno za vaš brend.",
        price: "500 - 1500 €",
        icon: <Code size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-indigo-500)",
    },
    {
        id: 4,
        title: "SEO Optimizacija",
        sub: "Povećana vidljivost",
        description:
            "Unaprijedite svoju online prisutnost pomoću data-driven SEO strategija za bolje rangiranje na tražilicama.",
        price: "100 - 300 €",
        icon: <TrendingUp size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-purple-600)",
    },
    {
        id: 5,
        title: "Cloud Arhitektura",
        sub: "Postavite bilo gdje",
        description:
            "Besprijekorna migracija i upravljanje digitalnom imovinom uz skalabilna i pouzdana cloud rješenja.",
        price: "400 - 600 €",
        icon: <Cloud size={24} />,
        bgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        color: "var(--color-candy-600)",
    },
];

const ExpandingGallery: React.FC = () => {
    const { lang } = useLanguage();
    const panels = lang === "hr" ? panelsHr : panelsEn;

    const [activeId, setActiveId] = useState<number>(1);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const toggleService = (id: number) => {
        setSelectedServices((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    // Auto-play timer
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveId((prevId) => {
                const currentIndex = panels.findIndex((p) => p.id === prevId);
                const nextIndex = (currentIndex + 1) % panels.length;
                return panels[nextIndex].id;
            });
        }, 5000); // Cycles every 5 seconds

        return () => clearInterval(timer);
    }, [activeId, panels]); // Adding activeId to the dependency array resets the timer if the user manually clicks

    return (
        <div className='flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent p-4 font-sans text-offwhite transition-all duration-300 gap-8'>
            {/* Glavni kontejner za galeriju */}
            <div className='flex min-h-[400px] h-full w-full md:not-open:min-w-[600px] max-w-[1200px] flex-row items-stretch overflow-hidden'>
                {panels.map((panel) => {
                    const isActive = activeId === panel.id;
                    const isSelected = selectedServices.includes(panel.id);

                    return (
                        <div
                            key={panel.id}
                            onClick={() => setActiveId(panel.id)}
                            style={{
                                backgroundImage: `url(${panel.bgUrl})`,
                                backgroundColor: panel.color,
                                flexGrow: isActive ? 10000 : 1,
                                backgroundSize: isActive
                                    ? "auto 135%"
                                    : "auto 100%",
                            }}
                            className={`relative cursor-pointer overflow-hidden bg-cover bg-center transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                                isActive
                                    ? "m-0 max-w-[800px] rounded-[40px]"
                                    : "m-1 min-w-20 rounded-[30px] sm:m-1.5"
                            } `}>
                            {/* Panel Color Gradient Overlay */}
                            <div
                                style={{
                                    background: `linear-gradient(20deg, ${panel.color} 25%, transparent 80%)`,
                                }}
                                className='absolute inset-0 pointer-events-none z-0'
                            />
                            {/* Overlay gradients for text readability */}
                            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none' />
                            <div className='absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent opacity-80 pointer-events-none' />

                            {/* Content Container */}
                            <div className='relative z-10 flex flex-row items-end h-full w-full p-2.5 sm:p-5'>
                                {/* Vertical Header */}
                                <div className='flex flex-col items-center justify-end h-full w-10 shrink-0'>
                                    <div className='flex flex-col items-center justify-start [writing-mode:vertical-rl] rotate-180 text-white mb-4 overflow-hidden'>
                                        <span className='text-md sm:text-lg font-bold uppercase text-shadow-xs text-shadow-black tracking-widest whitespace-nowrap'>
                                            {panel.title}
                                        </span>
                                        <span
                                            className={`text-xs sm:text-sm text-gray-300 whitespace-nowrap mt-2 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 md:opacity-100"}`}>
                                            {panel.sub}
                                        </span>
                                    </div>
                                    <div
                                        className='flex h-10 w-10 min-h-[40px] min-w-[40px] items-center font-bold text-shadow-md text-shadow-black justify-center rounded-full bg-black/40 shrink-0 shadow-lg border border-slate-800/70'
                                        style={{ color: panel.color }}>
                                        {panel.icon}
                                    </div>
                                </div>

                                {/* Expanded Paragraph */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col justify-end h-full ${isActive ? "max-w-[400px] opacity-100 ml-4 sm:ml-6" : "max-w-0 opacity-0 ml-0"}`}>
                                    <p className='text-white text-xs sm:text-sm md:text-base leading-relaxed bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl mb-3 w-[220px] sm:w-[350px]'>
                                        <span
                                            className='block text-lg font-bold mb-2 font-heading tracking-wide'
                                            style={{ color: panel.color }}>
                                            {panel.price}
                                        </span>
                                        {panel.description}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleService(panel.id);
                                        }}
                                        className={`flex items-center justify-center gap-2 mb-1 w-[220px] sm:w-[350px] rounded-full py-2.5 px-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 border shadow-lg backdrop-blur-md ${
                                            isSelected
                                                ? "text-lake-300 bg-lake-900/30 border-lake-600/60"
                                                : "text-slate-300 bg-black/40 border-slate-700 hover:border-slate-400 hover:text-white hover:bg-black/60"
                                        }`}>
                                        <span>
                                            {isSelected
                                                ? lang === "hr"
                                                    ? "Odabrano"
                                                    : "Selected"
                                                : lang === "hr"
                                                  ? "Odaberi uslugu"
                                                  : "Select service"}
                                        </span>
                                        {isSelected && (
                                            <Check
                                                size={16}
                                                className='text-lake-400'
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected Services section */}
            <div className='w-full max-w-[1200px] border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10'>
                <div className='text-slate-300'>
                    <span className='text-sm uppercase tracking-widest text-slate-500 block mb-2'>
                        {lang === "hr"
                            ? "Odabrane usluge"
                            : "Selected services"}
                    </span>
                    <div className='flex flex-wrap gap-2'>
                        {selectedServices.length > 0 ? (
                            selectedServices.map((id) => {
                                const service = panels.find((p) => p.id === id);
                                return (
                                    <span
                                        key={id}
                                        className='px-3 py-1 bg-lake-900/30 text-lake-300 text-xs rounded-md border border-lake-900/50'>
                                        {service?.title}
                                    </span>
                                );
                            })
                        ) : (
                            <span className='text-slate-600 italic'>-</span>
                        )}
                    </div>
                </div>
                <button className='px-8 py-3 bg-linear-to-r from-lake-600 to-candy-600 hover:from-lake-500 hover:to-candy-500 text-background font-bold rounded-full transition-all shadow-lg hover:shadow-lake-500/25 active:scale-95 shrink-0'>
                    {lang === "hr" ? "Zatraži ponudu" : "Request a quote"}
                </button>
            </div>
        </div>
    );
};

export default ExpandingGallery;
