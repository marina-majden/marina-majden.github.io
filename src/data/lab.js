import {
    MessageSquare,
    PenTool,
    Image,
    Server,
    ShieldCheck,
    Rocket,
} from "lucide-react";

// --- META-KOD - X-RAY ---
const COMPLEX_CODE_SNIPPET = `
interface NeuralNode {
  id: string;
  vector: Vector3;
  connections: string[];
  activityLevel: number;
}

export const useNeuralNetwork = <T extends DataPoint>(
  initialData: T[], 
  config: SimulationConfig
) => {
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const physicsRef = useRef<PhysicsEngine | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL('./physics.worker', import.meta.url));
    physicsRef.current = new PhysicsEngine(worker, config.gravity);
    return () => worker.terminate();
  }, [config.gravity]);

  return { nodes, fps: physicsRef.current.fps };
};
`;

// --- TEME ZA PLAYGROUND ---
const themes = {
    mediteran: {
        name: "Mediteran",
        bg: "bg-rose-100",
        cardBg: "bg-rose-50",
        text: "text-indigo-700",
        title: "text-indigo-600",
        primary: "bg-indigo-400",
        accent: "text-indigo-600",
        border: "border-indigo-300",
        overlay: "bg-indigo-300",
    },
    cyberpunk: {
        name: "Cyberpunk",
        bg: "bg-indigo-950",
        cardBg: "bg-gray-950/10",
        text: "text-cyan-600",
        title: "text-sky-600",
        primary: "bg-fuchsia-500",
        accent: "text-fuchsia-600",
        border: "border-fuchsia-600",
        overlay: "bg-fuchsia-600",
    },
    forest: {
        name: "Forest",
        bg: "bg-emerald-100",
        cardBg: "bg-emerald-50",
        text: "text-emerald-600",
        title: "text-emerald-700",
        primary: "bg-emerald-700",
        accent: "text-emerald-600",
        border: "border-emerald-100",
        overlay: "bg-emerald-700",
    },
};

const fonts = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
};

const radiuses = {
    sharp: "rounded-none",
    smooth: "rounded-xl",
    full: "rounded-3xl",
};

const heroLayouts = {
    background: "Pozadina",
    split: "Split",
    creative: "Kreativno",
};

// --- PODACI ZA TASTE TEST (SUKUS UKUSA) ---
const tasteTestQuestions = [
    {
        id: 1,
        title: "Button Stil",
        desc: "Koji poziv na akciju (CTA) vas više privlači da kliknete?",
        optionA: { label: "Soft Shadow", votes: 1240 },
        optionB: { label: "Hard Edge", votes: 856 },
    },
    {
        id: 2,
        title: "Dizajn Kartice",
        desc: "Kako preferirate prikaz informacija?",
        optionA: { label: "Glassmorphism", votes: 2100 },
        optionB: { label: "Solid Minimal", votes: 1950 },
    },
    {
        id: 3,
        title: "Ikone",
        desc: "Koji stil ikona vam djeluje profesionalnije?",
        optionA: { label: "Thin Line", votes: 1500 },
        optionB: { label: "Filled Color", votes: 600 },
    },
    {
        id: 4,
        title: "Navigacija",
        desc: "Gdje očekujete navigaciju na desktopu?",
        optionA: { label: "Top Bar", votes: 3200 },
        optionB: { label: "Side Bar", votes: 1100 },
    },
    {
        id: 5,
        title: "Dark Mode",
        desc: "Koja nijansa tamne teme je ugodnija?",
        optionA: { label: "True Black", votes: 900 },
        optionB: { label: "Deep Blue/Grey", votes: 2400 },
    },
    {
        id: 6,
        title: "Kutovi",
        desc: "Kakav osjećaj preferirate?",
        optionA: { label: "Playful Round", votes: 1800 },
        optionB: { label: "Sharp & Serious", votes: 1300 },
    },
];

// --- PODACI ZA HODOGRAM ---
const workflowSteps = [
    {
        icon: MessageSquare,
        title: "1. Inicijalni Razgovor & Opseg",
        desc: "Definiramo vašu viziju. Trebate li 'ključ u ruke' (dizajn + razvoj) ili imate spreman dizajn? Utvrđujemo gabarite projekta i moju ulogu u vašem timu.",
    },
    {
        icon: PenTool,
        title: "2. Strategija Dizajna",
        desc: "Biramo put: A) Brza implementacija provjerenog Templatea prilagođenog vama, ili B) Custom Made unikatno rješenje krojeno do najsitnijeg detalja. Kod custom rješenja, često ćemo komunicirati oko stilskih odluka.",
        highlight: "Vaš izbor diktira tempo i budžet.",
    },
    {
        icon: Image,
        title: "3. Content & Materijali",
        desc: "Prikupljamo tekstove i slike. Ako ih nemate, mogu vas povezati s vrhunskim copywriterima i fotografima ili koristiti placeholder sadržaj dok ne budete spremni.",
    },
    {
        icon: Server,
        title: "4. Domena i Hosting",
        desc: "Tehnička baza. Imate li već domenu? Ako ne, pomažem vam u odabiru i zakupu. Postavljam hosting i brinem se za tehničku konfiguraciju servera (napomena: trošak hostinga je zaseban).",
    },
    {
        icon: ShieldCheck,
        title: "5. Mjesečno Održavanje",
        desc: "Web stranica je živi organizam. Nudim uslugu redovitog ažuriranja, sigurnosnih kopija i sitnih izmjena. Plaćanje može biti mjesečno ili godišnje uz popust.",
    },
    {
        icon: Rocket,
        title: "6. Procjena & Start",
        desc: "Nakon definiranja svih koraka, dobivate preciznu procjenu vremena i investicije. Nakon odobrenja, krećemo u izradu vaše digitalne priče!",
        isLast: true,
    },
];

export {
    COMPLEX_CODE_SNIPPET,
    themes,
    fonts,
    radiuses,
    heroLayouts,
    tasteTestQuestions,
    workflowSteps,
};
