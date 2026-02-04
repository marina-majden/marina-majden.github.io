# AI Copilot Instructions for marina-majden.github.io

## Project Overview

A portfolio/showcase website built with React 19 + TypeScript + Vite, featuring animated UI components, project showcases, and bilingual (HR/EN) support. Heavy emphasis on visual effects and custom animations.

## Architecture

### Core Structure

- **Single Page App (SPA)** with React Router v7 for client-side navigation
- **Entry point**: `src/main.jsx` → `src/App.tsx` → `src/AppRoutes.tsx` → pages
- **Styling**: Tailwind CSS v4 with custom CSS animations (NOT CSS-in-JS)
- **State management**: Local component state (useState) only; `Home.tsx` manages language & navigation state

### Key Data Layer (`src/data/`)

- **data.ts**: Centralized bilingual content (`content[lang]`) with full typing via interfaces in `types/index.ts`
- **constants.ts**: Static data (palettes, project metadata)
- **lab.ts**: Lab/experimental section data

Content flows: `data.ts` → `Home.tsx` → child pages receive `t: ContentSection` prop with translations

### Component Organization

- **Pages** (`src/pages/`): Full-screen sections (Hero, About, Projects, Services, Skills, Contact, Footer)
- **Components** (`src/components/`): Reusable UI elements with heavy custom animations
    - Heavy reliance on Tailwind arbitrary values and `before:`/`after:` pseudo-elements for effects
    - Example: `SocialCard.tsx` defines keyframes inline via `<style>` tags
- **Canvas** (`src/canvas/`): Intensive visual components (ContextShifter, Playground, VisualContextShifter)
- **Showcase** (`src/showcase/`): Feature-specific pages (NeedHelp, Litart, SongFinder, Storybook, Unplugged)
- **Lab** (`src/lab/`): Experimental UI widgets and layouts

### Animation Patterns

- **Inline CSS keyframes** in components (not separate CSS files)
- **Motion library** (v12.23.24) for declarative animations
- **Tailwind animate-\* utilities** for standard animations
- **Custom pseudo-element animations** using `before:` and `after:` classes

## Development Workflows

### Essential Commands

```bash
npm run dev        # Start Vite dev server (HMR enabled)
npm run build      # Production build to dist/
npm run preview    # Preview built site locally
npm run test       # Run Vitest suite
npm run lint       # ESLint check
```

### Testing

- Framework: **Vitest** + React Testing Library
- Config: `vitest.config.js` with jsdom environment, React plugin enabled
- Example test: `src/components/SocialCard.test.tsx`
- Run: `npm test` (no CI configured in package.json)

### Key Build Details

- **Vite uses Rolldown** (npm:rolldown-vite@7.2.5) as the bundler (pinned via override)
- **Tailwind v4** integrated as Vite plugin
- **React Compiler** babel plugin included but check React Compiler compatibility notes

## Critical Conventions

### TypeScript Usage

- Strong typing via interfaces in `src/types/index.ts`
- React.FC for component typing: `const Component: React.FC = () => ...`
- No `any` types; use union types for variants

### Naming Patterns

- Components: PascalCase (e.g., `SocialCard.tsx`)
- Functions/variables: camelCase
- Translation keys: match TypeScript interface structure exactly
- Custom CSS classes: kebab-case with descriptive prefixes (e.g., `colored-glass-card-container`)

### Bilingual Content

- Language toggle in `Home.tsx` managed via `lang` state ("hr" | "en")
- Access via `content[lang]` where `content` is default export from `data.ts`
- All text must be added to both HR and EN sections in `data.ts`

### Animations

- **DO**: Define keyframes inside component `<style>` tags or Tailwind
- **DO NOT**: Create separate CSS files for component-specific animations
- Use `animate-[custom_animation]` for Tailwind arbitrary animation values
- Pseudo-elements (`before:`, `after:`) heavily used for visual effects

## Integration Points

### Routing

- Lazy-loaded routes in `AppRoutes.tsx` with Suspense fallback (`SpinnerLoader`)
- Routes: `/` (home), `/showcase/*` (project showcases)
- Scroll-to-section behavior in `scrollToSection()` function

### Dependencies to Know

- **lucide-react** (v0.554.0): Icon library
- **react-feather** (v2.0.10): Alternative icon set
- **motion** (v12.23.24): Framer Motion for animations
- **react-router-dom** (v7.12.0): Client-side routing

### Loading State

- `SpinnerLoader` component used during initial load and route transitions
- 1-second artificial delay on Home page load for branding effect

## Common Pitfalls to Avoid

1. **Animation isolation**: Component animations should not leak into globals; use scoped styles
2. **Type consistency**: Keep `types/index.ts` in sync with `data.ts` structures
3. **Language handling**: Always update both HR and EN translations simultaneously
4. **Tailwind arbitrary values**: Complex styles use `[...]` syntax; document what they do
5. **React 19 patterns**: Use new hooks (useActionState, useOptimistic) cautiously; check compatibility
6. **ESLint config**: Ignores `varsIgnorePattern: '^[A-Z_]'` for constants; respect this when adding rules

## File References for Patterns

- Language flow: [src/pages/Home.tsx](src/pages/Home.tsx) → [src/data/data.ts](src/data/data.ts)
- Animation patterns: [src/components/SocialCard.tsx](src/components/SocialCard.tsx), [src/components/ColoredGlassCard.tsx](src/components/ColoredGlassCard.tsx)
- Type definitions: [src/types/index.ts](src/types/index.ts)
- Routing setup: [src/AppRoutes.tsx](src/AppRoutes.tsx)
- Component testing: [src/components/SocialCard.test.tsx](src/components/SocialCard.test.tsx)
