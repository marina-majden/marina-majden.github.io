import React, { useEffect, lazy } from "react";
import "../extra.css";
import SwitchCard from "@/components/SwitchCard";
import SwitchCardNeon from "@/components/SwitchCardNeon";
import SpotlightCard from "@/components/SpotlightCard";
import RainbowNeonGlow from "@/components/GlowingCards";

const TicketCard = lazy(() => import("@/components/TicketCard.tsx"));

const Newbies: React.FC = () => {
  useEffect(() => {
    void import("@/components/TicketCard.tsx");
  }, []);

  return (
    <>
      <h2 className="px-4 py-6 text-9xl font-bold font-stretch-expanded text-center text-cyan-300 font-cursive">
        Gym
      </h2>
      <p className="text-center text-slate-400 mb-4 max-w-xl mx-auto">
        Place to try out all the new elements and components. Used only during
        development phase.
      </p>

      {/* SwitchCardNeon: Interactive wow factor centerpiece below the title */}
      <div className="w-full my-6 flex justify-center">
        <SwitchCardNeon />
      </div>
      <section
        id="feat"
        className="py-10 md:py-14 flex col items-center justify-evenly gap-2"
      >
        <RainbowNeonGlow />
      </section>
      <div className="p-4 m-auto flex col items-center justify-around">
        <SwitchCard />
        <SpotlightCard />{" "}
      </div>
    </>
  );
};
export default Newbies;
