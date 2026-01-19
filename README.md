# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## PROJECT STRUCTURE

src/
├── assets/              # Slike, fontovi, lokalne ikone
├── components/          # Reusable UI komponente
│   ├── canvas/          # Teške vizualne komponente
│   │   └── GeometricCanvas.jsx
│   ├── navigation/
│   │   └── LanguageSwitcher.jsx
│   ├── sections/        # Glavne stranice (100vh sekcije)
│   │   ├── HeroSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ServicesSection.jsx
│   │   └── ContactSection.jsx
│   └── ui/              # Manji UI elementi
│       ├── LandingArch.jsx
│       ├── MoodSelector.jsx
│       ├── ProjectDetails.jsx
│       ├── HeroStorySlider.jsx
│       └── ContentPage.jsx
├── data/                # Svi statični podaci (prijevodi, palete)
│   ├── content.js       # TEXT_CONTENT (HR/EN)
│   ├── constants.js     # MOOD_PALETTES, PROJECTS_DATA
│   └── services.js      # SERVICES_DATA
├── hooks/               # Custom React Hookovi (Logika)
│   ├── useGemini.js     # API pozivi
│   └── useScrollEngine.js # Logika za scroll/wheel evente
├── utils/               # Helper funkcije
│   └── helpers.js
├── App.jsx              # Samo orkestracija i globalni state
└── main.jsx             # Vite entry point

