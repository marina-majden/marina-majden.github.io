import React, { useEffect } from "react";

const CosmicBackground = () => {
    useEffect(() => {
        let particlesEnabled = true;

        function createParticle() {
            if (!particlesEnabled) return;
            const particle = document.createElement("div");
            const size = Math.random() * 4 + 2;
            const colors = [
                "#00f5ff",
                "#bf00ff",
                "#ff00aa",
                "#00ff88",
                "#ffd24d",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    opacity: ${Math.random() * 0.6 + 0.3};
                    box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
                `;
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
        <>
            {/* 
              Embedding the CSS directly in the component ensures it remains highly portable 
              and self-contained. The styles use your exact keyframes and gradients.
            */}
            <style>
                {`
                    .universe-bg {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -2;
                        overflow: hidden;
                        pointer-events: none;
                        background-color: #07070e; /* Base dark canvas from WebMachine */
                    }

                    .stars {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-image:
                            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
                            radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
                            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
                            radial-gradient(2px 2px at 160px 120px, rgba(0, 245, 255, 0.9), transparent),
                            radial-gradient(1px 1px at 230px 80px, #ffffff, transparent),
                            radial-gradient(2px 2px at 300px 150px, rgba(191, 0, 255, 0.7), transparent),
                            radial-gradient(1px 1px at 350px 200px, #ffffff, transparent),
                            radial-gradient(2px 2px at 420px 50px, rgba(255, 0, 170, 0.8), transparent);
                        background-size: 500px 500px;
                        animation: twinkle 6s ease-in-out infinite;
                    }

                    /* 
                      Offsetting the background positions and animation delays 
                      creates the parallax depth effect 
                    */
                    .stars:nth-child(2) {
                        background-position: 50px 50px;
                        animation-delay: -2s;
                        opacity: 0.55;
                    }

                    .stars:nth-child(3) {
                        background-position: 110px 110px;
                        animation-delay: -4s;
                        opacity: 0.35;
                    }

                    @keyframes twinkle {
                        0%, 100% { opacity: 0.9; }
                        50% { opacity: 0.4; }
                    }

                    .nebula {
                        position: absolute;
                        width: 150%;
                        height: 150%;
                        top: -25%;
                        left: -25%;
                        background:
                            radial-gradient(ellipse at 20% 20%, rgba(191, 0, 255, 0.16) 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 80%, rgba(0, 245, 255, 0.16) 0%, transparent 50%),
                            radial-gradient(ellipse at 40% 60%, rgba(255, 0, 170, 0.12) 0%, transparent 40%),
                            radial-gradient(ellipse at 65% 30%, rgba(0, 255, 136, 0.09) 0%, transparent 40%);
                        animation: nebulaFlow 24s ease-in-out infinite;
                        filter: blur(40px);
                    }

                    @keyframes nebulaFlow {
                        0%, 100% { transform: rotate(0deg) scale(1); }
                        50% { transform: rotate(8deg) scale(1.08); }
                    }

                    /* Accessibility: Respecting reduced motion preferences */
                    @media (prefers-reduced-motion: reduce) {
                        .stars, .nebula {
                            animation: none !important;
                        }
                    }
                `}
            </style>

            {}
            <div className='universe-bg' aria-hidden='true'>
                <div className='nebula'></div>
                {/* 
                  Multiple stars layers with standard DOM elements.
                  In a more complex app, this could be mapped over an array, 
                  but static declarations match the precise CSS targets perfectly. 
                */}
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
            </div>
        </>
    );
};

export default CosmicBackground;
