import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  motion,
  useMotionValue,
  animate,
  type AnimationPlaybackControls,
} from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Reveal from "@/components/Reveal";
import { SkeletonCard } from "@/components/SkeletonCard";
import GradientButton from "@/components/GradientBorderButton";
import SwitchCard from "@/components/SwitchCard";
import CyberCard from "@/components/CyberCard";
import SpotlightCard from "@/components/SpotlightCard";

const TicketCard = lazy(() => import("@/components/TicketCard.tsx"));

const Feature: React.FC = () => {
  const [showTicketCard, setShowTicketCard] = useState(false);

  useEffect(() => {
    void import("@/components/TicketCard.tsx");
    const timeout = window.setTimeout(() => setShowTicketCard(true), 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <h2 className="px-4 py-6 text-[clamp(3rem, 10vw, 92px)] font-bold font-stretch-expanded text-center text-cyan-300 text-neon-cyan font-cursive feature">
        Features
      </h2>

      <section
        id="feat"
        className="py-10 md:py-14 flex col items-center justify-evenly gap-2 glass-section"
      >
        {showTicketCard ? (
          <Suspense fallback={<SkeletonCard />}>
            <TicketCard />
          </Suspense>
        ) : (
          <SkeletonCard />
        )}

        <br />
        <CyberCard />
      </section>
      <div className="p-4 m-auto flex col items-center justify-around">
        <SwitchCard />
        <SpotlightCard />{" "}
      </div>
    </>
  );
};
export default Feature;
