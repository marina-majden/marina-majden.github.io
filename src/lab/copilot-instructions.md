# Copilot instructions

## Build, test, and lint

Use npm (the repository has a `package-lock.json`):

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production site in `docs/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint.
- `npm test` starts Vitest in watch mode; use `npm test -- --run` for a one-time run.
- Run one test file with `npm test -- --run src/path/to/example.test.tsx`.

Vitest uses a `jsdom` environment and globals. The ESLint flat config currently applies its rules to `.js` and `.jsx` files; TypeScript is configured as strict in `tsconfig.json`.

## Architecture

- `src/main.tsx` mounts the React app. `src/App.tsx` provides language and cart contexts and the browser router; `src/AppRoutes.tsx` maps URLs to pages.
- The home route is composed from `src/sections/`. Its larger Projects, Services, and Templates sections are lazy-loaded. The lab, webshop, and interactive pages are separate route-level features.
- `src/data/data.ts` holds the `hr` and `en` portfolio content, including project and template data. The home page selects a language and passes the matching content into its sections. The app also has a `LanguageContext`; check which language state a component actually uses before changing translation behavior.
- `src/context/CartContext.tsx` shares the template cart across routes and persists it in `localStorage`. Template catalog entries are typed as `TemplateItem`.
- Some experiments are standalone HTML files under `public/pages/` and are displayed through iframe routes. Keep their URL paths aligned with their locations under `public/`.
- Tailwind CSS v4 is integrated through the Vite plugin. Global Tailwind setup, font faces, and shared CSS live in `src/index.css`.

## Repository conventions

- Keep shared UI in `src/components/`, page sections in `src/sections/`, and route-specific features in their respective directories. Keep reusable feature data and types alongside the existing data/type modules.
- TypeScript is strict (`noUnusedLocals` and `noUnusedParameters` are enabled). The `@/` alias maps to `src/` in both Vite and TypeScript configuration.
- Maintain matching keys and structure between the `hr` and `en` entries in `src/data/data.ts` when changing translated content.
- Import bundled assets from `src/assets/`; assets in `public/` are served from root-relative URLs such as `/fonts/...` and `/pages/...`.
- Vite writes build output to `docs/`; treat that directory as deployment output, not the source for app changes.
