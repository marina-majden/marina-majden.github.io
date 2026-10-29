import React, { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Sparkles, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { showToast } from "./ToastHub";
import "./SwitchCardNeon.css";

// -------------------------------------------------------------
// Mathematical Orb Generators from three.html
// -------------------------------------------------------------
function normalizePoints(
  points: THREE.Vector3[],
  size: number,
): THREE.Vector3[] {
  if (points.length === 0) return points;
  const box = new THREE.Box3().setFromPoints(points);
  if (box.isEmpty() || !isFinite(box.max.x) || !isFinite(box.min.x)) {
    points.forEach((p) => p.set(0, 0, 0));
    return points;
  }
  const center = box.getCenter(new THREE.Vector3());
  const boxSize = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
  const scale = maxDim > 1e-6 ? size / maxDim : 1.0;
  points.forEach((p) => {
    if (isFinite(p.x) && isFinite(p.y) && isFinite(p.z)) {
      p.sub(center).multiplyScalar(scale);
    } else {
      p.set(0, 0, 0);
    }
  });
  return points;
}

// Orb 1: Torus Knot with twists
function createTorusKnotPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const radius = 18,
    tube = 6,
    p = 5,
    q = 4,
    twists = 2;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * q;
    const angle = (p / q) * t;
    const R = radius + tube * Math.cos(t);
    const baseX = R * Math.cos(angle);
    const baseY = R * Math.sin(angle);
    const baseZ = tube * Math.sin(t);
    const twistAngle = twists * t;
    const twistRadius = 1.5;
    const normal = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    const tangent =
      R > 1e-6
        ? new THREE.Vector3(
            -R * Math.sin(angle),
            R * Math.cos(angle),
            tube * Math.cos(t),
          ).normalize()
        : new THREE.Vector3(0, 0, 1);
    const binormal = new THREE.Vector3()
      .crossVectors(tangent, normal)
      .normalize();
    const x =
      baseX +
      twistRadius *
        (binormal.x * Math.cos(twistAngle) + normal.x * Math.sin(twistAngle));
    const y =
      baseY +
      twistRadius *
        (binormal.y * Math.cos(twistAngle) + normal.y * Math.sin(twistAngle));
    const z =
      baseZ +
      twistRadius *
        (binormal.z * Math.cos(twistAngle) + normal.z * Math.sin(twistAngle));
    points.push(new THREE.Vector3(x, y, z));
  }
  return normalizePoints(points, 28);
}

// Orb 2: Multi-elliptical planetary orbits
function createEllipticalOrbitPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const numOrbits = 8;
  const particlesPerOrbit = Math.floor(count / numOrbits);
  const baseRadius = 6,
    orbitSpacing = 3.5;
  for (let orbit = 0; orbit < numOrbits; orbit++) {
    const eccentricity = 0.5 + (orbit / numOrbits) * 0.42;
    const a =
      baseRadius + orbit * orbitSpacing * (1 + (orbit / numOrbits) * 0.5);
    const b = a * Math.sqrt(1 - Math.min(eccentricity, 0.999) ** 2);
    const tiltX = (((orbit * 1.618) % 1) - 0.5) * Math.PI;
    const tiltY = (((orbit * 2.718) % 1) - 0.5) * Math.PI;
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(tiltX, tiltY, orbit * 0.65),
    );
    for (let i = 0; i < particlesPerOrbit; i++) {
      const theta = (i / particlesPerOrbit) * Math.PI * 2;
      const x = a * Math.cos(theta);
      const y = b * Math.sin(theta);
      const zWave = 1.5 * Math.sin(theta * 3 + orbit * 0.5);
      const point = new THREE.Vector3(x, y, zWave).applyQuaternion(rotation);
      points.push(point);
    }
  }
  while (points.length < count) {
    points.push(points[points.length % numOrbits].clone());
  }
  return normalizePoints(points, 30);
}

