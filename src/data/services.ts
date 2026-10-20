import {
  Cloud,
  Code,
  Palette,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface AccordionService {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const accordionServices: AccordionService[] = [
  {
    id: 1,
    title: "Vizualni identitet",
    subtitle: "Ključ izgradnje branda",
    price: "100 - 300 €",
    description:
      "Za one koji stvaraju više od biznisa potreban je jasan i autentičan vizualni jezik koji će uspješno komunicirati Vaše vrijednosti i privući prave klijente.",
    icon: Palette,
    color: "#ff007a",
  },
  {
    id: 2,
    title: "UI/UX dizajn",
    subtitle: "Gdje forma susreće funkciju",
    price: "200 - 400 €",
    description:
      "Uspješne web-stranice balansiraju na spoju estetike, funkcionalnosti i korisničkog iskustva. To je područje koje traži senzibilitet, istančana osjetila i dobar osjećaj za mjeru.",
    icon: Sparkles,
    color: "#00f2ff",
  },
  {
    id: 3,
    title: "Razvoj web-stranice",
    subtitle: "Pixel-perfect kod",
    price: "300 - 800 €",
    description:
      "Izrada brzih, responzivnih i sigurnih web rješenja skrojenih prema vašim specifičnim potrebama, optimiziranih za sve uređaje i tražilice.",
    icon: Code,
    color: "#39ff14",
  },
  {
    id: 4,
    title: "Postavljanje & Hosting",
    subtitle: "Sigurnost i stabilnost",
    price: "100 - 200 €",
    description:
      "Konfiguracija domene, SSL certifikata, hosting servera i briga o tehničkim detaljima kako bi vaša stranica radila bez zastoja.",
    icon: Cloud,
    color: "#bc13fe",
  },
  {
    id: 5,
    title: "Održavanje & SEO",
    subtitle: "Dugoročni mir",
    price: "50 - 150 € / mj.",
    description:
      "Web stranica je živi organizam. Nudim uslugu redovitog ažuriranja, sigurnosnih kopija, SEO optimizacije i sitnih izmjena.",
    icon: TrendingUp,
    color: "#fff01f",
  },
];
