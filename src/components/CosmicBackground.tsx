import React, { useEffect } from "react";

const CosmicBackground = () => {
  useEffect(() => {
    let particlesEnabled = true;

    function createParticle() {
      if (!particlesEnabled) return;
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const colors = [
        "var(--color-neon-cyan)",
        "var(--color-neon-violet)",
        "var(--color-neon-pink)",
        "var(--color-neon-green)",
        "var(--color-neon-yellow)",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.className = "cosmic-particle";
      particle.style.setProperty("--particle-size", `${size}px`);
      particle.style.setProperty("--particle-color", color);
      particle.style.setProperty(
        "--particle-glow",
        `${Math.random() * 10 + 5}px`,
      );
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = "100vh";
      particle.style.opacity = `${Math.random() * 0.6 + 0.3}`;
      document.body.appendChild(particle);

      const duration = Math.random() * 9000 + 800;
      particle.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 0.4 },
          {
            transform: `translateY(-110vh) rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        { duration: duration, easing: "linear" },
      ).onfinish = () => particle.remove();
    }

    const particleTimer = setInterval(createParticle, 1000);

    // Cleanup function prevents infinite particle flooding on re-renders
    return () => {
      particlesEnabled = false;
      clearInterval(particleTimer);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <div className="universe-bg" aria-hidden="true">
      <div className="nebula" />
      <div className="stars" />
      <div className="stars" />
      <div className="stars" />
    </div>
  );
};

export default CosmicBackground;
