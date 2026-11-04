import React, { useState } from "react";
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
import { useLanguage } from "@/context/LanguageContext";
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
    color: "var(--color-neon-cyan)",
    accentToken: "var(--color-neon-cyan)",
  },
  {
    id: 2,
    title: "UI/UX Design",
    sub: "Engaging experiences",
    description:
      "Craft intuitive, user-centric interfaces that captivate your audience, convey your brand story, and drive conversions.",
    price: "From €400",
    icon: <Palette size={24} />,
    color: "var(--color-neon-pink)",
    accentToken: "var(--color-neon-pink)",
  },
  {
    id: 3,
    title: "Backend Systems",
    sub: "Robust & scalable",
    description:
      "Develop secure, clean, and high-performance server-side architectures to power your web applications.",
    price: "From €600",
    icon: <Database size={24} />,
    color: "var(--color-neon-green)",
    accentToken: "var(--color-neon-green)",
  },
  {
    id: 4,
    title: "SEO Optimization",
    sub: "Boost visibility",
    description:
      "Enhance your online presence with data-driven SEO strategies that rank you higher on search engines and bring organic clients.",
    price: "From €300",
    icon: <TrendingUp size={24} />,
    color: "var(--color-neon-yellow)",
    accentToken: "var(--color-neon-yellow)",
  },
  {
    id: 5,
    title: "Cloud & Deployment",
    sub: "Deploy anywhere",
    description:
      "Seamlessly migrate, configure domains, SSL, and manage your digital assets with scalable and reliable hosting solutions.",
    price: "From €500",
    icon: <Cloud size={24} />,
    color: "var(--color-neon-violet)",
    accentToken: "var(--color-neon-violet)",
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
    color: "var(--color-neon-pink)",
    accentToken: "var(--color-neon-pink)",
  },
  {
    id: 2,
    title: "UI/UX dizajn",
    sub: "Gdje forma susreće funkciju",
    description:
      "Uspješne web-stranice balansiraju na spoju estetike, funkcionalnosti i korisničkog iskustva. To je područje koje traži senzibilitet, istančana osjetila i dobar osjećaj za mjeru.",
    price: "200 - 400 €",
    icon: <Sparkles size={24} />,
    color: "var(--color-neon-cyan)",
    accentToken: "var(--color-neon-cyan)",
  },
  {
    id: 3,
    title: "Razvoj web-stranice",
    sub: "Pixel-perfect kod",
    description:
      "Izrada brzih, responzivnih i sigurnih web rješenja skrojenih prema vašim specifičnim potrebama, optimiziranih za sve uređaje i tražilice.",
    price: "300 - 800 €",
    icon: <Code size={24} />,
    color: "var(--color-neon-green)",
    accentToken: "var(--color-neon-green)",
  },
  {
    id: 4,
    title: "Postavljanje & Hosting",
    sub: "Sigurnost i stabilnost",
    description:
      "Konfiguracija domene, SSL certifikata, hosting servera i briga o tehničkim detaljima kako bi vaša stranica radila bez zastoja.",
    price: "100 - 200 €",
    icon: <Cloud size={24} />,
    color: "var(--color-neon-violet)",
    accentToken: "var(--color-neon-violet)",
  },
  {
    id: 5,
    title: "Održavanje & SEO",
    sub: "Dugoročni mir",
    description:
      "Web stranica je živi organizam. Nudim uslugu redovitog ažuriranja, sigurnosnih kopija, SEO optimizacije i sitnih izmjena.",
    price: "50 - 150 € / mj.",
    icon: <TrendingUp size={24} />,
    color: "var(--color-neon-yellow)",
    accentToken: "var(--color-neon-yellow)",
  },
];

