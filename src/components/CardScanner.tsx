import React, { useEffect, useRef, useMemo } from "react";
import { useAnimationFrame } from "framer-motion";
import {
    Activity,
    Aperture,
    Archive,
    Award,
    Zap,
    Hexagon,
    Triangle,
    Circle,
    Star,
    Heart,
    Droplet,
    Flame,
    Sun,
    Moon,
    Cloud,
    Music,
    Video,
    Image,
    Box,
    Layers,
    Anchor,
    Feather,
    Key,
    Umbrella,
    Smartphone,
    Monitor,
    Headphones,
    Camera,
    Watch,
    Gift,
} from "lucide-react";

// --- KONFIGURACIJA BOJA ZA GRADIJENTE ---
const GRADIENT_COLORS = [
    "#ec014b", // 1. Hot Pink
    "#06cced", // 2. Bright Cyan
    "#251967", // 3. Deep Purple
    "#d0135e", // 4. Magenta
    "#f59e0b", // 5. Amber
    "#10b981", // 6. Emerald Green
    "#8b5cf6", // 7. Violet
    "#3b82f6", // 8. Blue
];

// --- CSS Styles Injection ---
const styles = `
.card-texture {
    overflow: hidden;
    position: relative;
    border-radius: 16px; 
    border: 1px solid inherit;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background: var(--card-bg, linear-gradient(to left top, #ec014b, #06cced));
    isolation: isolate;
    width: 100%;
    height: 100%;
}

.card-texture::before,
.card-texture::after {
    position: absolute;
    inset: 0;
    z-index: 0;
    content: "";
    pointer-events: none;
    border-radius: 16px;
}

/* Base Texture Layer (Default Style) */
.card-texture::before {
    background:
        var(--pattern, repeating-linear-gradient(45deg, #000, #999, #000 5%)),
        var(--map, linear-gradient(45deg, #777, #000));
    background-blend-mode: screen;
    filter: contrast(19);
    mix-blend-mode: multiply;
    opacity: 0.5; 
}

/* Base Color Grading Layer */
.card-texture::after {
    background: linear-gradient(90deg, rgba(37, 25, 103, 0.5), rgba(208, 19, 94, 0.5));
    mix-blend-mode: screen;
}

/* --- Individual Style Classes --- */
.style2 { --pattern: repeating-radial-gradient(circle at 0 50%, #000, #999, #000 5%); --map: radial-gradient(circle at 0 50%, #777, #000); }
.style3 { --pattern: repeating-conic-gradient(at -9% 25%, #000, #999, #000 2.5%); --map: conic-gradient(at -9% 25%, #000, #777 50%); }
.style4 { --pattern: repeating-linear-gradient(30deg, #000, #999, #000 5%), repeating-linear-gradient(-60deg, #000, #999, #000 5%); --map: linear-gradient(30deg, #777, #000); }
.style5::before { background: var(--map), var(--pattern); --map: linear-gradient(#777, #000); --pattern: repeating-radial-gradient(circle at -35% 0, #000, #999, #000 5%), repeating-radial-gradient(circle at -35% 100%, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style6::before { background: var(--map), var(--pattern); --map: linear-gradient(30deg, #777, #000), repeating-linear-gradient(30deg, #000, #999, #000 5%); --pattern: repeating-linear-gradient(-60deg, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style7::before { background: var(--map), var(--pattern); --map: linear-gradient(30deg, #777, #000); --pattern: repeating-linear-gradient(30deg, #000, #999, #000 5%), repeating-conic-gradient(#000, #999, #000 5%); background-blend-mode: screen, difference; }
.style8::before { background: var(--map), var(--pattern); --map: linear-gradient(30deg, #777, #000); --pattern: repeating-linear-gradient(30deg, #000, #999, #000 5%), repeating-radial-gradient(circle at 100% 50%, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style9::before { background: var(--map), var(--pattern); --map: radial-gradient(circle, #777, #000); --pattern: repeating-linear-gradient(-45deg, #000, #999, #000 5%), repeating-linear-gradient(45deg, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style10::before { background: var(--map), var(--pattern); --map: conic-gradient(#777, #000); --pattern: repeating-linear-gradient(-45deg, #000, #999, #000 5%), repeating-linear-gradient(45deg, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style11::before { background: var(--map), var(--pattern); --map: radial-gradient(circle, #000, #666 70%); --pattern: radial-gradient(circle, #000, #fff, #000 71%) 0 0/2em 2em round, radial-gradient(circle, #000, #fff, #000 71%) 1em 1em/2em 2em round; background-blend-mode: difference; }
.style12::before { background: var(--map), var(--pattern); --map: linear-gradient(-15deg, #000, #666); --pattern: radial-gradient(circle, #fff, #000 65%) 0 0/2em 2em round, radial-gradient(circle, #000, #fff, #000 65%) 1em 1em/2em 2em round; background-blend-mode: difference; }
.style13::before { background: var(--map), var(--pattern); --map: linear-gradient(#777, #000); --pattern: radial-gradient(circle, #000, #999, #000 65%) 0 0/2em 2em round, radial-gradient(circle, #000, #999, #000 65%) 1em 1em/2em 2em round; background-blend-mode: screen, difference; }
.style14::before { background: var(--map), var(--pattern); --map: conic-gradient(at 0 50%, #777, #000); --pattern: repeating-radial-gradient(circle at 0 0, #000, #999, #000 5%), repeating-conic-gradient(at -5% 50%, #000, #999, #000 5%); background-blend-mode: screen, difference; }
.style15 { --pattern: repeating-linear-gradient(45deg, #000, #999, #000 5%) 0/50% no-repeat, repeating-linear-gradient(-45deg, #000, #999, #000 5%) 100%/50% no-repeat; --map: linear-gradient(#777, #000); }
.style16::before { background: var(--map), var(--pattern); --map: radial-gradient(circle, #888, #000); --pattern: repeating-radial-gradient(circle at 0 100%, #000, #888, #000 5%) 0 0/100% 50% no-repeat, repeating-radial-gradient(circle at 100% 0, #000, #888, #000 5%) 0 100%/100% 50% no-repeat; background-blend-mode: screen; }
.style17::before { background: radial-gradient(#000, #fff 70%) 0.75em 0.75em, conic-gradient(from -90deg at 15% 50%, #fff, #000 5% 30%, #fff 35%), conic-gradient(at 50% 15%, #fff, #000 5% 30%, #fff 35%), conic-gradient(from 90deg at 85% 50%, #fff, #000 5% 30%, #fff 35%), conic-gradient(from 180deg at 50% 85%, #fff, #000 5% 30%, #fff 35%); background-size: 1.5em 1.5em; background-blend-mode: difference, multiply, multiply, multiply; }
.style18 { --map: linear-gradient(#777, #000); --pattern: repeating-conic-gradient(#ddd, #000 12.5% 37.5%, #ddd 50%) 0/1em 1em; }
.style19::before { background: var(--map), var(--pattern); --map: radial-gradient(circle, #000, #777); --pattern: repeating-radial-gradient(circle, #ddd, #000, #ddd 5%), repeating-conic-gradient(#ddd, #000, #ddd 5%); background-blend-mode: screen, difference; }
.style20::before { background: var(--map), var(--pattern); --map: repeating-linear-gradient(45deg, #000, #666, #000 20%); --pattern: repeating-radial-gradient(circle, #ddd, #000, #ddd 5%), repeating-conic-gradient(#ddd, #000, #ddd 5%); background-blend-mode: screen, difference; }
`;