// Orb 3: Spherical Harmonic Wave
function createWaveOrbitPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const baseRadius = 20,
    rAmp1 = 6,
    rFreq1 = 3,
    rAmp2 = 2.5,
    rFreq2 = 7;
  const zAmp1 = 5,
    zFreq1 = 4,
    zAmp2 = 2,
    zFreq2 = 11;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const currentRadius =
      baseRadius +
      rAmp1 * Math.sin(rFreq1 * t) +
      rAmp2 * Math.cos(rFreq2 * t + Math.PI / 3);
    const x = currentRadius * Math.cos(t);
    const y = currentRadius * Math.sin(t);
    const z =
      zAmp1 * Math.sin(zFreq1 * t + Math.PI / 5) + zAmp2 * Math.cos(zFreq2 * t);
    points.push(new THREE.Vector3(x, y, z));
  }
  return normalizePoints(points, 26);
}

// Orb 4: Cosmic Web / Constellation Filaments
function createCosmicWebPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const numStrands = 16;
  const particlesPerStrand = Math.floor(count / numStrands);
  const scale = 54;
  for (let i = 0; i < numStrands; i++) {
    const angleA = (i / numStrands) * Math.PI * 2;
    const angleB = ((i + 7) / numStrands) * Math.PI * 2;
    const start = new THREE.Vector3(
      Math.cos(angleA) * scale * 0.5,
      Math.sin(angleA) * scale * 0.5,
      (Math.sin(i * 1.5) - 0.5) * scale * 0.35,
    );
    const end = new THREE.Vector3(
      Math.cos(angleB) * scale * 0.5,
      Math.sin(angleB) * scale * 0.5,
      (Math.cos(i * 1.5) - 0.5) * scale * 0.35,
    );
    const mid = start.clone().lerp(end, 0.5);
    const offset = new THREE.Vector3(
      Math.sin(i * 2.3) * (scale * 0.28),
      Math.cos(i * 1.7) * (scale * 0.28),
      Math.sin(i * 3.1) * (scale * 0.28),
    );
    const curve = new THREE.QuadraticBezierCurve3(start, mid.add(offset), end);
    const strandPoints = curve.getPoints(particlesPerStrand - 1);
    points.push(...strandPoints);
  }
  while (points.length < count) {
    points.push(points[points.length % numStrands].clone());
  }
  return normalizePoints(points, 30);
}

const ORB_PATTERNS = [
  createTorusKnotPoints,
  createEllipticalOrbitPoints,
  createWaveOrbitPoints,
  createCosmicWebPoints,
];

// -------------------------------------------------------------
// Portal Metadata & Palettes (Adapted from three.html & site design)
// -------------------------------------------------------------
export interface PortalDimension {
  id: string;
  code: string;
  nameHr: string;
  nameEn: string;
  descHr: string;
  descEn: string;
  colorTag: string;
  accentName: string;
  glow: [string, string, string, string];
  auraGradient: string;
  palette: THREE.Color[];
}

