import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width: number, height: number, particles: Particle[];
        let animationFrameId: number;

        let mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2;
                this.color =
                    Math.random() > 0.5
                        ? "rgba(6, 182, 212,"
                        : "rgba(217, 70, 239,";
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + "0.5)";
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = width < 768 ? 30 : 60;
            for (let i = 0; i < particleCount; i++)
                particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update();
                p1.draw();

                // Mouse interaction
                const dxMouse = p1.x - mouse.x;
                const dyMouse = p1.y - mouse.y;
                const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

                if (distMouseSq < 40000) {
                    ctx.beginPath();
                    const grad = ctx.createLinearGradient(
                        p1.x,
                        p1.y,
                        mouse.x,
                        mouse.y,
                    );
                    grad.addColorStop(0, p1.color + "0.4)");
                    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    if (distMouseSq < 10000) {
                        p1.x += dxMouse * 0.02;
                        p1.y += dyMouse * 0.02;
                    }
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;

                    if (dx > 150 || dx < -150 || dy > 150 || dy < -150)
                        continue;

                    const distSq = dx * dx + dy * dy;

                    if (distSq < 22500) {
                        ctx.beginPath();
                        const grad = ctx.createLinearGradient(
                            p1.x,
                            p1.y,
                            p2.x,
                            p2.y,
                        );
                        grad.addColorStop(0, p1.color + "0.15)");
                        grad.addColorStop(1, p2.color + "0.15)");
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        resize();
        initParticles();
        animate();

        // Čišćenje (Cleanup) - VAŽNO u Reactu
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return createPortal(
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%", // 100% sprječava horizontalni scrollbar
                height: "100dvh", // 100dvh je bolje za mobilne preglednike
                zIndex: -1, // Stavlja ga iza svega
                background: "#0a0a0a", // Tamna pozadina
                pointerEvents: "none", // Dozvoljava klikanje na kartice iznad
            }}
        />,
        document.body
    );
};

export default BackgroundCanvas;
