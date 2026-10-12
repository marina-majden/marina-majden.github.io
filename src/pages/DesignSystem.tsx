const componentCatalog = [
  {
    name: "button-primary",
    description: "Main CTA and conversion action.",
    snippet: `.button-primary {\n  background: linear-gradient(...);\n  border: 1px solid rgba(...);\n  color: #f5f7ff;\n}`,
  },
  {
    name: "button-secondary",
    description: "Secondary action for supporting flows.",
    snippet: `.button-secondary {\n  background: rgba(...);\n  border: 1px solid rgba(...);\n  color: #dfeafc;\n}`,
  },
  {
    name: "button-ghost",
    description: "Quiet action used for subtle UI controls.",
    snippet: `.button-ghost {\n  background: transparent;\n  border: 1px solid rgba(...);\n}`,
  },
  {
    name: "card-feature",
    description: "Large showcase card for hero or flagship features.",
    snippet: `.card-feature {\n  background: radial-gradient(...);\n  min-height: 540px;\n}`,
  },
  {
    name: "card-project",
    description: "Project card for case studies and portfolio items.",
    snippet: `.card-project {\n  padding: 1.25rem;\n  border-radius: 24px;\n}`,
  },
  {
    name: "card-template",
    description: "Template card for gallery and reusable content modules.",
    snippet: `.card-template {\n  border-radius: 20px;\n  background: rgba(...);\n}`,
  },
  {
    name: "box-text",
    description: "Text container used for callouts, notes, and summaries.",
    snippet: `.box-text {\n  padding: 1.25rem;\n  border-radius: 18px;\n}`,
  },
  {
    name: "box-bento",
    description:
      "Modular content block for bento layouts and composite panels.",
    snippet: `.box-bento {\n  display: grid;\n  gap: 1rem;\n  background: rgba(...);\n}`,
  },
  {
    name: "background-page",
    description: "Base site background to anchor all sections.",
    snippet: `.background-page {\n  background: radial-gradient(...), #07070e;\n}`,
  },
  {
    name: "background-card",
    description: "Layered surface treatment for content cards.",
    snippet: `.background-card {\n  background: linear-gradient(...);\n}`,
  },
  {
    name: "background-bento",
    description: "Structured grid background for compact composite blocks.",
    snippet: `.background-bento {\n  background: linear-gradient(...);\n}`,
  },
];

const projectCards = [
  { title: "Neon Commerce", tag: "Brand System", status: "Live" },
  { title: "Signal Lab", tag: "UX Direction", status: "Concept" },
  { title: "Oneiric Studio", tag: "Art Direction", status: "Draft" },
];

const templateCards = [
  { title: "Landing page", label: "High conversion" },
  { title: "Portfolio", label: "Work showcase" },
  { title: "Editorial", label: "Story-led" },
];

export default function DesignSystem() {
  return (
    <main className="background-page min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 lg:px-10">
        <header className="background-card rounded-4xl p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="chip">design system</span>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Pixelated Love — reusable visual language
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                This system keeps every component consistent across the page.
                Use a class name, not a custom style, when building new blocks.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="button-primary">Primary action</button>
              <button className="button-secondary">Secondary</button>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="box-text">
            <p className="eyebrow">foundation</p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Core building blocks
            </h2>
            <p className="mt-3 text-slate-300">
              The visual language combines cosmic depth, neon glow, glass
              surfaces, and tactile motion. Every class below is designed to
              work in isolation or combined into larger layouts.
            </p>
          </div>

          <div className="box-bento">
            <div className="flex items-center justify-between">
              <span className="eyebrow">palette</span>
              <span className="badge badge-live">live</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {["#00f5ff", "#bf00ff", "#ff00aa", "#00ff88", "#ffd24d"].map(
                (color) => (
                  <div
                    key={color}
                    className="h-12 rounded-xl border border-white/10"
                    style={{ background: color }}
                  />
                ),
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Buttons</h2>
            <span className="eyebrow">actions</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="button-primary">button-primary</button>
            <button className="button-secondary">button-secondary</button>
            <button className="button-ghost">button-ghost</button>
            <button className="button-link">button-link</button>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Feature cards</h2>
            <span className="eyebrow">featured</span>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <article className="card-feature">
              <div className="flex items-center justify-between">
                <span className="eyebrow">showcase</span>
                <span className="badge badge-live">featured</span>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <div className="pixel-heart-hero" aria-label="Pixel heart" />
              </div>
              <h3 className="mt-8 text-2xl font-bold text-white">
                card-feature
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Large flagship block for launch moments, value propositions, and
                immersive messaging.
              </p>
            </article>

            <article className="card-project">
              <span className="chip chip-soft">card-project</span>
              <h3 className="mt-5 text-xl font-bold text-white">
                Portfolio case study
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Used for canonical work, campaign showcases, and before/after
                stories.
              </p>
              <div className="mt-5 space-y-3">
                {projectCards.map((card) => (
                  <div key={card.title} className="box-text py-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                      <span>{card.tag}</span>
                      <span>{card.status}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-white">
                      {card.title}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card-template">
              <span className="chip chip-soft">card-template</span>
              <h3 className="mt-5 text-xl font-bold text-white">
                Reusable template
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Lightweight resource cards for galleries, content modules, and
                starter layouts.
              </p>
              <div className="mt-5 space-y-3">
                {templateCards.map((template) => (
                  <div key={template.title} className="box-bento p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        {template.title}
                      </span>
                      <span className="badge">{template.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Text and layout blocks
            </h2>
            <span className="eyebrow">structure</span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="box-text">
              <p className="eyebrow">box-text</p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Narrative block
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Use this for explanatory text, summaries, and light content
                modules.
              </p>
            </div>

            <div className="box-bento">
              <p className="eyebrow">box-bento</p>
              <h3 className="text-xl font-semibold text-white">
                Bento layout block
              </h3>
              <p className="text-sm text-slate-300">
                Designed for multi-topic panels that mix metrics, descriptions,
                and actions.
              </p>
            </div>

            <div className="background-bento">
              <p className="eyebrow">background-bento</p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Auxiliary panel
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                A supportive surface for secondary features and context
                building.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Class reference</h2>
            <span className="eyebrow">copy-ready</span>
          </div>

          <div className="space-y-4">
            {componentCatalog.map((item) => (
              <div
                key={item.name}
                className="background-card rounded-2xl p-4 md:p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {item.description}
                    </p>
                  </div>
                  <span className="chip chip-soft">use this</span>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 p-4 text-xs text-cyan-100">
                  <code>{item.snippet}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
