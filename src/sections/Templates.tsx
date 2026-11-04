import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import TemplateModal from "@/components/TemplateModal";
import { FALLBACK_IMAGE } from "@/data/constants";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import RetroTv from "@/components/RetroTv";

export interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: {
    purpose: string;
    style: string;
    features: string;
    special?: string;
  };
  videoUrl?: string;
  screenshotHome?: string;
  screenshotDesktop?: string;
  screenshotMobile?: string;
  tags?: string[];
}

interface TemplatesContent {
  title: string;
  subtitle: string;
  standard: string;
  items: TemplateItem[];
}

interface TemplatesProps {
  t: {
    templates: TemplatesContent;
  };
  scrollToSection: (section: string) => void;
}

const FEATURED_TEMPLATE_IDS = ["zen", "rhythm", "neonvinyl"];
const FEATURED_ACCENT = "var(--color-neon-cyan)";
const PILL_ACCENTS = {
  tags: "var(--color-neon-cyan)",
  features: "var(--color-neon-pink)",
  styles: "var(--color-neon-green)",
  purposes: "var(--color-neon-violet)",
};

const Templates: React.FC<TemplatesProps> = ({ t }) => {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<TemplateItem | null>(null);

  const featuredItems = FEATURED_TEMPLATE_IDS.map((id) =>
    t.templates.items.find((item) => item.id === id),
  ).filter((item): item is TemplateItem => Boolean(item));
  const activeItem = featuredItems[activeIndex];
  const activeAccent = FEATURED_ACCENT;
  const activePoster = activeItem?.screenshotHome
    ? activeItem.screenshotHome.startsWith("/")
      ? activeItem.screenshotHome
      : `/templates/images/${activeItem.screenshotHome}`
    : FALLBACK_IMAGE;
  const featureItems = activeItem
    ? [
        ...activeItem.highlights.features.split(/,\s*/).filter(Boolean),
        ...(activeItem.highlights.special
          ? [activeItem.highlights.special]
          : []),
      ]
    : [];
  const purposeItems = activeItem
    ? activeItem.highlights.purpose.split(/,\s*/).filter(Boolean)
    : [];
  const styleItems = activeItem
    ? activeItem.highlights.style.split(/,\s*/).filter(Boolean)
    : [];

  const openModal = (item: TemplateItem) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const handleOrder = () => {
    closeModal();
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#services";
    }
  };

  const showPrevious = () =>
    setActiveIndex((index) =>
      index === 0 ? featuredItems.length - 1 : index - 1,
    );
  const showNext = () =>
    setActiveIndex((index) => (index + 1) % featuredItems.length);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-transparent px-4 py-20 md:px-8"
      id="webshop"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-150 w-[min(50rem,100vw)] -translate-x-1/2 bg-[radial-gradient(circle,rgba(0,245,255,0.06)_0%,rgba(191,0,255,0.04)_50%,transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle>{t.templates.title}</SectionTitle>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mb-10 mt-3 max-w-2xl text-center font-sans text-base text-gray-300 lg:text-lg">
            {t.templates.subtitle}
          </p>
        </Reveal>

        {activeItem && (
          <Reveal delay={180}>
            <div className="relative py-8 sm:py-10">
              <motion.article className="mx-auto max-w-360">
                <div className="mb-6 flex justify-center">
                  <span
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(14,15,28,0.7)] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-sm"
                    style={{ color: activeAccent }}
                  >
                    <span
                      className="h-2 w-2 animate-pulse rounded-full"
                      style={{
                        backgroundColor: activeAccent,
                        boxShadow: `0 0 8px ${activeAccent}`,
                      }}
                      aria-hidden="true"
                    />
                    {lang === "hr"
                      ? "Izdvojeni predložak"
                      : "Featured template"}
                  </span>
                </div>

                <div className="grid items-start gap-x-4 gap-y-6 lg:grid-cols-[minmax(12rem,0.82fr)_minmax(0,2.4fr)_minmax(12rem,0.82fr)] lg:content-start lg:gap-8">
                  <motion.div
                    key={`left-${activeItem.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="order-2 col-span-2 flex min-w-0 flex-col content-start items-start gap-5 px-1 py-2 lg:order-1 lg:col-span-1 lg:items-end"
                  >
                    <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                      {(activeItem.tags || []).map((tag, index) => (
                        <motion.span
                          key={tag}
                          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                          transition={{
                            duration: 3.2 + (index % 3) * 0.55,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.12,
                          }}
                          className="relative rounded-xl border bg-[rgba(13,16,30,0.52)] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-200 shadow-[0_10px_24px_rgba(0,0,0,0.32)] backdrop-blur-sm transition-shadow hover:shadow-[0_12px_28px_rgba(0,0,0,0.42)]"
                          style={{
                            borderColor: `color-mix(in srgb, ${PILL_ACCENTS.tags} 42%, rgba(255,255,255,0.12))`,
                            boxShadow: `0 8px 22px rgba(0,0,0,0.28), 0 0 16px color-mix(in srgb, ${PILL_ACCENTS.tags} 18%, transparent)`,
                            transform: `rotate(${(index % 3) - 1}deg)`,
                          }}
                        >
                          <span
                            className="absolute inset-x-3 top-0 h-px"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${PILL_ACCENTS.tags}, transparent)`,
                            }}
                            aria-hidden="true"
                          />
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex flex-col items-start gap-2.5 lg:items-end">
                      {purposeItems.map((purpose, index) => (
                        <motion.span
                          key={`${purpose}-${index}`}
                          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                          transition={{
                            duration: 3.6 + (index % 3) * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.14,
                          }}
                          className={`relative max-w-full rounded-2xl border bg-[rgba(13,16,30,0.52)] px-3.5 py-2.5 text-xs leading-relaxed text-slate-200 shadow-[0_10px_24px_rgba(0,0,0,0.32)] backdrop-blur-sm ${index % 2 ? "ml-3 lg:ml-0 lg:mr-3" : "mr-2 lg:mr-0 lg:ml-2"}`}
                          style={{
                            borderColor: `color-mix(in srgb, ${PILL_ACCENTS.purposes} 40%, rgba(255,255,255,0.12))`,
                            boxShadow: `0 8px 22px rgba(0,0,0,0.28), 0 0 16px color-mix(in srgb, ${PILL_ACCENTS.purposes} 16%, transparent)`,
                          }}
                        >
                          <span
                            className="absolute inset-x-4 top-0 h-px"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${PILL_ACCENTS.purposes}, transparent)`,
                            }}
                            aria-hidden="true"
                          />
                          {purpose}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <div className="order-1 col-span-2 flex min-w-0 flex-col lg:order-2 lg:col-span-1">
                    <RetroTv
                      title={activeItem.title}
                      videoSrc={
                        activeItem.videoUrl
                          ? `/templates/videos/${activeItem.videoUrl}#t=0.1`
                          : undefined
                      }
                      posterSrc={activePoster}
                      accent={activeAccent}
                      onPreview={() => openModal(activeItem)}
                      onPrevious={showPrevious}
                      onNext={showNext}
                      activeIndex={activeIndex}
                      slideCount={featuredItems.length}
                      onSelectSlide={setActiveIndex}
                    />
                  </div>

                  <motion.div
                    key={`right-${activeItem.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="order-3 col-span-2 flex min-w-0 flex-col items-start gap-2.5 px-1 py-2 lg:col-span-1 lg:justify-start lg:pt-8"
                  >
                    {featureItems.map((feature, index) => (
                      <motion.span
                        key={`${feature}-${index}`}
                        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                        transition={{
                          duration: 3.8 + (index % 3) * 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.15,
                        }}
                        className={`relative max-w-full rounded-2xl border bg-[rgba(13,16,30,0.42)] px-3.5 py-2.5 text-xs leading-relaxed text-slate-200 shadow-[0_10px_24px_rgba(0,0,0,0.32)] backdrop-blur-sm ${index % 2 ? "ml-3" : "mr-2"}`}
                        style={{
                          borderColor: `color-mix(in srgb, ${PILL_ACCENTS.features} 40%, rgba(255,255,255,0.12))`,
                          boxShadow: `0 8px 22px rgba(0,0,0,0.28), 0 0 16px color-mix(in srgb, ${PILL_ACCENTS.features} 16%, transparent)`,
                        }}
                      >
                        <span
                          className="absolute inset-x-4 top-0 h-px"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${PILL_ACCENTS.features}, transparent)`,
                          }}
                          aria-hidden="true"
                        />
                        {feature}
                      </motion.span>
                    ))}
                    <div className="flex flex-wrap justify-start gap-2 pt-2">
                      {styleItems.map((style, index) => (
                        <motion.span
                          key={`${style}-${index}`}
                          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                          transition={{
                            duration: 3.4 + (index % 3) * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.13,
                          }}
                          className="relative rounded-xl border bg-[rgba(13,16,30,0.52)] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-200 shadow-[0_10px_24px_rgba(0,0,0,0.32)] backdrop-blur-sm"
                          style={{
                            borderColor: `color-mix(in srgb, ${PILL_ACCENTS.styles} 42%, rgba(255,255,255,0.12))`,
                            boxShadow: `0 8px 22px rgba(0,0,0,0.28), 0 0 16px color-mix(in srgb, ${PILL_ACCENTS.styles} 18%, transparent)`,
                            transform: `rotate(${(index % 3) - 1}deg)`,
                          }}
                        >
                          <span
                            className="absolute inset-x-3 top-0 h-px"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${PILL_ACCENTS.styles}, transparent)`,
                            }}
                            aria-hidden="true"
                          />
                          {style}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => openModal(activeItem)}
                    className="button-base button-ghost min-h-11 px-5 text-xs"
                  >
                    {lang === "hr" ? "Istraži predložak" : "Explore template"}
                  </button>
                  <Link
                    to="/webshop"
                    className="button-base button-primary min-h-11 px-5 text-xs no-underline"
                  >
                    {lang === "hr" ? "Pogledaj webshop" : "Visit the webshop"}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            </div>
          </Reveal>
        )}
      </div>

      {selectedItem && (
        <TemplateModal
          product={selectedItem}
          isOpen={!!selectedItem}
          standard={t.templates.standard}
          onClose={closeModal}
          onOrder={handleOrder}
        />
      )}
    </section>
  );
};

export default Templates;