const PORTAL_DIMENSIONS: PortalDimension[] = [
  {
    id: "torus",
    code: "PORTAL // 01",
    nameHr: "Toroidni Singularitet",
    nameEn: "Torus Singularity",
    descHr: "Kozmički toroidni čvor s 5-strukim uvijanjem prostora.",
    descEn: "Cosmic toroidal knot with 5-fold space-time twist.",
    colorTag: "#00f5ff",
    accentName: "CYAN AZURE",
    glow: [
      "rgba(0, 245, 255, 0.45)",
      "rgba(0, 180, 216, 0.45)",
      "rgba(0, 119, 255, 0.35)",
      "rgba(173, 232, 244, 0.35)",
    ],
    auraGradient:
      "linear-gradient(125deg, #00f5ff, #00b4d8 38%, #0077ff 68%, #00509e)",
    palette: [
      new THREE.Color(0x00f5ff),
      new THREE.Color(0x00b4d8),
      new THREE.Color(0x0077ff),
      new THREE.Color(0xade8f4),
    ],
  },
  {
    id: "orbitals",
    code: "PORTAL // 02",
    nameHr: "Nebeski Žiroskop",
    nameEn: "Celestial Gyroscope",
    descHr: "8 nagnutih eliptičnih ravnina u harmonijskoj rezonanci.",
    descEn: "8 inclined elliptical planes in harmonic resonance.",
    colorTag: "#bf00ff",
    accentName: "SYNTH VIOLET",
    glow: [
      "rgba(191, 0, 255, 0.45)",
      "rgba(255, 0, 170, 0.45)",
      "rgba(74, 0, 224, 0.35)",
      "rgba(193, 102, 216, 0.35)",
    ],
    auraGradient:
      "linear-gradient(125deg, #bf00ff, #8e2de2 38%, #ff00aa 68%, #4a00e0)",
    palette: [
      new THREE.Color(0xbf00ff),
      new THREE.Color(0x8e2de2),
      new THREE.Color(0xff00aa),
      new THREE.Color(0xc166d8),
    ],
  },
  {
    id: "wave",
    code: "PORTAL // 03",
    nameHr: "Harmonijska Sfera",
    nameEn: "Harmonic Resonance",
    descHr: "Pulsirajuća valna sfera vođena trigonometrijskom harmonijom.",
    descEn: "Pulsating wave sphere driven by trigonometric harmonics.",
    colorTag: "#ff00aa",
    accentName: "LOVE PINK",
    glow: [
      "rgba(255, 0, 170, 0.45)",
      "rgba(255, 107, 107, 0.45)",
      "rgba(255, 184, 184, 0.35)",
      "rgba(255, 241, 241, 0.35)",
    ],
    auraGradient:
      "linear-gradient(125deg, #ff00aa, #ff6b6b 38%, #ff758c 68%, #ff1361)",
    palette: [
      new THREE.Color(0xff00aa),
      new THREE.Color(0xff6b6b),
      new THREE.Color(0xffb8b8),
      new THREE.Color(0xffffff),
    ],
  },
  {
    id: "web",
    code: "PORTAL // 04",
    nameHr: "Kvantna Konstelacija",
    nameEn: "Quantum Constellation",
    descHr: "16 isprepletenih niti kozmičke energetske mreže.",
    descEn: "16 interwoven filaments of the cosmic quantum web.",
    colorTag: "#00ff88",
    accentName: "EMERALD MATRIX",
    glow: [
      "rgba(0, 255, 136, 0.45)",
      "rgba(0, 245, 255, 0.45)",
      "rgba(85, 166, 48, 0.35)",
      "rgba(170, 204, 0, 0.35)",
    ],
    auraGradient:
      "linear-gradient(125deg, #00ff88, #00d26a 38%, #00f5ff 68%, #aacc00)",
    palette: [
      new THREE.Color(0x00ff88),
      new THREE.Color(0x00f5ff),
      new THREE.Color(0x55a630),
      new THREE.Color(0xaacc00),
    ],
  },
];

export interface SwitchCardNeonProps {
  className?: string;
  initialPortalIndex?: number;
  onPortalChange?: (index: number) => void;
}

