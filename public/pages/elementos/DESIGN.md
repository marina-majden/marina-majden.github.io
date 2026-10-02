# Pixelated Love — Design System Specification

> **Version:** 2.5 (Cohesive System)  
> **Brand:** Pixelated Love  
> **Core Philosophy:** _"Show, don't tell"_ — experience the essence, glowing neon light, and tactile soul of the brand directly across interactive surfaces.  
> **Aesthetic DNA:** 8-bit / 16-bit arcade digital nostalgia unified with 64-bit neon cosmic depth, tactile spring physics, and obsidian glassmorphism.

---

## Table of Contents

1. [Brand Identity & Core Philosophy](#1-brand-identity--core-philosophy)
2. [Design Tokens & Variables](#2-design-tokens--variables)
    - [Chromatic Architecture](#chromatic-architecture)
    - [Surface & Glassmorphism](#surface--glassmorphism)
    - [Border & Outline Scales](#border--outline-scales)
    - [Shadows & Ambient Glow](#shadows--ambient-glow)
    - [Geometric Radii](#geometric-radii)
    - [Temporal Physics & Motion](#temporal-physics--motion)
3. [Typography Hierarchy](#3-typography-hierarchy)
4. [Color Theme Presets](#4-color-theme-presets)
5. [Pure CSS Pixel Art Engine](#5-pure-css-pixel-art-engine)
    - [Core Pixel Art Technique (`box-shadow`)](#core-pixel-art-technique-box-shadow)
    - [Asset 01: The Pixel Heart (Brand Emblem)](#asset-01-the-pixel-heart-brand-emblem)
    - [Asset 02: The Pixel Paintbrush (Creative Instrument)](#asset-02-the-pixel-paintbrush-creative-instrument)
    - [Asset 03: The Pixel Moon (Cosmic Satellite)](#asset-03-the-pixel-moon-cosmic-satellite)
    - [Asset 04: Big Letter "P" (Isometric Monogram)](#asset-04-big-letter-p-isometric-monogram)
    - [Asset 05: Big Letter "L" (Companion Monogram)](#asset-05-big-letter-l-companion-monogram)
    - [Asset 06: Supernova Pixel Star (4-Point Diamond)](#asset-06-supernova-pixel-star-4-point-diamond)
6. [Component Architecture & Anatomy](#6-component-architecture--anatomy)
    - [Navigation Bar](#navigation-bar)
    - [Header Showcase & Manifesto](#header-showcase--manifesto)
    - [Live System Customizer Bar](#live-system-customizer-bar)
    - [Flagship 3D Perspective Card](#flagship-3d-perspective-card)
    - [Button System & Triggers](#button-system--triggers)
    - [Structured Identity Profile Cards (hCard)](#structured-identity-profile-cards-hcard)
    - [Bento Grid Layout](#bento-grid-layout)
    - [Form Architecture & Input Fields](#form-architecture--input-fields)
    - [Structured Lists & Micro-elements](#structured-lists--micro-elements)
    - [Modal Dialog & Toast Notification Hub](#modal-dialog--toast-notification-hub)
7. [Accessibility & Motion Compliance](#7-accessibility--motion-compliance)
8. [Best Practices & Design Rules](#8-best-practices--design-rules)

---

## 1. Brand Identity & Core Philosophy

**Pixelated Love** is an unapologetic tribute to the creative innocence of early digital culture combined with contemporary UI precision. The identity pairs tactile hardware-inspired retro nostalgia with ultra-modern cosmic dark mode surfaces.

### Guiding Principles

- **Show, Don't Tell**: Never describe interactive beauty in passive text when you can manifest it through living, reactive UI components.
- **Warm Nostalgia, Modern Precision**: Nostalgic 8-bit pixel geometry meets mathematical typography, fluid spring motion (`cubic-bezier(0.34, 1.56, 0.64, 1)`), and frosted glass.
- **Zero-Asset Pixel Craftsmanship**: All brand imagery (hearts, paintbrushes, celestial bodies, monograms) is rendered exclusively in pure CSS via single-element `box-shadow` matrices, guaranteeing instantaneous load times and zero network overhead.
- **High-Contrast Cosmic Bedrock**: Velvety dark space backgrounds (`#07070e`) provide a deep obsidian canvas against which vibrant high-voltage neons emit luminescence without retinal glare.

---

## 2. Design Tokens & Variables

All tokens are defined in the `:root` pseudo-class for seamless cascading and dynamic theme overriding.

### Chromatic Architecture

| Token Name           | Value                      | Purpose / Role                                              |
| :------------------- | :------------------------- | :---------------------------------------------------------- |
| `--neon-blue`        | `#00f5ff`                  | Primary cyan energy, active states, focus halos, live glows |
| `--neon-blue-soft`   | `rgba(0, 245, 255, 0.12)`  | Subtle cyan glass tint and button states                    |
| `--neon-blue-glow`   | `rgba(0, 245, 255, 0.45)`  | Luminescent focus and drop-shadow halo                      |
| `--neon-purple`      | `#bf00ff`                  | Atmospheric deep violet, cosmic nebulas, secondary branding |
| `--neon-purple-soft` | `rgba(191, 0, 255, 0.12)`  | Violet background accents and badges                        |
| `--neon-purple-glow` | `rgba(191, 0, 255, 0.45)`  | Violet ambient lighting                                     |
| `--neon-pink`        | `#ff00aa`                  | Signature brand heart magenta, emotional highlights         |
| `--neon-pink-soft`   | `rgba(255, 0, 170, 0.12)`  | Soft pink highlights and quote borders                      |
| `--neon-pink-glow`   | `rgba(255, 0, 170, 0.45)`  | High-voltage pink glow                                      |
| `--neon-green`       | `#00ff88`                  | Active telemetry, live connection pulses, success feedback  |
| `--neon-green-soft`  | `rgba(0, 255, 136, 0.12)`  | Success pill backgrounds                                    |
| `--neon-orange`      | `#ff6b00`                  | Warm transitions, solar flares, tertiary actions            |
| `--neon-orange-soft` | `rgba(255, 107, 0, 0.12)`  | Warm container tints                                        |
| `--neon-yellow`      | `#ffd24d`                  | Specular highlights, star cores, secondary accents          |
| `--neon-yellow-soft` | `rgba(255, 210, 77, 0.14)` | Radiant gold glass wash                                     |

### Surface & Glassmorphism

| Token Name           | Value                       | Description                                   |
| :------------------- | :-------------------------- | :-------------------------------------------- |
| `--dark-bg`          | `#07070e`                   | Cosmic space bedrock foundation               |
| `--dark-bg-elevated` | `#0e0f1c`                   | Slightly elevated cosmic surface              |
| `--card-bg`          | `rgba(13, 14, 25, 0.78)`    | Translucent card glass surface                |
| `--card-bg-raised`   | `rgba(20, 22, 38, 0.85)`    | Elevated component surface with backdrop blur |
| `--card-glass`       | `rgba(255, 255, 255, 0.04)` | Ultra-subtle frosted glass highlight          |
| `--card-glass-hover` | `rgba(255, 255, 255, 0.08)` | Hover illumination state                      |

### Border & Outline Scales

| Token Name        | Value                       | Description                                     |
| :---------------- | :-------------------------- | :---------------------------------------------- |
| `--border-subtle` | `rgba(255, 255, 255, 0.10)` | Default structural borders and card dividers    |
| `--border-medium` | `rgba(0, 245, 255, 0.24)`   | Active cyan boundary and card outlines          |
| `--border-strong` | `rgba(191, 0, 255, 0.42)`   | Elevated containers and modal dialog boundaries |
| `--border-glow`   | `rgba(255, 0, 170, 0.38)`   | High-emphasis magenta highlight borders         |

### Shadows & Ambient Glow

| Token Name      | Value                                                               |
| :-------------- | :------------------------------------------------------------------ |
| `--shadow-sm`   | `0 4px 14px rgba(0, 0, 0, 0.35)`                                    |
| `--shadow-md`   | `0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 245, 255, 0.08)`  |
| `--shadow-lg`   | `0 24px 64px rgba(0, 0, 0, 0.7), 0 0 35px rgba(191, 0, 255, 0.15)`  |
| `--shadow-neon` | `0 0 25px rgba(0, 245, 255, 0.35), 0 0 50px rgba(191, 0, 255, 0.2)` |

### Geometric Radii

| Token Name      | Value    | Application                                          |
| :-------------- | :------- | :--------------------------------------------------- |
| `--radius-xs`   | `4px`    | Focus outlines, mono badges, small code tags         |
| `--radius-sm`   | `8px`    | Color swatches, input controls, sub-cards            |
| `--radius-md`   | `14px`   | Standard cards, bento cells, spec specimen rows      |
| `--radius-lg`   | `22px`   | Customizer bar, header logo container, profile cards |
| `--radius-xl`   | `32px`   | Showcase banners, modal dialogs, 3D feature card     |
| `--radius-pill` | `9999px` | Buttons, theme pills, live telemetry badges          |

### Temporal Physics & Motion

| Token Name        | Value                               | Purpose                                               |
| :---------------- | :---------------------------------- | :---------------------------------------------------- |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Tactile elastic overshoot on hover and button clicks  |
| `--ease-smooth`   | `cubic-bezier(0.16, 1, 0.3, 1)`     | Silky deceleration for opacity, borders, and modals   |
| `--duration-fast` | `180ms`                             | Instant micro-interaction feedback (buttons, toggles) |
| `--duration-base` | `280ms`                             | Spatial transitions (modal scale, card tilt, drawer)  |

---

## 3. Typography Hierarchy

The typographic stack balances three complementary font families:

1. **Mulish (`--font-sans`)**: Modern geometric grotesque with friendly rounded terminals, serving display headlines and UI navigation.
2. **Open Sans (`--font-alt`)**: Highly legible humanist sans-serif optimized for long-form prose and descriptions.
3. **JetBrains Mono (`--font-mono`)**: Precision monospace used for system telemetry, tokens, metadata, and eyebrows.

### Typographic Scale

```css
/* Display / Heading 1 */
h1,
.type-h1 {
    font-family: var(--font-sans);
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
}

/* Major / Heading 2 */
h2,
.type-h2 {
    font-family: var(--font-sans);
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
}

/* Subtitle / Heading 3 */
h3,
.type-h3 {
    font-family: var(--font-sans);
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.35;
}

/* Card Heading / Heading 4 */
h4,
.type-h4 {
    font-family: var(--font-sans);
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 600;
    line-height: 1.4;
}

/* Lead Paragraph */
p.lead {
    font-family: var(--font-alt);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.75;
    color: var(--text-main);
    max-width: 68ch;
}

/* Standard Prose / Body */
p {
    font-family: var(--font-alt);
    font-size: clamp(0.95rem, 1.5vw, 1.05rem);
    line-height: 1.7;
    color: var(--text-secondary);
}

/* Telemetry / Eyebrow / Monospace */
.section-eyebrow,
.type-mono-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--neon-blue);
}
```

---

## 4. Color Theme Presets

The design system supports live theme shifting via the `data-theme` attribute on `<html>`.

```css
/* Default: Cyber Neon */
:root {
    --neon-blue: #00f5ff;
    --neon-purple: #bf00ff;
    --neon-pink: #ff00aa;
    --neon-green: #00ff88;
    --neon-orange: #ff6b00;
    --neon-yellow: #ffd24d;
}

/* Preset: Lovecore Pink */
[data-theme="lovecore"] {
    --neon-blue: #ff3cac;
    --neon-purple: #ff758c;
    --neon-pink: #ff1361;
    --neon-yellow: #ff9a8b;
    --neon-green: #ff80bf;
    --neon-orange: #ff4b4b;
}

/* Preset: Emerald Matrix */
[data-theme="emerald-matrix"] {
    --neon-blue: #00ff88;
    --neon-purple: #00d26a;
    --neon-pink: #20e3b2;
    --neon-green: #38ef7d;
    --neon-yellow: #11998e;
    --neon-orange: #00b09b;
}

/* Preset: Solar Flare */
[data-theme="solar-sunset"] {
    --neon-blue: #ff9100;
    --neon-purple: #ff3d00;
    --neon-pink: #ff0077;
    --neon-yellow: #ffea00;
    --neon-orange: #ff5722;
    --neon-green: #ffab00;
}
```

---

## 5. Pure CSS Pixel Art Engine

A hallmark of Pixelated Love is its **zero-dependency CSS pixel artwork**. Rather than serving PNG or SVG images, icons and artwork are constructed mathematically using a single `div` whose `box-shadow` values define an integer coordinate grid of illuminated pixels.

### Core Pixel Art Technique (`box-shadow`)

```css
.pixel-canvas-base {
    position: relative;
    width: 12px; /* Pixel grid unit */
    height: 12px;
    background: transparent;
    /* Box-shadow coordinate map: X_OFFSET Y_OFFSET COLOR */
    box-shadow:
        0 0 #ff00aa,
        12px 0 #00f5ff,
        0 12px #bf00ff;
}
```

### Asset 01: The Pixel Heart (Brand Emblem)

- **Base Grid**: 18px unit pixel, 7 columns wide by 6 rows high.
- **Spectrum**: Gradient spanning `#ff3cac` (hot magenta) through `#4e7dff` (cobalt blue) with a specular glass highlight pixel at coordinates `18px 18px` in white.
- **Dynamics**: Floating animation `floatPixelHeart` with a 3.6s period and soft degree rotation.

### Asset 02: The Pixel Paintbrush (Creative Instrument)

- **Base Grid**: 12px diagonal matrix.
- **Anatomy**:
    - _Wet Neon Bristles_: Upper-right tip (`#ff00aa`, `#00f5ff`, `#ffd24d`).
    - _Specular Ferrule_: Metallic chrome collar (`#ffffff`, `#d5fbff`, `#9cecf3`).
    - _Mahogany Cyber Handle_: Stepped diagonal shaft (`#bf00ff`, `#79407c`, `#512374`, `#34126d`).
    - _Glow Droplets_: Suspended paint droplets dripping into space.
- **Dynamics**: Animated diagonal brush stroke hover with `floatPixelBrush`.

### Asset 03: The Pixel Moon (Cosmic Satellite)

- **Base Grid**: 12px crescent arc matrix.
- **Anatomy**:
    - _Horn Arcs_: Curved crescent perimeter in cyan `#00f5ff` and teal `#56e6c4`.
    - _Crater Core_: Shaded hollow body with violet depth (`#8158ff`, `#a855f7`).
    - _Twinkling Orbitals_: Satellite stars floating at adjacent coordinate offsets.
- **Dynamics**: 4s undulating float cycle (`floatPixelMoon`).

### Asset 04: Big Letter "P" (Isometric Monogram)

- **Base Grid**: 12px vertical stem and loop.
- **Anatomy**:
    - _Descending Stem_: 8-stop vertical gradient from `#ff00aa` down to `#00f5ff`.
    - _Upper Counter Loop_: Sunset loop with open counter center and specular highlight.

### Asset 05: Big Letter "L" (Companion Monogram)

- **Base Grid**: 12px vertical stem with horizontal base.
- **Anatomy**:
    - _Vertical Stem_: Cyan-to-green gradient (`#00f5ff` to `#00ff88`).
    - _Horizontal Foot_: Neon magenta foot bar extending 5 pixels to the right.

### Asset 06: Supernova Pixel Star (4-Point Diamond)

- **Base Grid**: 12px diamond flare.
- **Anatomy**:
    - Gold core `#ffd24d` with a bright white center `#ffffff` and extending cyan diamond rays.
- **Dynamics**: Infinite 2.4s expansion and contraction pulse (`pulseStar`).

---

## 6. Component Architecture & Anatomy

### Navigation Bar

- **Class**: `.brand-nav`
- **Structure**: Sticky floating header, blurred obsidian surface (`rgba(7, 7, 14, 0.85)`), 1px subtle border.
- **Elements**: Mini pixel heart logo mark, brand title, responsive menu links, language switcher pill, and modal trigger button.

### Header Showcase & Manifesto

- **Class**: `.header-showcase`
- **Structure**: Glassmorphic banner card with radial background flare.
- **Header Gradient Title**:
    ```css
    .banner .brand h1 {
        background-image: linear-gradient(
            90deg,
            #ff00aa,
            #bf00ff,
            #00f5ff,
            #00ff88,
            #ff00aa
        );
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: alternateGradient 5s ease-in-out infinite alternate;
    }
    ```
- **Stats Grid**: 4-column metric matrix displaying pixel art composition, token counts, contrast compliance, and frame physics.

### Live System Customizer Bar

- **Class**: `.customizer-bar`
- **Capabilities**:
    - Instant theme switching without page reloads.
    - Floating cosmic particles toggle (`✨ Particles: Active / Paused`).
    - Single-click clipboard copying of CSS design tokens.

### Flagship 3D Perspective Card

- **ID**: `#interactiveCard3D` (`.feature-card-3d`)
- **Physics**: Real-time cursor tracking calculating tilt on both X and Y axes:
    ```javascript
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card3D.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    ```
- **Layers**:
    1. _Top Bar_: Live digital heart pill badge with pulsing green telemetry dot.
    2. _Heart Stage_: Suspended floating pixel heart with drop shadows.
    3. _Content_: High-contrast display typography with glowing gradient text.
    4. _Bottom Bar_: Live status telemetry and action trigger button.

### Button System & Triggers

```html
<!-- Primary Button -->
<button class="btn btn-primary">
    Create something <span aria-hidden="true">↗</span>
</button>

<!-- Outline Glass Button -->
<button class="btn btn-outline">
    <span aria-hidden="true">✦</span> Discover
</button>

<!-- Quiet Button -->
<button class="btn btn-quiet">Maybe later</button>

<!-- Icon Trigger -->
<button class="btn btn-icon" aria-label="Add to favorites">
    <span aria-hidden="true">♡</span>
</button>
```

- **States**:
    - `:hover`: Elastic spring translation (`translateY(-2px)`), enhanced glow.
    - `:active`: Compression tactile feedback (`translateY(0)`).
    - `:focus-visible`: 2px solid `--neon-blue` ring with 3px offset.
    - `[disabled]`: 35% opacity, `cursor: not-allowed`, no hover transformation.

### Structured Identity Profile Cards (hCard)

- **Class**: `.cyber-profile-card`
- **Features**: Microformat compliant markup (`<article>`, `<address>`, `<dl>`, `<dt>`, `<dd>`), role-tinted accent variable (`--card-accent`), custom monogram avatar badge, and high-contrast metadata rows.

### Bento Grid Layout

- **Class**: `.bento-grid`
- **Grid Configuration**: `grid-template-columns: repeat(12, 1fr)` with dynamic `grid-column: span X` layouts for editorial variety.
- **Card Archetypes**:
    - `bento-feature`: Double-width brand story anchor.
    - `bento-sun`: Atmospheric weather telemetry with golden radial wash.
    - `bento-quote`: Typographic manifesto card with magenta quote rule.
    - `bento-stat`: High-impact metric number.
    - `bento-playlist`: Audio stream discovery with vinyl icon.
    - `bento-note`: Studio reminder note with ambient border.
    - `bento-map`: Location pin and coordinate note.
    - `bento-cta`: Direct call-to-action link.
    - `bento-gallery`: Visual ambient card with holographic text badge.

### Form Architecture & Input Fields

- **Class**: `.contact-form`
- **Inputs**: Form inputs and textareas styled with obsidian semi-translucent fills, subtle border transitions, and prominent cyan glow focus rings:
    ```css
    .form-input:focus,
    .form-textarea:focus {
        background: rgba(7, 7, 15, 0.85);
        border-color: var(--neon-blue);
        box-shadow:
            0 0 0 3px rgba(0, 245, 255, 0.16),
            0 0 16px rgba(0, 245, 255, 0.2);
    }
    ```

### Structured Lists & Micro-elements

- **Unordered List (`.custom-bullet-list`)**: Custom glowing diamond glyphs (`◆`) rendered in `--neon-blue`.
- **Ordered List (`.custom-num-list`)**: Two-digit leading-zero monospace counters (`01`, `02`, `03`) inside violet pill containers.
- **Hyperlinks (`.standard-link`)**: High-contrast text with stylized underlines offset by `0.25em` and hover text-shadows.

### Modal Dialog & Toast Notification Hub

- **Modal Dialog (`#systemModal`)**:
    - Accessible dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="modalTitle"`).
    - Background overlay with 14px backdrop blur.
    - Keyboard listeners for `Escape` closing and backdrop click dismissal.
- **Toast Notifications (`#toastHub`)**:
    - Polite ARIA region (`aria-live="polite"`).
    - Floating reactive notification pills with contextual iconography (`✦`, `♡`, `🎨`, `🌙`, `🔤`, `✨`, `✓`).
    - Auto-dismissing after 3000ms with spring slide-in/slide-out animations.

---

## 7. Accessibility & Motion Compliance

### Contrast & Legibility

- **WCAG Compliance**: Body text and interactive components maintain a minimum **7:1 AAA contrast ratio** against the dark canvas (`#07070e`).
- **Focus Rings**: Never suppress browser focus without providing an explicit replacement. All interactive elements support `:focus-visible` halos with `--neon-blue` outlines and 3-4px offsets.
- **Interactive Targets**: Minimum interactive surface area of **44 × 44 pixels** for all buttons and anchor links.

### Reduced Motion Adaptability

When a user enables `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
    .stars,
    .nebula,
    .pixel-heart,
    .pixel-moon-art,
    .pixel-brush-art,
    .pixel-star-art,
    .badge-dot-live {
        animation: none !important;
    }

    .feature-card-3d:hover {
        transform: none !important;
    }

    * {
        transition-duration: 0.01ms !important;
    }
}
```

---

## 8. Best Practices & Design Rules

### Do's

- **Always** ground colors using the established token palette (`--neon-blue`, `--neon-purple`, `--neon-pink`, etc.).
- **Always** provide immediate tactile feedback on user actions via spring motion or toast alerts.
- **Always** design pixel art using integer pixel multiples (multiples of 12px or 18px) to prevent sub-pixel blur.
- **Always** pair monospace typography (`--font-mono`) with system telemetry, numbers, badges, and uppercase labels.
- **Always** respect sentence casing in language translations (e.g. Croatian title casing rules).

### Don'ts

- **Never** introduce heavy external raster imagery when a pure CSS `box-shadow` pixel asset can be crafted.
- **Never** use pure black (`#000000`) for card backgrounds; always use obsidian tints (`#07070e` or `rgba(13, 14, 25, 0.78)`) with glass blur to preserve depth.
- **Never** place un-buffered neon text on white or bright backgrounds; the neon system is strictly calibrated for dark-mode environments.
- **Never** rely on color alone to indicate state; always accompany colors with descriptive iconography, badges, or text labels.

---

_Design system maintained by the Pixelated Love Studio. Built with intention and pure CSS._
