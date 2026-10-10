import React from "react";
import { MiniPixelHeart } from "@/components/PixelArt";
import { useLanguage } from "@/components/LanguageContext";

interface FooterContent {
  copyright: string;
}

interface FooterProps {
  t: {
    footer: FooterContent;
  };
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const { lang } = useLanguage();

  return (
    <footer className="brand-footer">
      <div className="footer-container">
        {/* Top Row: Brand Summary + Navigation Columns */}
        <div className="footer-top">
          <div className="footer-brand-summary">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <MiniPixelHeart scale={0.8} />
              </div>
              <span className="text-xl font-heading font-extrabold text-white">
                Web Mashina
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm">
              {lang === "hr"
                ? "Web mašina stvara iz ljubavi prema ljudima. Spajamo retro nostalgiju digitalnog doba s modernim i responzivnim kodom."
                : "The web machine creates out of love for humans. Blending early digital nostalgia with contemporary precision and pixel-perfect craft."}
            </p>
          </div>

          <div className="footer-links-group">
            <div>
              <div className="footer-col-title">
                {lang === "hr" ? "Navigacija" : "Navigation"}
              </div>
              <ul className="footer-nav-list">
                <li>
                  <a href="#home">{lang === "hr" ? "Početna" : "Home"}</a>
                </li>
                <li>
                  <a href="#mission">{lang === "hr" ? "Misija" : "Mission"}</a>
                </li>
                <li>
                  <a href="#webshop">
                    {lang === "hr" ? "Predlošci" : "Templates"}
                  </a>
                </li>
                <li>
                  <a href="#lab">{lang === "hr" ? "Laboratorij" : "Lab"}</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">
                {lang === "hr" ? "Suradnja" : "Studio"}
              </div>
              <ul className="footer-nav-list">
                <li>
                  <a href="#services">
                    {lang === "hr" ? "Usluge" : "Services"}
                  </a>
                </li>
                <li>
                  <a href="#projects">
                    {lang === "hr" ? "Projekti" : "Projects"}
                  </a>
                </li>
                <li>
                  <a href="#contact">{lang === "hr" ? "Kontakt" : "Contact"}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry Status Dot & Copyright */}
        <div className="footer-bottom-bar">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-(--neon-green) shadow-[0_0_8px_var(--neon-green)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
              ALL SYSTEMS NOMINAL • 60 FPS • ZERO ASSET PIXELS
            </span>
          </div>

          <p className="font-mono text-xs text-slate-400">
            Web Mashina © {new Date().getFullYear()} — {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
