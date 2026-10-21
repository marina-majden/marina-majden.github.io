export interface ExperimentalApp {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  route: string;
  directUrl: string;
  github?: string;
  badge?: string;
  logo?: string;
  imageUrl?: string;
  images?: string[];
}

export const experimentalApps: ExperimentalApp[] = [
  {
    id: "cleanflow",
    title: "CleanQuest",
    subtitle: "Kako kućanske poslove učiniti zanimljivima?",
    description:
      "Osim što nudi gotove planove i vodi vas kroz kućanske poslove korak po korak,apliakcija vam daje izazove koje nije baš lako pobjediti. Međutim, bez obzira na rezultat, posljedica je čist i uredan životni prostor. Stoga možemo reći da u ovoj igri zaista nema gubitnika.",
    tags: [
      "Igra",
      "Zadaci",
      "Organizator",
      "Kućanstvo",
      "Spremanje",
      "Savjetnik",
      "8-bit Retro",
    ],
    route: "/apps/cleanflow",
    directUrl: "https://questsweeper.netlify.app/",
    github: "https://github.com/marina-majden/quest-sweeper",
    badge: "Novo / New",
    logo: "/assets/img/cleanquest-logo.png",
    imageUrl: "/assets/img/cleanquest-hero-wide.png",
    images: [
      "/assets/img/Cleanquest-mobile.png",
      "/assets/img/quest.webp",
      "/assets/img/cleanquest-interface.webp",
    ],
  },
  {
    id: "elementos",
    title: "Elementos",
    subtitle: "Digitalni mikrosvijet elemenata",
    description:
      "Bilingvalno interaktivno istraživanje elemenata s fluidnim animacijama i zvučnom kulisom.",
    tags: ["Canvas", "Interactive", "Bilingual", "CSS Art"],
    route: "/apps/elementos",
    directUrl: "/apps/elementos/index.html",
    badge: "Novo / New",
  },
  {
    id: "dreamlike",
    title: "Dreamlike",
    subtitle: "Kreativni ambijentalni prostor",
    description:
      "Eksperimentalni vizualni san s nestvarnim gradijentima i taktilnim pokretima.",
    tags: ["Experimental", "Visual", "Ambient"],
    route: "/apps/dreamlike",
    directUrl: "/apps/dreamlike/index.html",
    badge: "Novo / New",
  },
  {
    id: "liquid",
    title: "Liquid Cube",
    subtitle: "Fluidna 3D kocka",
    description:
      "Interaktivna simulacija tekućine unutar 3D kocke s fizikom u stvarnom vremenu.",
    tags: ["3D", "Physics", "WebGL", "Simulation"],
    route: "/apps/liquid",
    directUrl: "/apps/liquid/liquid-cube.html",
  },
  {
    id: "chromalab",
    title: "ChromaLab",
    subtitle: "Laboratorij spektralnih boja",
    description:
      "Reaktivni eksperiment s modernim OKLCH bojama, CSS @property animacijama i prizmama.",
    tags: ["React", "OKLCH", "CSS @property", "Shader-like"],
    route: "/pages/ChromaLab",
    directUrl: "/pages/ChromaLab",
  },
  {
    id: "neural-network",
    title: "Neural Network",
    subtitle: "3D neuronska mreža",
    description:
      "Trodimenzionalna vizualizacija sinaptičkih veza s Three.js-om i bloom postprocessingom.",
    tags: ["Three.js", "Bloom", "3D", "Graph"],
    route: "/pages/NeuralNetwork",
    directUrl: "/pages/NeuralNetwork",
  },
  {
    id: "color-chemist",
    title: "Color Chemist",
    subtitle: "Kemija pigmenata i tonova",
    description:
      "Interaktivna miješalica tonova i vizualni laboratorij za testiranje paleta.",
    tags: ["Color Science", "Tool", "Canvas"],
    route: "/apps/color-chemist",
    directUrl: "/apps/colorchemist.html",
  },
  {
    id: "diary",
    title: "Diary",
    subtitle: "Dnevnik za praktično bilježenje događaja i uspomena",
    description:
      "Osim standarnih tekstualnih zapisa, možete dodavati već izrađene multimedijalne interaktivne elemente jednim klikom.",
    tags: ["Dnevnik", "Alat", "Osobno"],
    route: "/apps/diary",
    directUrl: "/apps/colorchemist.html",
  },
  {
    id: "countdown",
    title: "3D Countdown",
    subtitle: "Vremenska skulptura",
    description:
      "Skulpturalni brojač vremena s Three.js orbit kontrolama i proceduralnom geometrijom.",
    tags: ["Three.js", "OrbitControls", "3D"],
    route: "/apps/countdown",
    directUrl: "/apps/countdown/index.html",
  },
  {
    id: "tarot",
    title: "Tarot Storytelling",
    subtitle: "Kreativno koristimo tarot karte za stvaranje priče",
    description:
      "Raspored nam donosi radnju, likove, njihove osobine, odnose i razvoj, a priču pričamo vodeći se slikama tarota!",
    tags: ["Pixel Art", "Retro", "Interactive"],
    route: "/apps/tarot",
    directUrl: "/apps/tarot.html",
  },
];
