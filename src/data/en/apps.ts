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
}

export const experimentalApps: ExperimentalApp[] = [
  {
    id: "cleanflow",
    title: "CleanQuest",
    subtitle: "How to make household chores fun?",
    description:
      "Besides offering ready-made plans and guiding you through household chores step by step, the app gives you challenges that aren't quite easy to beat. However, regardless of the outcome, the result is a clean and tidy living space. Therefore, we can say that in this game, there are truly no losers.",
    tags: [
      "Game",
      "Tasks",
      "Organizer",
      "Household",
      "Cleaning",
      "Advisor",
      "8-bit Retro",
    ],
    route: "/apps/cleanflow",
    directUrl: "https://questsweeper.netlify.app/",
    github: "https://github.com/marina-majden/quest-sweeper",
    badge: "New",
  },
  {
    id: "elementos",
    title: "Elementos",
    subtitle: "Digital microworld of elements",
    description:
      "Bilingual interactive exploration of elements with fluid animations and a soundscape.",
    tags: ["Canvas", "Interactive", "Bilingual", "CSS Art"],
    route: "/apps/elementos",
    directUrl: "/apps/elementos/index.html",
    badge: "New",
  },
  {
    id: "dreamlike",
    title: "Dreamlike",
    subtitle: "Creative ambient space",
    description:
      "An experimental visual dream with surreal gradients and tactile motions.",
    tags: ["Experimental", "Visual", "Ambient"],
    route: "/apps/dreamlike",
    directUrl: "/apps/dreamlike/index.html",
    badge: "New",
  },
  {
    id: "liquid",
    title: "Liquid Cube",
    subtitle: "Fluid 3D cube",
    description:
      "An interactive fluid simulation inside a 3D cube with real-time physics.",
    tags: ["3D", "Physics", "WebGL", "Simulation"],
    route: "/apps/liquid",
    directUrl: "/apps/liquid/liquid-cube.html",
  },
  {
    id: "chromalab",
    title: "ChromaLab",
    subtitle: "Spectral color laboratory",
    description:
      "A reactive experiment with modern OKLCH colors, CSS @property animations, and prisms.",
    tags: ["React", "OKLCH", "CSS @property", "Shader-like"],
    route: "/pages/ChromaLab",
    directUrl: "/pages/ChromaLab",
  },
  {
    id: "neural-network",
    title: "Neural Network",
    subtitle: "3D neural network",
    description:
      "A three-dimensional visualization of synaptic connections with Three.js and bloom postprocessing.",
    tags: ["Three.js", "Bloom", "3D", "Graph"],
    route: "/pages/NeuralNetwork",
    directUrl: "/pages/NeuralNetwork",
  },
  {
    id: "color-chemist",
    title: "Color Chemist",
    subtitle: "Chemistry of pigments and shades",
    description:
      "An interactive shade mixer and visual laboratory for testing palettes.",
    tags: ["Color Science", "Tool", "Canvas"],
    route: "/apps/color-chemist",
    directUrl: "/apps/colorchemist.html",
  },
  {
    id: "diary",
    title: "Diary",
    subtitle: "A diary for convenient logging of events and memories",
    description:
      "In addition to standard text entries, you can add pre-made multimedia interactive elements with a single click.",
    tags: ["Diary", "Tool", "Personal"],
    route: "/apps/diary",
    directUrl: "/apps/colorchemist.html",
  },
  {
    id: "countdown",
    title: "3D Countdown",
    subtitle: "Time sculpture",
    description:
      "A sculptural timer with Three.js orbit controls and procedural geometry.",
    tags: ["Three.js", "OrbitControls", "3D"],
    route: "/apps/countdown",
    directUrl: "/apps/countdown/index.html",
  },
  {
    id: "tarot",
    title: "Tarot Storytelling",
    subtitle: "Creatively using tarot cards to craft a story",
    description:
      "The spread gives us the plot, characters, their traits, relationships, and development, while we tell the story guided by the tarot imagery!",
    tags: ["Pixel Art", "Retro", "Interactive"],
    route: "/apps/tarot",
    directUrl: "/apps/tarot.html",
  },
];
