# Pixelated Love — Whole-Page Design System

> This design system is the source of truth for every reusable block across the site. Components should be built using class names instead of writing custom CSS inline whenever possible.

## 1. Core principles

- Keep backgrounds dark and atmospheric.
- Use neon cyan, violet, pink, and green as accent colors only.
- Prefer glass surfaces, subtle borders, and layered gradients over flat fills.
- Use the same radii, spacing, and shadow language across all sections.
- Build with class names such as `button-primary`, `card-feature`, `box-text`, and `background-page`.

## 2. Design tokens

```css
:root {
  --page-bg: #07070e;
  --page-bg-soft: #0d1020;
  --card-bg: rgba(13, 16, 30, 0.8);
  --card-bg-strong: rgba(17, 20, 36, 0.92);
  --card-border: rgba(255, 255, 255, 0.12);
  --text-main: #f7fbff;
  --text-soft: #d7e3f2;
  --text-muted: #9aaac0;
  --neon-cyan: #00f5ff;
  --neon-violet: #bf00ff;
  --neon-pink: #ff00aa;
  --neon-green: #00ff88;
  --neon-yellow: #ffd24d;
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## 3. Background classes

### `background-page`

```css
.background-page {
  background:
    radial-gradient(circle at top, rgba(191, 0, 255, 0.16), transparent 32%),
    radial-gradient(
      circle at 80% 12%,
      rgba(0, 245, 255, 0.12),
      transparent 28%
    ),
    #07070e;
  color: #f7fbff;
}
```

Use for the root shell of the page, page sections, and landing layouts.

### `background-card`

```css
.background-card {
  background: linear-gradient(
    135deg,
    rgba(12, 15, 28, 0.88),
    rgba(16, 20, 35, 0.8)
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
}
```

Use for feature banners, hero sections, and elevated content containers.

### `background-bento`

```css
.background-bento {
  background: linear-gradient(
    180deg,
    rgba(19, 24, 39, 0.85),
    rgba(12, 15, 24, 0.9)
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
}
```

Use for grouped metadata blocks, smaller modules, and bento cells.

## 4. Layout blocks

### `box-text`

```css
.box-text {
  background: rgba(14, 18, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 1.25rem;
}
```

Use for explanatory paragraphs, short notes, and text-first content blocks.

### `box-bento`

```css
.box-bento {
  background: linear-gradient(
    180deg,
    rgba(19, 24, 39, 0.85),
    rgba(12, 15, 24, 0.9)
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 1.25rem;
}
```

Use for multi-topic micro-panels, metrics, and compact grouped content.

## 5. Button system

### `button-primary`

```css
.button-primary {
  background: linear-gradient(135deg, #00f5ff, #bf00ff);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #07070e;
  border-radius: 9999px;
  padding: 0.8rem 1.4rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

Use for main calls to action and primary conversions.

### `button-secondary`

```css
.button-secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #d7e3f2;
  border-radius: 9999px;
  padding: 0.8rem 1.4rem;
}
```

Use for secondary actions and non-primary flows.

### `button-ghost`

```css
.button-ghost {
  background: transparent;
  border: 1px solid rgba(0, 245, 255, 0.35);
  color: #00f5ff;
  border-radius: 9999px;
}
```

Use for quiet or less-dominant actions.

### `button-link`

```css
.button-link {
  background: transparent;
  border: 0;
  color: #00f5ff;
  border-radius: 9999px;
  padding-inline: 0;
}
```

Use for inline calls to action and low emphasis navigational triggers.

## 6. Card system

### `card-feature`

```css
.card-feature {
  position: relative;
  border-radius: 32px;
  background:
    radial-gradient(circle at 18% 15%, rgba(191, 0, 255, 0.2), transparent 30%),
    radial-gradient(
      circle at 80% 22%,
      rgba(255, 0, 170, 0.18),
      transparent 30%
    ),
    linear-gradient(135deg, rgba(12, 15, 24, 0.9), rgba(7, 7, 14, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.12);
  min-height: 540px;
  padding: 1.5rem;
}
```

Use for narrative hero cards, flagship sections, and editorial showcases.

### `card-project`

```css
.card-project {
  background:
    radial-gradient(circle at 18% 15%, rgba(191, 0, 255, 0.2), transparent 30%),
    linear-gradient(135deg, rgba(12, 15, 24, 0.9), rgba(7, 7, 14, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
  min-height: 330px;
  padding: 1.5rem;
}
```

Use for portfolio case studies, project snapshots, and work summaries.

### `card-template`

```css
.card-template {
  background:
    radial-gradient(
      circle at 18% 15%,
      rgba(0, 245, 255, 0.12),
      transparent 26%
    ),
    linear-gradient(135deg, rgba(12, 15, 24, 0.9), rgba(7, 7, 14, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
  min-height: 330px;
  padding: 1.5rem;
}
```

Use for templates, resource cards, and gallery curation modules.

## 7. Utility classes

### `chip`

```css
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.5rem 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.62rem;
}
```

### `badge`

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}
```

### `eyebrow`

```css
.eyebrow {
  display: inline-block;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #00f5ff;
  font-weight: 700;
}
```

## 8. Component rules

- Start each new block with one of the page background classes.
- Use `box-text` for supporting copy and `box-bento` for grouped modules.
- Use `card-feature` only for primary narrative moments.
- Use `card-project` for portfolio and case study content.
- Use `card-template` for feature templates and gallery cards.
- Use `button-primary` for conversions and `button-secondary` for alternate actions.
- Keep content consistent in radii, borders, shadows, and spacing.

## 9. Recommended composition

```html
<main class="background-page">
  <section class="background-card">
    <button class="button-primary">Start</button>
    <button class="button-secondary">Read more</button>
  </section>

  <article class="card-feature"></article>
  <article class="card-project"></article>
  <article class="card-template"></article>
</main>
```

This is the default pattern for new sections across the whole page.