// --- Types ---
interface CardData {
    id: number;
    styleClass: string;
    gradient: string;
    icon: React.ReactNode;
    font: string;
}

// --- Constants ---
const CARD_WIDTH = 380;
const CARD_GAP = 40;
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP;
const SCANNER_WIDTH = 4;
const SCANNER_HEIGHT = 260;

// --- Helper: Generate Code (Hidden Layer - RESTORED) ---
// Vraćena logika za generiranje specifičnog koda sustava čestica
const generateCode = (width: number, height: number) => {
    const randInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr: string[]) => arr[randInt(0, arr.length - 1)];

    const header = [
        "// compiled preview • scanner demo",
        "/* generated for visual effect – not executed */",
        "const SCAN_WIDTH = 8;",
        "const FADE_ZONE = 35;",
        "const MAX_PARTICLES = 2500;",
        "const TRANSITION = 0.05;",
    ];

    const helpers = [
        "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
        "function lerp(a, b, t) { return a + (b - a) * t; }",
        "const now = () => performance.now();",
        "function rng(min, max) { return Math.random() * (max - min) + min; }",
    ];

    const particleBlock = (idx: number) => [
        `class Particle${idx} {`,
        "  constructor(x, y, vx, vy, r, a) {",
        "    this.x = x; this.y = y;",
        "    this.vx = vx; this.vy = vy;",
        "    this.r = r; this.a = a;",
        "  }",
        "  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
        "}",
    ];

    const scannerBlock = [
        "const scanner = {",
        "  x: Math.floor(window.innerWidth / 2),",
        "  width: SCAN_WIDTH,",
        "  glow: 3.5,",
        "};",
        "",
        "function drawParticle(ctx, p) {",
        "  ctx.globalAlpha = clamp(p.a, 0, 1);",
        "  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);",
        "}",
    ];

    const loopBlock = [
        "function tick(t) {",
        "  // requestAnimationFrame(tick);",
        "  const dt = 0.016;",
        "  // update & render",
        "}",
    ];

    const misc = [
        "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
        "const bounds = { w: window.innerWidth, h: 300 };",
        "const gradient = document.createElement('canvas');",
        "const ctx = gradient.getContext('2d');",
        "ctx.globalCompositeOperation = 'lighter';",
        "// ascii overlay is masked with a 3-phase gradient",
    ];

    const library: string[] = [];
    header.forEach((l) => library.push(l));
    helpers.forEach((l) => library.push(l));
    for (let b = 0; b < 3; b++)
        particleBlock(b).forEach((l) => library.push(l));
    scannerBlock.forEach((l) => library.push(l));
    loopBlock.forEach((l) => library.push(l));
    misc.forEach((l) => library.push(l));

    // Popunjavanje
    for (let i = 0; i < 40; i++) {
        const n1 = randInt(1, 9);
        const n2 = randInt(10, 99);
        library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`);
    }
    for (let i = 0; i < 20; i++) {
        library.push(
            `if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`,
        );
    }

    let flow = library.join(" ");
    flow = flow.replace(/\s+/g, " ").trim();
    const totalChars = width * height;

    while (flow.length < totalChars + width) {
        const extra = pick(library).replace(/\s+/g, " ").trim();
        flow += " " + extra;
    }

    let out = "";
    let offset = 0;
    for (let row = 0; row < height; row++) {
        let line = flow.slice(offset, offset + width);
        if (line.length < width) line = line + " ".repeat(width - line.length);
        out += line + (row < height - 1 ? "\n" : "");
        offset += width;
    }
    return out;
};

// --- Component: Scanner Foreground Particles ---
const ScannerCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const spriteSize = 32;
        const spriteCanvas = document.createElement("canvas");
        spriteCanvas.width = spriteSize;
        spriteCanvas.height = spriteSize;
        const spriteCtx = spriteCanvas.getContext("2d");
        if (spriteCtx) {
            const half = spriteSize / 2;
            const gradient = spriteCtx.createRadialGradient(
                half,
                half,
                0,
                half,
                half,
                half,
            );
            gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
            gradient.addColorStop(0.2, "rgba(34, 211, 238, 0.8)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            spriteCtx.fillStyle = gradient;
            spriteCtx.fillRect(0, 0, spriteSize, spriteSize);
        }
        const particles: any[] = [];
        const createParticle = () => {
            const centerX = width / 2;
            const centerY = height / 2;
            const goRight = Math.random() > 0.1;
            const speed = Math.random() * 5 + 2;
            const yOffset = (Math.random() - 0.5) * SCANNER_HEIGHT;
            return {
                x: centerX + (Math.random() - 0.5) * 4,
                y: centerY + yOffset,
                vx: goRight ? speed : -speed * 0.5,
                vy: (Math.random() - 0.5) * 1,
                life: Math.random() * 0.8 + 0.2,
                size: Math.random() * 15 + 5,
                decay: Math.random() * 0.02 + 0.01,
            };
        };
        for (let i = 0; i < 400; i++) {
            const p = createParticle();
            p.x +=
                Math.random() > 0.1 ? Math.random() * 100 : -Math.random() * 20;
            particles.push(p);
        }
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = "lighter";
            const centerX = width / 2;
            const centerY = height / 2;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.life <= 0 || p.x < centerX - 100 || p.x > width) {
                    Object.assign(p, createParticle());
                }
                ctx.globalAlpha = p.life * 0.8;
                ctx.drawImage(
                    spriteCanvas,
                    p.x - p.size / 2,
                    p.y - p.size / 2,
                    p.size,
                    p.size,
                );
            }
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(
                centerX - 15,
                centerY - SCANNER_HEIGHT / 2,
                30,
                SCANNER_HEIGHT,
            );
            requestAnimationFrame(render);
        };
        const animId = requestAnimationFrame(render);
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <canvas
            ref={canvasRef}
            className='absolute inset-0 z-30 pointer-events-none'
        />
    );
};

// --- Component: Single Card ---
const CardItem = ({
    data,
    setRef,
}: {
    data: CardData;
    setRef: (el: HTMLDivElement | null) => void;
}) => {
    const codeContent = useMemo(() => generateCode(48, 20), []);

    return (
        <div
            ref={setRef}
            className='absolute top-0 left-0 h-60 rounded-2xl will-change-transform'
            style={{ width: CARD_WIDTH }}>
            {/* LAYER 1: Code (Revealed by Scanner) */}
            <div
                className='absolute inset-0 bg-black border border-cyan-500/50 rounded-2xl overflow-hidden z-10'
                style={{
                    clipPath: "inset(0 calc(100% - var(--clip-left, 0%)) 0 0)",
                }}>
                <div className='absolute inset-0 p-4 font-mono text-[10px] leading-3 text-cyan-500/60 whitespace-pre break-all select-none opacity-80 overflow-hidden'>
                    {codeContent}
                </div>
            </div>

            {/* LAYER 2: UI Card (Normal View) */}
            <div
                className={`card-texture ${data.styleClass} absolute inset-0 z-20`}
                style={
                    {
                        // CSS varijabla za pozadinu, override defaultnog gradijenta
                        "--card-bg": data.gradient,
                        "clipPath": "inset(0 0 0 var(--clip-right, 0%))",
                        "fontFamily": data.font,
                    } as React.CSSProperties
                }>
                {/* Sadržaj kartice - mora biti z-10 da bude iznad teksture */}
                <div className='relative z-10 flex flex-col h-full justify-between p-6 text-white h-full'>
                    <div className='flex justify-between items-start'>
                        <div className='p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-inner'>
                            {/* Renderiramo ikonu malo veću */}
                            {React.cloneElement(
                                data.icon as React.ReactElement,
                            )}
                        </div>
                        {/* Ukrasni element */}
                        <div className='flex gap-1'>
                            <div className='w-2 h-2 rounded-full bg-white/50' />
                            <div className='w-2 h-2 rounded-full bg-white/30' />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <h2 className='text-3xl font-bold tracking-tight mb-2 drop-shadow-lg'>
                            High Fashion Code!
                        </h2>
                        <p className='text-sm font-medium opacity-90 leading-snug drop-shadow-md text-balance'>
                            Our code culture is <i>haute couture </i> –
                            meticulously crafted, uniquely styled, and always
                            pushing the boundaries of creativity.
                        </p>
                    </div>

                    <div className='flex gap-3 mt-4'>
                        <button className='flex-1 bg-white text-black py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg'>
                            Very cute!
                        </button>
                        <button className='flex-1 bg-black/30 backdrop-blur-md border border-white/40 text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-black/50 transition-colors'>
                            I prefer ASCII.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helpers for Random Generation ---
const icons = [
    <Activity />,
    <Aperture />,
    <Archive />,
    <Award />,
    <Zap />,
    <Hexagon />,
    <Triangle />,
    <Circle />,
    <Star />,
    <Heart />,
    <Droplet />,
    <Flame />,
    <Sun />,
    <Moon />,
    <Cloud />,
    <Music />,
    <Video />,
    <Image />,
    <Box />,
    <Layers />,
    <Anchor />,
    <Feather />,
    <Key />,
    <Umbrella />,
    <Smartphone />,
    <Monitor />,
    <Headphones />,
    <Camera />,
    <Watch />,
    <Gift />,
];

const fonts = [
    "'Roboto', sans-serif",
    "'Playfair Display', serif",
    "'Montserrat', sans-serif",
    "'Courier New', monospace",
    "'Lato', sans-serif",
    "'Oswald', sans-serif",
    "'Raleway', sans-serif",
    "ui-serif, Georgia, serif",
];

// Generira gradijent koristeći dvije nasumične boje iz naše konfigurirane liste
const getRandomGradient = () => {
    const color1 =
        GRADIENT_COLORS[Math.floor(Math.random() * GRADIENT_COLORS.length)];
    let color2 =
        GRADIENT_COLORS[Math.floor(Math.random() * GRADIENT_COLORS.length)];

    // Osiguraj da su boje različite kako bi gradijent bio vidljiv
    while (color1 === color2) {
        color2 =
            GRADIENT_COLORS[Math.floor(Math.random() * GRADIENT_COLORS.length)];
    }

    return `linear-gradient(135deg, ${color1}, ${color2})`;
};

// --- Main Application Component ---
export default function CardScanner() {
    const SPEED = 50;
    const DIRECTION = 1;

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollPosRef = useRef(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastTimeRef = useRef<number>(0);

    // Generiramo 20 jedinstvenih kartica
    const generatedCards: CardData[] = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            // style1 do style20 ciklički, ali s nasumičnim pomakom da nije predvidljivo
            styleClass: `style${(i % 20) + 1}`,
            gradient: getRandomGradient(),
            icon: icons[Math.floor(Math.random() * icons.length)],
            font: fonts[Math.floor(Math.random() * fonts.length)],
        }));
    }, []);

    // Umnožimo ih za infinite scroll efekt
    const displayCards = [
        ...generatedCards,
        ...generatedCards,
        ...generatedCards,
    ];
    const totalWidth = displayCards.length * ITEM_WIDTH;

    useAnimationFrame((time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const delta = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        scrollPosRef.current += SPEED * DIRECTION * delta;

        if (scrollPosRef.current < -totalWidth / 2) {
            scrollPosRef.current += generatedCards.length * ITEM_WIDTH;
        } else if (scrollPosRef.current > 0) {
            scrollPosRef.current -= generatedCards.length * ITEM_WIDTH;
        }

        const viewportWidth = window.innerWidth;
        const scannerCenter = viewportWidth / 2;
        const scannerLeftBound = scannerCenter - SCANNER_WIDTH / 2;
        const scannerRightBound = scannerCenter + SCANNER_WIDTH / 2;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const xPos = scrollPosRef.current + index * ITEM_WIDTH;
            card.style.transform = `translateX(${xPos}px)`;

            const cardRect = {
                left: xPos,
                right: xPos + CARD_WIDTH,
                width: CARD_WIDTH,
            };

            if (
                cardRect.left < scannerRightBound &&
                cardRect.right > scannerLeftBound
            ) {
                const intersectLeft = Math.max(
                    scannerLeftBound - cardRect.left,
                    0,
                );
                const intersectRight = Math.min(
                    scannerRightBound - cardRect.left,
                    cardRect.width,
                );

                const normalClipPct = (intersectLeft / cardRect.width) * 100;
                const asciiClipPct = (intersectRight / cardRect.width) * 100;

                card.style.setProperty("--clip-right", `${normalClipPct}%`);
                card.style.setProperty("--clip-left", `${asciiClipPct}%`);
                card.style.filter =
                    "brightness(1.1) drop-shadow(0 0 15px rgba(6,182,212,0.3))";
            } else {
                if (cardRect.right < scannerLeftBound) {
                    card.style.setProperty("--clip-right", `100%`);
                    card.style.setProperty("--clip-left", `100%`);
                } else if (cardRect.left > scannerRightBound) {
                    card.style.setProperty("--clip-right", `0%`);
                    card.style.setProperty("--clip-left", `0%`);
                }
                card.style.filter = "none";
            }
        });
    });

    return (
        <div className='relative w-full h-screen bg-transparent overflow-hidden font-sans text-slate-300 selection:bg-cyan-500 selection:text-black'>
            {/* Inject Styles */}
            <style>{styles}</style>

            {/* UI Status */}
            <div className='absolute top-8 right-8 z-50 px-6 py-3 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full font-mono text-sm'>
                VELOCITY:{" "}
                <span className='text-cyan-400 font-bold text-lg'>{SPEED}</span>{" "}
                PX/S
            </div>

            {/* 2. Kartice */}
            <div
                ref={containerRef}
                className='relative w-full h-full flex items-center z-10'>
                <div className='relative w-full h-[240px]'>
                    {displayCards.map((card, index) => (
                        <CardItem
                            key={`${card.id}-${index}`}
                            data={card}
                            setRef={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>
            </div>

            {/* 3. Čestice Skenera */}
            <ScannerCanvas />

            {/* 4. Skener Linija (Overlay) */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center'>
                <div
                    className='w-[2px] bg-cyan-400 shadow-[0_0_15px_1px_rgba(34,211,238,0.8)] rounded-full relative'
                    style={{ height: SCANNER_HEIGHT }}>
                    <div className='absolute left-1/2 -translate-x-1/2 w-8 h-4 bg-cyan-400/50 blur-lg rounded-full animate-pulse top-1/2 -translate-y-1/2' />
                </div>

                <div className='mt-4 font-mono text-[10px] tracking-[0.3em] text-cyan-500 animate-pulse bg-black/50 px-2 py-1 rounded'>
                    SCANNING
                </div>
            </div>

            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/30 tracking-widest uppercase z-10'>
                System Active • Security Level 4
            </div>
        </div>
    );
}