export const SwitchCardNeon: React.FC<SwitchCardNeonProps> = ({
  className = "",
  initialPortalIndex = 0,
  onPortalChange,
}) => {
  const [portalIndex, setPortalIndex] = useState<number>(initialPortalIndex);
  const [warpPulseKey, setWarpPulseKey] = useState<number>(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerTransitionRef = useRef<((nextIdx: number) => void) | null>(null);

  const { lang } = useLanguage();
  const isCroatian = lang === "hr";

  const activePortal = PORTAL_DIMENSIONS[portalIndex];

  // 3D perspective mouse tilt effect (inspired by Card3D in Mission)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    card.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
  };

  // Warp to next or specific portal
  const warpToPortal = useCallback(
    (targetIndex?: number) => {
      const nextIdx =
        targetIndex !== undefined
          ? targetIndex
          : (portalIndex + 1) % PORTAL_DIMENSIONS.length;
      if (nextIdx === portalIndex && targetIndex !== undefined) return;

      if (triggerTransitionRef.current) {
        triggerTransitionRef.current(nextIdx);
      }
      setPortalIndex(nextIdx);
      setWarpPulseKey((prev) => prev + 1);

      if (onPortalChange) onPortalChange(nextIdx);

      const target = PORTAL_DIMENSIONS[nextIdx];
      const name = isCroatian ? target.nameHr : target.nameEn;
      showToast(`${target.code}: ${name} ✦`, "star");
    },
    [portalIndex, isCroatian, onPortalChange],
  );

  // -----------------------------------------------------------
  // Three.js Orb Canvas Setup & Particle Morphing Engine
  // -----------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const PARTICLE_COUNT = 5500;
    const STAR_COUNT = 450;
    const TRANSITION_SPEED = 0.024; // ~40 frames smooth morph

    let animationFrameId: number;
    let isTransitioning = false;
    let transitionProgress = 0;
    let currentPatternIdx = portalIndex;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050714, 0.012);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Remove any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Cosmic Ambient Star Dust
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 60 + Math.random() * 50;
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color().setHSL(
        0.55 + Math.random() * 0.35,
        0.7,
        0.6,
      );
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    starsGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starsMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starsMesh = new THREE.Points(starsGeo, starsMat);
    scene.add(starsMesh);

    // 3. Central Morphing Particle Orb System (from three.html)
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT);

    const initialPoints = ORB_PATTERNS[currentPatternIdx](PARTICLE_COUNT);
    const initialPalette = PORTAL_DIMENSIONS[currentPatternIdx].palette;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      if (initialPoints[i]) {
        positions[idx] = initialPoints[i].x;
        positions[idx + 1] = initialPoints[i].y;
        positions[idx + 2] = initialPoints[i].z;
      }
      const c = initialPalette[i % initialPalette.length];
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;

      sizes[i] = 0.8 + Math.random() * 2.8;
      randoms[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("random", new THREE.BufferAttribute(randoms, 1));

    // Custom point shader with subtle time wave displacement
    const particleMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute float random;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 pos = position;
          float angle = time * 0.4 + random;
          float displacement = 0.28 + sin(random * 2.0) * 0.14;
          pos.x += sin(angle + pos.y * 0.12) * displacement;
          pos.y += cos(angle + pos.z * 0.12) * displacement;
          pos.z += sin(angle + pos.x * 0.12) * displacement;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float pulse = 0.95 + 0.08 * sin(time * 1.6 + random);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * pulse * (240.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.08, 0.5, dist);
          gl_FragColor = vec4(vColor * 1.35, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interpolation Buffers
    const fromPositions = new Float32Array(positions);
    const toPositions = new Float32Array(positions);
    const fromColors = new Float32Array(colors);
    const toColors = new Float32Array(colors);

    // 4. Trigger Morph Transition to next orb
    triggerTransitionRef.current = (nextIdx: number) => {
      isTransitioning = true;
      transitionProgress = 0;
      currentPatternIdx = nextIdx;

      fromPositions.set(particleGeo.attributes.position.array);
      fromColors.set(particleGeo.attributes.color.array);

      const nextPoints = ORB_PATTERNS[nextIdx](PARTICLE_COUNT);
      const nextPalette = PORTAL_DIMENSIONS[nextIdx].palette;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        if (nextPoints[i]) {
          toPositions[idx] = nextPoints[i].x;
          toPositions[idx + 1] = nextPoints[i].y;
          toPositions[idx + 2] = nextPoints[i].z;
        } else {
          toPositions[idx] = fromPositions[idx];
          toPositions[idx + 1] = fromPositions[idx + 1];
          toPositions[idx + 2] = fromPositions[idx + 2];
        }

        const c = nextPalette[i % nextPalette.length];
        toColors[idx] = c.r;
        toColors[idx + 1] = c.g;
        toColors[idx + 2] = c.b;
      }
    };

    // 5. Animation & Morph Loop
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      const elapsedTime = clock.getElapsedTime();

      // Particle Position & Color Morphing
      if (isTransitioning) {
        transitionProgress += TRANSITION_SPEED;
        const eased =
          0.5 - Math.cos(Math.min(transitionProgress, 1) * Math.PI) * 0.5;

        const posAttr = particleGeo.attributes.position.array as Float32Array;
        const colAttr = particleGeo.attributes.color.array as Float32Array;

        for (let i = 0; i < posAttr.length; i++) {
          posAttr[i] =
            fromPositions[i] + (toPositions[i] - fromPositions[i]) * eased;
        }
        for (let i = 0; i < colAttr.length; i++) {
          colAttr[i] = fromColors[i] + (toColors[i] - fromColors[i]) * eased;
        }

        particleGeo.attributes.position.needsUpdate = true;
        particleGeo.attributes.color.needsUpdate = true;

        if (transitionProgress >= 1) {
          isTransitioning = false;
        }
      }

      // Orbital Camera Glide with warp pulsation
      const warpZoom = isTransitioning
        ? 12 * Math.sin(Math.min(transitionProgress, 1) * Math.PI)
        : 0;
      const orbitDist = 45 - warpZoom;

      camera.position.x = Math.sin(elapsedTime * 0.1) * orbitDist;
      camera.position.z = Math.cos(elapsedTime * 0.1) * orbitDist;
      camera.position.y = Math.sin(elapsedTime * 0.08) * 8;
      camera.lookAt(0, 0, 0);

      // Particle shader pulse
      if (particleMat.uniforms.time) {
        particleMat.uniforms.time.value = elapsedTime;
      }

      // Gentle starfield drift
      starsMesh.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 6. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      particleGeo.dispose();
      particleMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`switch-stage-3d w-full max-w-xl lg:max-w-2xl mx-auto py-6 px-3 select-none ${className}`}
    >
      {/* 3D Perspective Card Shell */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => warpToPortal()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            warpToPortal();
          }
        }}
        title={
          isCroatian
            ? "Kliknite za prijelaz u sljedeći portal"
            : "Click to warp to next portal"
        }
        className="group relative w-full rounded-[30px] border cursor-pointer overflow-hidden transition-all duration-700 will-change-transform"
        style={{
          // Multi-layer stacked shadow matching active orb's chromatic colors (GlowingCards Option 1)
          boxShadow: `
            -0.45rem -0.45rem 1.8rem ${activePortal.glow[0]},
             0.45rem  0.45rem 1.8rem ${activePortal.glow[1]},
            -0.45rem  0.45rem 2.0rem ${activePortal.glow[2]},
             0.45rem -0.45rem 2.0rem ${activePortal.glow[3]}
          `,
          borderColor: activePortal.colorTag,
          background: "rgba(8, 11, 24, 0.92)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        {/* Scaled Blurred Gradient Aura (GlowingCards Option 2) */}
        <div
          className="absolute inset-0 rounded-[inherit] scale-[1.08] blur-[clamp(1.4rem,4.5vw,2.4rem)] -z-10 pointer-events-none transition-all duration-700 animate-portal-aura"
          style={{
            background: activePortal.auraGradient,
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Shimmer Line */}
        <div
          className="absolute inset-x-8 top-0 h-px pointer-events-none z-20 transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${activePortal.colorTag}, #ffffff, ${activePortal.colorTag}, transparent)`,
            opacity: 0.95,
          }}
        />

        {/* HUD Viewfinder Corner Brackets */}
        <div
          className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none z-20 transition-colors duration-500"
          style={{ borderColor: activePortal.colorTag }}
        />
        <div
          className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none z-20 transition-colors duration-500"
          style={{ borderColor: activePortal.colorTag }}
        />
        <div
          className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none z-20 transition-colors duration-500"
          style={{ borderColor: activePortal.colorTag }}
        />
        <div
          className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none z-20 transition-colors duration-500"
          style={{ borderColor: activePortal.colorTag }}
        />

        {/* Warp Ripple Shockwave when user clicks */}
        <div
          key={warpPulseKey}
          className="absolute inset-0 rounded-[inherit] border-2 border-white pointer-events-none z-25 animate-warp-ripple opacity-0"
          style={{ borderColor: activePortal.colorTag }}
        />

        {/* Portal Stage Content */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between min-h-[460px] sm:min-h-[500px]">
          {/* Header Row: Telemetry & Portal Dimension Dots */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-slate-200">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: activePortal.colorTag }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{
                    backgroundColor: activePortal.colorTag,
                    color: activePortal.colorTag,
                  }}
                />
              </span>
              <span
                className="font-bold tracking-widest"
                style={{ color: activePortal.colorTag }}
              >
                {activePortal.code}
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">
                {activePortal.accentName}
              </span>
            </div>

            {/* Portal Dimension Quick-Selector Dots */}
            <div
              className="flex items-center gap-2 p-1.5 rounded-full border border-white/15 bg-black/45 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {PORTAL_DIMENSIONS.map((dim, idx) => {
                const isActive = idx === portalIndex;
                return (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => warpToPortal(idx)}
                    title={isCroatian ? dim.nameHr : dim.nameEn}
                    className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-6 shadow-[0_0_10px_currentColor]"
                        : "w-3 opacity-40 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: dim.colorTag,
                      color: dim.colorTag,
                    }}
                    aria-label={`Switch to ${dim.nameEn}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Central 3D Three.js Particle Portal Area */}
          <div className="relative my-auto w-full h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden">
            {/* The Live WebGL Canvas Mount */}
            <div
              ref={mountRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Decorative Cybernetic Portal Reticle Overlay */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full select-none"
              viewBox="0 0 500 300"
            >
              {/* Outer Gyro Ring */}
              <circle
                cx="250"
                cy="150"
                r="118"
                fill="none"
                stroke={activePortal.colorTag}
                strokeWidth="1"
                strokeOpacity="0.25"
                strokeDasharray="4 6"
                className="animate-portal-spin-cw"
              />
              {/* Inner Counter Ring */}
              <circle
                cx="250"
                cy="150"
                r="95"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeOpacity="0.18"
                strokeDasharray="6 8"
                className="animate-portal-spin-ccw"
              />
              {/* Crosshair Viewfinder Coordinates */}
              <g
                stroke={activePortal.colorTag}
                strokeWidth="1"
                strokeOpacity="0.4"
              >
                <line x1="250" y1="18" x2="250" y2="34" />
                <line x1="250" y1="266" x2="250" y2="282" />
                <line x1="118" y1="150" x2="134" y2="150" />
                <line x1="366" y1="150" x2="382" y2="150" />
              </g>
            </svg>

            {/* Hover Tooltip Hint */}
            <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none transition-transform duration-300 group-hover:scale-105">
              <span
                className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest px-3 py-1 rounded-full border bg-black/70 shadow-lg backdrop-blur-md"
                style={{
                  borderColor: `${activePortal.colorTag}60`,
                  color: activePortal.colorTag,
                }}
              >
                <Sparkles size={11} className="animate-spin" />
                {isCroatian
                  ? "KLIKNITE ZA PRIJELAZ PORTALA"
                  : "CLICK TO WARP PORTAL"}
              </span>
            </div>
          </div>

          {/* Footer Telemetry & Manifesto */}
          <div className="pt-2 text-center">
            <h3 className="text-xl sm:text-2xl font-headings font-extrabold text-white mb-1.5 tracking-tight leading-snug">
              {isCroatian ? activePortal.nameHr : activePortal.nameEn}
            </h3>

            <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-2">
              {isCroatian ? activePortal.descHr : activePortal.descEn}
            </p>

            {/* Bottom Status Ticker */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-slate-400 font-mono text-[10px]">
              <div className="flex items-center gap-1.5">
                <Terminal size={11} style={{ color: activePortal.colorTag }} />
                <span>
                  {isCroatian
                    ? `ČESTICE: 5,500 // MORPH_SPHERE`
                    : `PARTICLES: 5,500 // MORPH_SPHERE`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline text-slate-400">
                  {isCroatian ? "DIMENZIJA" : "DIMENSION"}
                </span>
                <span
                  className="font-bold uppercase tracking-wider"
                  style={{ color: activePortal.colorTag }}
                >
                  {portalIndex + 1} / {PORTAL_DIMENSIONS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchCardNeon;