export const Accordion: React.FC = () => {
  const { lang } = useLanguage();
  const panels = lang === "hr" ? panelsHr : panelsEn;
  const [activeId, setActiveId] = useState<number>(panels[0].id);
  const { selectedServices, toggleService, isServiceSelected } = useServices();

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

  return (
    <div className="relative left-1/2 flex w-[96vw] max-w-none -translate-x-1/2 flex-col items-center justify-center gap-8 overflow-hidden bg-transparent p-1 font-sans text-slate-100 md:static md:left-auto md:mx-auto md:w-full md:max-w-6xl md:translate-x-0 md:p-4">
      {/* Main Accordion Stage */}
      <div className="flex h-115 min-h-115 w-full max-w-275 flex-col items-stretch gap-1.5 overflow-hidden md:flex-row md:gap-3">
        {panels.map((panel) => {
          const isActive = activeId === panel.id;
          const isSelected = isServiceSelected(panel.title);

          return (
            <div
              key={panel.id}
              onClick={() => setActiveId(panel.id)}
              style={{
                borderColor: isActive
                  ? panel.accentToken
                  : "var(--color-card-border)",
                boxShadow: isActive
                  ? `0 12px 32px rgba(0,0,0,0.7), 0 0 24px color-mix(in srgb, ${panel.accentToken} 24%, transparent)`
                  : "none",
              }}
              className={`relative flex min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl border bg-[rgba(14,15,28,0.85)] backdrop-blur-xl transition-all duration-500 ease-smooth md:rounded-3xl ${
                isActive
                  ? "flex-1 md:flex-[5_1_0%]"
                  : "flex-[0_0_3rem] md:flex-[1_1_0%]"
              }`}
            >
              {/* Radial Glow Overlay (No heavy photos, pure clean light) */}
              <div
                style={{
                  background: `radial-gradient(circle at 50% 80%, ${panel.accentToken}22 0%, transparent 70%)`,
                }}
                className="absolute inset-0 pointer-events-none z-0"
              />

              {/* Top Accent Strip */}
              <div
                aria-hidden="true"
                style={{
                  background: `linear-gradient(to bottom, color-mix(in srgb, ${panel.accentToken} 48%, transparent), color-mix(in srgb, ${panel.accentToken} 18%, transparent) 30%, transparent 100%)`,
                }}
                className="pointer-events-none absolute -top-3 left-2 right-2 z-1 h-32 blur-2xl"
              />

              <div
                style={{
                  background: panel.accentToken,
                  boxShadow: `0 0 10px ${panel.accentToken}, 0 0 24px ${panel.accentToken}, 0 10px 36px color-mix(in srgb, ${panel.accentToken} 72%, transparent)`,
                }}
                className="absolute top-0 left-0 right-0 z-10 h-1.5 shadow-[0_0_24px_currentColor]"
              />

              {/* Content Layout */}
              <div className="relative z-10 flex h-full min-h-0 w-full flex-col md:flex-row">
                {/* Header / Label */}
                <div className="relative flex h-15 min-h-15 shrink-0 items-center gap-3 px-3 py-2 md:h-full md:min-h-0 md:w-20 md:flex-col md:justify-end md:gap-0 md:p-3">
                  <div className="order-2 flex min-w-0 flex-col text-left md:absolute md:left-1/2 md:top-1/2 md:order-0 md:w-70 md:-translate-x-1/2 md:-translate-y-1/2 md:-rotate-90">
                    <span className="truncate text-sm font-headings font-bold tracking-[0.16em] text-white uppercase sm:text-base md:whitespace-nowrap">
                      {panel.title}
                    </span>
                    <span className="truncate text-xs tracking-wide text-slate-400 md:whitespace-nowrap">
                      {panel.sub}
                    </span>
                  </div>
                  <div
                    className="order-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-md transition-colors md:absolute md:bottom-4 md:left-1/2 md:order-0 md:h-11 md:w-11 md:-translate-x-1/2 md:rounded-xl"
                    style={{ color: panel.accentToken }}
                  >
                    {panel.icon}
                  </div>
                  <span
                    className={`absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 transition-opacity md:right-auto md:left-1/2 md:top-3 md:-translate-x-1/2 md:translate-y-0 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ color: panel.accentToken }}
                    aria-label={
                      isSelected
                        ? lang === "hr"
                          ? "Usluga odabrana"
                          : "Service selected"
                        : undefined
                    }
                    aria-hidden={!isSelected}
                    title={
                      isSelected
                        ? lang === "hr"
                          ? "Usluga odabrana"
                          : "Service selected"
                        : undefined
                    }
                  >
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                </div>

                {/* Expanded Description & Select Button */}
                <div
                  className={`min-h-0 min-w-0 flex-1 overflow-hidden px-3 pb-3 transition-all duration-500 ease-in-out md:px-5 md:py-6 ${
                    isActive
                      ? "flex flex-col justify-end gap-4 opacity-100"
                      : "hidden opacity-0"
                  }`}
                >
                  <div className="min-h-0 max-w-2xl overflow-y-auto">
                    <span
                      className="mb-3 block text-base font-mono font-bold"
                      style={{
                        color: panel.accentToken,
                      }}
                    >
                      {panel.price}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-300 font-sans md:text-base">
                      {panel.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceToggle(panel.title);
                    }}
                    className={`button-base min-h-0 w-full shrink-0 rounded-full px-4 py-2 text-xs transition-all duration-300 sm:w-fit ${
                      isSelected
                        ? "button-primary shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                        : "button-ghost"
                    }`}
                  >
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
      <div className="w-full max-w-275 p-4 md:p-6 rounded-2xl bg-[rgba(14,15,28,0.8)] border border-card-border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <span className="font-mono text-xs font-bold text-neon-cyan uppercase tracking-wider whitespace-nowrap">
            {lang === "hr" ? "Odabrano:" : "Selected:"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedServices.length > 0 ? (
              selectedServices.map((title) => (
                <span
                  key={title}
                  onClick={() => handleServiceToggle(title)}
                  className="px-3 py-1 bg-[rgba(0,245,255,0.12)] text-neon-cyan border border-neon-cyan/30 text-xs rounded-full cursor-pointer hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-400 transition-colors"
                  title={
                    lang === "hr" ? "Klikni za uklanjanje" : "Click to remove"
                  }
                >
                  {title} ✕
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic font-mono">
                {lang === "hr"
                  ? "Kliknite 'Odaberi uslugu' kako bi se automatski unijela u kontakt formu"
                  : "Click 'Select service' to auto-populate the contact form"}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToContact}
          className="button-base button-primary text-xs px-6 py-2.5 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>
            {lang === "hr" ? "Idi na kontakt formu" : "Go to Contact Form"}
          </span>
          <ArrowDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default Accordion;
