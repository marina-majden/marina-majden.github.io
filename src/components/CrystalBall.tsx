// @ts-nocheck
import React, { useEffect, useRef } from "react";

interface CrystalBallProps {
  sceneOnly?: boolean;
  className?: string;
}

export default function CrystalBall({
  sceneOnly = false,
  className = "",
}: CrystalBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventController = new AbortController();
    let resizeObs = null;
    let animationLoopStarted = false;
    let rendererInstance = null;
    let disposed = false;

    const initHeroScene = async () => {
      const container = sceneOnly
        ? containerRef.current
        : document.getElementById("app");
      if (!container) return;

      try {
        const {
          THREE,
          EffectComposer,
          RenderPass,
          UnrealBloomPass,
          ShaderPass,
          FullScreenQuad,
        } =
          await import("https://fintar-hero.vercel.app/assets/fintar-three.4571dc8748a1.mjs");
        if (disposed) return;

        const viewportWidth = () =>
          sceneOnly ? container.clientWidth : window.innerWidth;
        const viewportHeight = () =>
          sceneOnly ? container.clientHeight : window.innerHeight;
        const themeColor = (name: string, fallback: string) =>
          getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim() || fallback;
        const themeColors = sceneOnly
          ? {
              cyan: themeColor("--color-neon-cyan", "#06e8e2"),
              blue: themeColor("--color-neon-blue", "#7376ef"),
              violet: themeColor("--color-neon-violet", "#ee33a4"),
              pink: themeColor("--color-neon-pink", "#0cb8e0"),
              green: themeColor("--color-neon-green", "#5b8eec"),
              yellow: themeColor("--color-neon-yellow", "#d53caa"),
            }
          : null;

        // ---------------------------------------------------------------
        // hero scene (Integrated from provided script)
        // ---------------------------------------------------------------
        const C = (hex) => {
          const color = new THREE.Color(hex);
          if (!themeColors) return color;
          const hsl = { h: 0, s: 0, l: 0 };
          color.getHSL(hsl);
          if (hsl.s < 0.08) return color;
          const role =
            hsl.h < 0.08 || hsl.h > 0.9
              ? "pink"
              : hsl.h < 0.18
                ? "yellow"
                : hsl.h < 0.38
                  ? "green"
                  : hsl.h < 0.5
                    ? "cyan"
                    : hsl.h < 0.66
                      ? "blue"
                      : "violet";
          const themed = new THREE.Color(themeColors[role]);
          const themedHsl = { h: 0, s: 0, l: 0 };
          themed.getHSL(themedHsl);
          return new THREE.Color().setHSL(themedHsl.h, hsl.s, hsl.l);
        };

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          });
          rendererInstance = renderer;
        } catch (e) {
          container.innerHTML =
            '<div class="fallback text-black p-4">WebGL is not available in this browser.</div>';
          throw e;
        }
        const MAX_DPR = 2;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
        renderer.setSize(viewportWidth(), viewportHeight(), false);
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        if (sceneOnly) {
          Object.assign(renderer.domElement.style, {
            position: "absolute",
            inset: "0",
            display: "block",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          });
        }

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const TIME_SCALE = reduceMotion ? 0.25 : 1;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          24,
          viewportWidth() / Math.max(viewportHeight(), 1),
          0.5,
          90,
        );
        scene.add(camera);

        const ORB = new THREE.Vector3(0, 0.98, 0);
        const LAYER_SOLID = 1;

        function makeNoiseTexture() {
          const size = 512;
          const rt = new THREE.WebGLRenderTarget(size, size, {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            minFilter: THREE.LinearMipmapLinearFilter,
            magFilter: THREE.LinearFilter,
            generateMipmaps: true,
            depthBuffer: false,
          });
          const mat = new THREE.ShaderMaterial({
            vertexShader: `
              varying vec2 vUv;
              void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
            `,
            fragmentShader: `
              precision highp float;
              varying vec2 vUv;
              vec2 hash2(vec2 p) {
                p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
                return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
              }
              float gnoise(vec2 p, float per) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
                float a = dot(hash2(mod(i, per)), f);
                float b = dot(hash2(mod(i + vec2(1.0, 0.0), per)), f - vec2(1.0, 0.0));
                float c = dot(hash2(mod(i + vec2(0.0, 1.0), per)), f - vec2(0.0, 1.0));
                float d = dot(hash2(mod(i + vec2(1.0), per)), f - vec2(1.0));
                return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
              }
              float fbm(vec2 uv, float per, float seed, bool billow) {
                float s = 0.0;
                float amp = 0.5;
                vec2 p = uv * per;
                for (int k = 0; k < 6; k++) {
                  float n = gnoise(p + seed, per);
                  s += amp * (billow ? abs(n) : n);
                  p *= 2.0;
                  per *= 2.0;
                  amp *= 0.5;
                }
                return s;
              }
              void main() {
                gl_FragColor = vec4(
                  0.5 + fbm(vUv, 4.0, 0.0, false) * 1.1,
                  0.5 + fbm(vUv, 4.0, 17.0, false) * 1.1,
                  0.5 + fbm(vUv, 5.0, 41.0, false) * 1.25,
                  clamp(fbm(vUv, 6.0, 73.0, true) * 1.9, 0.0, 1.0)
                );
              }
            `,
          });
          const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
          const bakeScene = new THREE.Scene();
          bakeScene.add(quad);
          renderer.setRenderTarget(rt);
          renderer.render(
            bakeScene,
            new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
          );
          renderer.setRenderTarget(null);
          quad.geometry.dispose();
          mat.dispose();
          return rt.texture;
        }

        const noiseTex = makeNoiseTexture();
        const depthRT = new THREE.WebGLRenderTarget(1, 1, {
          depthTexture: new THREE.DepthTexture(1, 1),
          depthBuffer: true,
        });
        const depthOnlyMat = new THREE.MeshBasicMaterial({ colorWrite: false });

        const shared = {
          uTime: { value: 0 },
          uPass: { value: 0 },
          uNoise: { value: noiseTex },
          uDepth: { value: depthRT.depthTexture },
          uNear: { value: camera.near },
          uDepthTexel: { value: new THREE.Vector2(1, 1) },
          uFar: { value: camera.far },
          uOrb: { value: ORB },
          uEnergy: { value: 0 },
          uPulseR: { value: 0 },
          uPulseA: { value: 0 },
          uGlowL: { value: C("#4a2878") },
          uGlowR: { value: C("#3a1a68") },
          uGlowTop: { value: C("#3d2a6a") },
        };

        const BB_VERT = `
          varying vec2 vUv;
          varying vec3 vWorld;
          varying vec4 vClip;
          varying float vViewZ;
          void main() {
            vUv = uv;
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            vec4 mv = viewMatrix * w;
            vViewZ = mv.z;
            vClip = projectionMatrix * mv;
            gl_Position = vClip;
          }
        `;

        const BB_FRAG_HEAD = `
          #include <packing>
          uniform float uTime;
          uniform float uPass;
          uniform float uEnergy;
          uniform sampler2D uNoise;
          uniform sampler2D uDepth;
          uniform vec2 uDepthTexel;
          uniform float uNear;
          uniform float uFar;
          uniform vec3 uOrb;
          uniform vec3 uGlowL;
          uniform vec3 uGlowR;
          uniform vec3 uGlowTop;
          varying vec2 vUv;
          varying vec3 vWorld;
          varying vec4 vClip;
          varying float vViewZ;
          float softDepth(float range) {
            vec2 suv = vClip.xy / vClip.w * 0.5 + 0.5;
            vec2 o = uDepthTexel * 0.75;
            float d = max(max(texture2D(uDepth, suv + vec2(-o.x, -o.y)).x, texture2D(uDepth, suv + vec2(o.x, -o.y)).x),
                          max(texture2D(uDepth, suv + vec2(-o.x, o.y)).x, texture2D(uDepth, suv + vec2(o.x, o.y)).x));
            float sceneZ = perspectiveDepthToViewZ(d, uNear, uFar);
            return clamp((vViewZ - sceneZ) / range, 0.0, 1.0);
          }
          vec3 orbGlowColor(vec3 d) {
            vec3 c = mix(uGlowL, uGlowR, smoothstep(-1.6, 1.6, d.x));
            return mix(c, uGlowTop, smoothstep(0.6, 2.6, d.y));
          }
        `;

        const BG_DIST = 60;
        const bgMat = new THREE.ShaderMaterial({
          depthWrite: false,
          depthTest: false,
          transparent: true,
          uniforms: {
            ...shared,
            uLeft: { value: C("#0d0b1a") },
            uMid: { value: C("#12102b") },
            uRight: { value: C("#0f0c24") },
            uBottom: { value: C("#0a0916") },
            uCloud: { value: C("#1a1538") },
            uCloudLit: { value: C("#221d44") },
            uAspect: { value: 1 },
            uResolution: { value: new THREE.Vector2(1, 1) },
            uShift: { value: new THREE.Vector2() },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform float uPass;
            uniform sampler2D uNoise;
            uniform vec3 uLeft;
            uniform vec3 uMid;
            uniform vec3 uRight;
            uniform vec3 uBottom;
            uniform vec3 uCloud;
            uniform vec3 uCloudLit;
            uniform float uAspect;
            uniform vec2 uResolution;
            uniform vec2 uShift;
            varying vec2 vUv;
            void main() {
              if (uPass > 0.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); return; }
              vec2 uv = gl_FragCoord.xy / uResolution;
              vec3 col = mix(uLeft, uMid, smoothstep(0.0, 0.35, uv.x));
              col = mix(col, uRight, smoothstep(0.55, 1.0, uv.x) * smoothstep(0.15, 0.75, uv.y));
              col = mix(col, uBottom, smoothstep(0.42, 0.0, uv.y) * (1.0 - smoothstep(0.45, 0.95, uv.x) * 0.6));
              vec2 p = vec2(uv.x * uAspect, uv.y) * 0.5 + uShift;
              float t = uTime * 0.004;
              vec2 w = texture2D(uNoise, p * 0.5 + vec2(t, 0.0)).rg - 0.5;
              float n = texture2D(uNoise, p + w * 0.7 + vec2(t * 1.5, t * 0.3)).b;
              float n2 = texture2D(uNoise, p * 2.1 + w + 0.4).a;
              float cloud = smoothstep(0.4, 0.68, n * 0.78 + n2 * 0.22);
              float region = smoothstep(0.25, 0.9, uv.x) * smoothstep(0.0, 0.55, uv.y);
              col = mix(col, uCloud, cloud * region * 0.85);
              col = mix(col, uCloudLit, (1.0 - cloud) * smoothstep(0.45, 0.7, n2) * 0.3);
              float alpha = cloud * region * 0.35;
              gl_FragColor = vec4(col, alpha);
            }
          `,
        });
        const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
        bgPlane.position.z = -BG_DIST;
        bgPlane.renderOrder = -10;
        bgPlane.frustumCulled = false;
        bgPlane.visible = false;
        camera.add(bgPlane);

        function sizeBackdrop() {
          const h =
            2 *
            Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
            BG_DIST *
            1.6;
          bgPlane.scale.set(h * camera.aspect, h, 1);
          bgMat.uniforms.uAspect.value = camera.aspect;
          const rt = sceneComposer.renderTarget1;
          bgMat.uniforms.uResolution.value.set(rt.width, rt.height);
        }

        const billboards = [];
        const unitPlane = new THREE.PlaneGeometry(1, 1);

        function addBillboard(mat, { x, y, z, w, h }) {
          const mesh = new THREE.Mesh(unitPlane, mat);
          mesh.position.set(x, y, z);
          mesh.scale.set(w, h, 1);
          mesh.frustumCulled = false;
          scene.add(mesh);
          billboards.push(mesh);
          return mesh;
        }

        const smokeFrag = `
          ${BB_FRAG_HEAD}
          uniform vec3 uShadow;
          uniform vec3 uLit;
          uniform float uOpacity;
          uniform vec2 uScale;
          uniform vec2 uSeed;
          uniform float uThresh;
          uniform float uSoft;
          uniform float uBreak;
          uniform float uGlow;
          uniform float uSpeed;
          uniform float uSoftRange;
          uniform vec2 uLightDir;
          float density(vec2 p) {
            return texture2D(uNoise, p).b * 0.85 + texture2D(uNoise, p * 2.37 + 0.31).a * 0.15;
          }
          void main() {
            vec2 q = (vUv - 0.5) * 2.0;
            float edge = smoothstep(1.0, 0.8, abs(q.x)) * smoothstep(1.0, 0.8, abs(q.y));
            float blob = exp(-dot(q, q) * 1.8) * edge;
            float t = uTime * 0.012 * uSpeed;
            vec2 p = vUv * uScale + uSeed;
            vec2 warp = texture2D(uNoise, p * 0.31 + vec2(t, -t * 0.6)).rg - 0.5;
            vec2 pp = p + warp * 0.4 + vec2(t * 1.6, t * 0.4);
            float n = density(pp);
            float nl = density(pp + uLightDir * 0.035);
            float puff = smoothstep(uThresh, uThresh + uSoft, n);
            float a = blob * mix(1.0, puff, uBreak);
            float lit = clamp(0.62 + (n - nl) * 5.0 - (puff - 0.5) * 0.3, 0.0, 1.0);
            vec3 col = mix(uShadow, uLit, lit);
            vec3 d = vWorld - uOrb;
            float g = uGlow * exp(-(d.x * d.x * 0.16 + d.y * d.y * 0.32)) * exp(-abs(d.z) * 0.12);
            col = mix(col, orbGlowColor(d), clamp(g * (1.0 + uEnergy * 0.5), 0.0, 1.0));
            a *= uOpacity * softDepth(uSoftRange);
            if (uPass > 0.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, a * 0.7); return; }
            gl_FragColor = vec4(col, a);
          }
        `;

        function addSmoke(o) {
          const freq = o.freq ?? 0.1;
          const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
              ...shared,
              uShadow: { value: C(o.shadow) },
              uLit: { value: C(o.lit) },
              uOpacity: { value: o.opacity },
              uScale: { value: new THREE.Vector2(o.w * freq, o.h * freq) },
              uSeed: {
                value: new THREE.Vector2(
                  Math.random() * 10,
                  Math.random() * 10,
                ),
              },
              uThresh: { value: o.thresh ?? 0.35 },
              uSoft: { value: o.soft ?? 0.35 },
              uBreak: { value: o.break ?? 0.6 },
              uGlow: { value: o.glow ?? 0 },
              uSpeed: { value: o.speed ?? 1 },
              uSoftRange: { value: o.softRange ?? 1.2 },
              uLightDir: { value: new THREE.Vector2(-0.6, 0.8) },
            },
            vertexShader: BB_VERT,
            fragmentShader: smokeFrag,
          });
          return addBillboard(mat, o);
        }

        function addGlow(o, shapeGlsl) {
          const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
              ...shared,
              uColA: { value: C(o.colA) },
              uColB: { value: C(o.colB ?? o.colA) },
              uOpacity: { value: o.opacity },
              uSoftRange: { value: o.softRange ?? 1.0 },
            },
            vertexShader: BB_VERT,
            fragmentShader: `
              ${BB_FRAG_HEAD}
              uniform vec3 uColA;
              uniform vec3 uColB;
              uniform float uOpacity;
              uniform float uSoftRange;
              void main() {
                vec2 q = (vUv - 0.5) * 2.0;
                float edge = smoothstep(1.0, 0.8, abs(q.x)) * smoothstep(1.0, 0.8, abs(q.y));
                float n = texture2D(uNoise, vUv * vec2(1.6, 1.0) + vec2(uTime * 0.004, uTime * 0.002)).b;
                vec3 col = uColA;
                float a = 0.0;
                ${shapeGlsl}
                a *= edge * uOpacity * (1.0 + uEnergy * 0.35) * softDepth(uSoftRange);
                if (uPass > 0.5) { gl_FragColor = vec4(0.0); return; }
                gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
              }
            `,
          });
          return addBillboard(mat, o);
        }

        const GLOW_SHAPES = {
          column: `
            float width = mix(0.42, 0.8, vUv.y);
            a = exp(-pow(q.x / width, 2.0)) * smoothstep(-1.0, -0.55, q.y) * (1.0 - smoothstep(-0.4, 0.9, q.y));
            a *= 0.85 + (n - 0.5) * 0.5;
          `,
          belt: `
            a = exp(-(q.x * q.x * 1.4 + q.y * q.y * 2.6));
            a *= 0.8 + (n - 0.5) * 1.0;
            col = mix(uColA, uColB, smoothstep(-0.8, 0.5, q.x));
          `,
          blob: `
            a = exp(-dot(q, q) * 2.2);
            a *= 0.8 + (n - 0.5) * 1.0;
          `,
        };

        const ATMOSPHERE = [
          {
            kind: "smoke",
            u: 0.86,
            v: 0.2,
            du: 0.5,
            dv: 0.6,
            z: -12,
            shadow: "#1a1538",
            lit: "#2a2450",
            opacity: 0.85,
            break: 0.6,
            soft: 0.5,
            freq: 0.07,
          },
          {
            kind: "smoke",
            u: 0.36,
            v: 0.2,
            du: 0.5,
            dv: 0.5,
            z: -12,
            shadow: "#1e1a3a",
            lit: "#2d2755",
            opacity: 0.6,
            break: 0.65,
            freq: 0.09,
          },
          {
            kind: "smoke",
            u: 0.06,
            v: 0.55,
            du: 0.35,
            dv: 1.1,
            z: -11,
            shadow: "#18153a",
            lit: "#221e48",
            opacity: 0.7,
            break: 0.3,
            freq: 0.08,
          },
          {
            kind: "smoke",
            u: 0.92,
            v: 0.46,
            du: 0.32,
            dv: 0.5,
            z: -6,
            shadow: "#1c1540",
            lit: "#2a2255",
            opacity: 0.85,
            glow: 0.55,
            freq: 0.14,
          },
          {
            kind: "smoke",
            u: 0.5,
            v: 0.27,
            du: 0.28,
            dv: 0.32,
            z: -6,
            shadow: "#201a48",
            lit: "#2e2660",
            opacity: 0.5,
            glow: 0.3,
            freq: 0.14,
          },
          {
            kind: "glow",
            shape: "column",
            u: 0.66,
            v: 0.22,
            du: 0.22,
            dv: 0.5,
            z: -3.2,
            colA: "#2a2050",
            opacity: 0.95,
          },
          {
            kind: "glow",
            shape: "blob",
            u: 0.655,
            v: 0.45,
            du: 0.3,
            dv: 0.46,
            z: -1.8,
            colA: "#2d2358",
            opacity: 0.75,
          },
          {
            kind: "glow",
            shape: "blob",
            u: 0.31,
            v: 0.63,
            du: 0.55,
            dv: 0.14,
            z: -4.5,
            colA: "#1a1538",
            opacity: 0.7,
          },
          {
            kind: "glow",
            shape: "belt",
            u: 0.47,
            v: 0.49,
            du: 0.32,
            dv: 0.24,
            z: -2.9,
            colA: "#2a1d48",
            colB: "#3d1a52",
            opacity: 1.0,
          },
          {
            kind: "glow",
            shape: "blob",
            u: 0.79,
            v: 0.49,
            du: 0.2,
            dv: 0.26,
            z: -2.6,
            colA: "#3a1a55",
            opacity: 1.0,
          },
          {
            kind: "smoke",
            u: 0.7,
            v: 0.75,
            du: 0.55,
            dv: 0.18,
            z: -1.6,
            shadow: "#1c1540",
            lit: "#2a2058",
            opacity: 0.9,
            glow: 0.8,
            freq: 0.2,
            softRange: 0.8,
          },
          {
            kind: "smoke",
            u: 0.5,
            v: 0.7,
            du: 0.24,
            dv: 0.22,
            z: 0.6,
            shadow: "#2a2255",
            lit: "#3a3068",
            opacity: 0.9,
            glow: 0.7,
            freq: 0.22,
            softRange: 0.8,
          },
          {
            kind: "smoke",
            u: 0.92,
            v: 0.72,
            du: 0.26,
            dv: 0.22,
            z: 0.6,
            shadow: "#1c1540",
            lit: "#2a2058",
            opacity: 0.8,
            glow: 0.5,
            freq: 0.22,
            softRange: 0.8,
          },
          {
            kind: "smoke",
            u: 0.68,
            v: 0.9,
            du: 0.55,
            dv: 0.32,
            z: 3.5,
            shadow: "#16123a",
            lit: "#221c50",
            opacity: 1.0,
            break: 0.25,
            freq: 0.14,
          },
          {
            kind: "smoke",
            u: 0.66,
            v: 0.82,
            du: 0.36,
            dv: 0.12,
            z: 2.6,
            shadow: "#1a1545",
            lit: "#2a2058",
            opacity: 0.8,
            break: 0.4,
            freq: 0.24,
            softRange: 0.6,
          },
          {
            kind: "smoke",
            u: 0.48,
            v: 0.86,
            du: 0.24,
            dv: 0.2,
            z: 3.8,
            shadow: "#252055",
            lit: "#352a68",
            opacity: 0.5,
            glow: 0.2,
            freq: 0.18,
          },
          {
            kind: "smoke",
            u: 0.94,
            v: 0.86,
            du: 0.22,
            dv: 0.26,
            z: 3.6,
            shadow: "#201a48",
            lit: "#2d2558",
            opacity: 0.7,
            freq: 0.22,
          },
          {
            kind: "smoke",
            u: 0.62,
            v: 1.0,
            du: 0.95,
            dv: 0.24,
            z: 6,
            shadow: "#1a1545",
            lit: "#2a2058",
            opacity: 0.85,
            break: 0.4,
            freq: 0.1,
            speed: 1.4,
          },
        ];

        const REF_ASPECT = 1.7;
        const REF_ORB = { u: 0.66, v: 0.475 };

        const _ndc = new THREE.Vector3();
        function frameToWorld(cam, u, v, z) {
          _ndc.set(u * 2 - 1, 1 - v * 2, 0.5).unproject(cam);
          const dir = _ndc.sub(cam.position).normalize();
          return cam.position
            .clone()
            .addScaledVector(dir, (z - cam.position.z) / dir.z);
        }

        function buildAtmosphere() {
          const refCam = new THREE.PerspectiveCamera(
            camera.fov,
            REF_ASPECT,
            camera.near,
            camera.far,
          );
          poseCamera(refCam, { az: 0, el: REST.el, dist: BASE_DIST }, REF_ORB);
          refCam.updateMatrixWorld();
          const tanHalf = Math.tan(THREE.MathUtils.degToRad(refCam.fov / 2));
          for (const a of ATMOSPHERE) {
            const c = frameToWorld(refCam, a.u, a.v, a.z);
            const fh = 2 * (refCam.position.z - a.z) * tanHalf;
            const o = {
              ...a,
              x: c.x,
              y: c.y,
              z: a.z,
              w: a.du * fh * REF_ASPECT,
              h: a.dv * fh,
            };
            if (a.kind === "smoke") addSmoke(o);
            else addGlow({ softRange: 1.5, ...o }, GLOW_SHAPES[a.shape]);
          }
        }

        function tierGeometry(r, h, bev) {
          const pts = [new THREE.Vector2(0, -h / 2)];
          const seg = 10;
          for (let i = 0; i <= seg; i++) {
            const a = -Math.PI / 2 + (Math.PI / 2) * (i / seg);
            pts.push(
              new THREE.Vector2(
                r - bev + bev * Math.cos(a),
                -h / 2 + bev + bev * Math.sin(a),
              ),
            );
          }
          for (let i = 0; i <= seg; i++) {
            const a = (Math.PI / 2) * (i / seg);
            pts.push(
              new THREE.Vector2(
                r - bev + bev * Math.cos(a),
                h / 2 - bev + bev * Math.sin(a),
              ),
            );
          }
          pts.push(new THREE.Vector2(0, h / 2));
          return new THREE.LatheGeometry(pts, 180);
        }

        const tierVert = `
          varying vec3 vWorld;
          varying vec3 vN;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            vN = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `;

        const tierFrag = `
          uniform float uPass;
          uniform float uEnergy;
          uniform float uPulseR;
          uniform float uPulseA;
          uniform vec3 uOrb;
          uniform float uTopY;
          uniform float uBottomY;
          uniform float uAO;
          uniform float uPoolK;
          uniform float uReflectionK;
          uniform vec3 uSideLight;
          uniform vec3 uSideMid;
          uniform vec3 uSideDark;
          uniform vec3 uTopCol;
          uniform vec3 uRimL;
          uniform vec3 uRimR;
          uniform vec3 uContact;
          uniform vec3 uOrbPink;
          uniform vec3 uOrbViolet;
          uniform vec3 uHazeL;
          uniform vec3 uFog;
          uniform vec3 uReflPink;
          uniform vec3 uReflViolet;
          uniform float uFade;
          varying vec3 vWorld;
          varying vec3 vN;
          vec3 orbReflection(vec3 p, vec3 rd, out float k) {
            vec3 oc = uOrb - p;
            float tca = dot(oc, rd);
            float d2 = max(dot(oc, oc) - tca * tca, 0.0);
            k = tca > 0.0 ? smoothstep(1.3, 0.75, sqrt(d2)) : 0.0;
            vec3 hp = p + rd * (tca - sqrt(max(1.0 - d2, 0.0)));
            vec3 hn = normalize(hp - uOrb);
            float s = dot(hn.xy, normalize(vec2(1.0, -0.8)));
            return mix(uReflPink, uReflViolet, smoothstep(-0.45, 0.45, s));
          }
          void main() {
            vec3 n = normalize(vN);
            vec3 v = normalize(cameraPosition - vWorld);
            float ndv = clamp(dot(n, v), 0.0, 1.0);
            float up = n.y;
            float top = smoothstep(0.82, 0.98, up);
            float bevel = smoothstep(0.25, 0.6, up) * (1.0 - top);
            float bevelLow = smoothstep(-0.15, -0.6, up);
            float h = clamp((vWorld.y - uBottomY) / (uTopY - uBottomY), 0.0, 1.0);
            vec3 side = mix(uSideLight, uSideMid, smoothstep(0.0, 0.5, h));
            side = mix(side, uSideDark, smoothstep(0.55, 1.0, h) * uAO);
            vec3 col = mix(side, uTopCol, top);
            float rel = vWorld.x - uOrb.x;
            float leftK = smoothstep(-0.2, -1.6, rel);
            float fres = pow(1.0 - ndv, 2.2);
            col = mix(col, mix(uRimR, uRimL, leftK), fres * 0.9 * (1.0 - top));
            float edge = pow(1.0 - ndv, 10.0) * (1.0 - top);
            col = mix(col, vec3(1.0), edge * 0.85);
            col = mix(col, vec3(1.0), bevel * 0.5);
            col = mix(col, uSideLight * 1.1, bevelLow * 0.3);
            vec3 L = uOrb - vWorld;
            float dl = length(L);
            L /= dl;
            float diff = max(dot(n, L), 0.0);
            float att = 1.0 / (1.0 + dl * dl * 0.9);
            col += mix(uOrbPink, uOrbViolet, smoothstep(-0.6, 0.6, rel)) * diff * att * (0.4 - top * 0.25 + uEnergy * 0.5);
            float rad = length(vWorld.xz - uOrb.xz);
            float pool = exp(-pow(max(rad - 0.55, 0.0), 2.0) * 2.4) * smoothstep(0.3, 0.9, up) * uPoolK;
            col = mix(col, uContact, pool * 0.75);
            float rk;
            vec3 refl = orbReflection(vWorld, reflect(-v, n), rk);
            col = mix(col, refl, uReflectionK * rk * (0.4 + 0.6 * pow(1.0 - ndv, 2.0)) * smoothstep(0.3, 0.9, up));
            col = mix(col, uHazeL, clamp(leftK * (0.45 + fres * 0.5), 0.0, 0.85) * (1.0 - top * 0.65));
            float wave = exp(-pow((rad - uPulseR) / 0.16, 2.0)) * uPulseA;
            col += uContact * wave * 0.9;
            float fog = smoothstep(-0.53, -1.08, vWorld.y);
            col = mix(col, uFog, fog * 0.95);
            if (uPass > 0.5) {
              vec3 e = vec3(bevel * 0.3 + edge * 0.45) + uContact * (pool * 0.25 + wave);
              gl_FragColor = vec4(e * (1.0 - fog), 1.0);
              return;
            }
            gl_FragColor = vec4(col, 1.0 - fog * uFade);
          }
        `;

        const tierSpec = [
          {
            r: 1.08,
            h: 0.05,
            top: -0.055,
            bev: 0.02,
            ao: 0,
            pool: 1.0,
            reflection: 0,
            sideLight: "#2a1d50",
            sideMid: "#1e1540",
            topCol: "#352868",
          },
          { r: 1.56, h: 0.3, top: -0.09, bev: 0.065, ao: 0, pool: 0.5 },
          { r: 1.78, h: 0.3, top: -0.39, bev: 0.065, ao: 1, pool: 0.25 },
          { r: 2.07, h: 0.3, top: -0.69, bev: 0.065, ao: 1, pool: 0.2 },
          {
            r: 2.32,
            h: 0.26,
            top: -0.99,
            bev: 0.055,
            ao: 1,
            pool: 0.0,
            fade: true,
          },
        ];

        const PODIUM_LIFT = 0.04;
        const tiers = [];
        for (const spec of tierSpec) {
          const t = { ...spec, top: spec.top + PODIUM_LIFT };
          const mat = new THREE.ShaderMaterial({
            vertexShader: tierVert,
            fragmentShader: tierFrag,
            transparent: !!t.fade,
            uniforms: {
              ...shared,
              uFade: { value: t.fade ? 0.9 : 0 },
              uTopY: { value: t.top },
              uBottomY: { value: t.top - t.h },
              uAO: { value: t.ao },
              uPoolK: { value: t.pool },
              uReflectionK: { value: t.reflection ?? 1 },
              uSideLight: { value: C(t.sideLight ?? "#1c1548") },
              uSideMid: { value: C(t.sideMid ?? "#140e38") },
              uSideDark: { value: C("#0e0a2d") },
              uTopCol: { value: C(t.topCol ?? "#221a50") },
              uRimL: { value: C("#3a2868") },
              uRimR: { value: C("#2a1a55") },
              uContact: { value: C("#4a2a78") },
              uOrbPink: { value: C("#ff8fd2") },
              uOrbViolet: { value: C("#9c6cff") },
              uHazeL: { value: C("#1a1240") },
              uFog: { value: C("#0d0a22") },
              uReflPink: { value: C("#fd8fd0") },
              uReflViolet: { value: C("#8a5cf8") },
            },
          });
          const mesh = new THREE.Mesh(tierGeometry(t.r, t.h, t.bev), mat);
          mesh.position.set(ORB.x, t.top - t.h / 2, ORB.z);
          mesh.layers.enable(LAYER_SOLID);
          scene.add(mesh);
          tiers.push(mesh);
        }

        const orbMat = new THREE.ShaderMaterial({
          uniforms: {
            ...shared,
            uStops: {
              value: [
                "#ff74ba",
                "#fc68b6",
                "#ee52bf",
                "#d646ca",
                "#af42dd",
                "#8e40ee",
                "#763df4",
                "#6b3ff4",
                "#6a40f5",
              ].map(C),
            },
            uRimUL: { value: C("#ffdcd2") },
            uRimR: { value: C("#f4e0ff") },
            uRimB: { value: C("#ead3ff") },
            uOrbTime: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
          },
          vertexShader: `
            varying vec3 vNView;
            varying vec3 vNObj;
            void main() {
              vNView = normalize(normalMatrix * normal);
              vNObj = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform float uPass;
            uniform float uEnergy;
            uniform sampler2D uNoise;
            uniform vec3 uStops[9];
            uniform vec3 uRimUL;
            uniform vec3 uRimR;
            uniform vec3 uRimB;
            uniform float uOrbTime;
            uniform vec2 uPointer;
            varying vec3 vNView;
            varying vec3 vNObj;
            vec3 gradient(float s) {
              float x = clamp((s + 0.6) / 0.15, 0.0, 7.999);
              int i = int(floor(x));
              vec3 a = uStops[0];
              vec3 b = uStops[1];
              for (int k = 0; k < 8; k++) {
                if (k == i) { a = uStops[k]; b = uStops[k + 1]; }
              }
              return mix(a, b, fract(x));
            }
            float sphereNoise(vec3 p, float scale, vec2 drift) {
              vec3 w = abs(p);
              w /= (w.x + w.y + w.z);
              return texture2D(uNoise, p.yz * scale + drift).b * w.x
                   + texture2D(uNoise, p.zx * scale + drift * 0.7 + 0.37).b * w.y
                   + texture2D(uNoise, p.xy * scale - drift * 0.8 + 0.71).b * w.z;
            }
            void main() {
              vec3 n = normalize(vNView);
              float t = uOrbTime;
              float spin = t * 0.12;
              vec3 o = normalize(vNObj);
              o = vec3(o.x * cos(spin) - o.z * sin(spin), o.y, o.x * sin(spin) + o.z * cos(spin));
              float f1 = sphereNoise(o, 0.55, vec2(t * 0.015, -t * 0.01)) - 0.5;
              float f2 = sphereNoise(o + f1 * 0.6, 0.8, vec2(-t * 0.03, t * 0.02)) - 0.5;
              float flow = f1 * 0.85 + f2 * 0.35;
              float axAng = atan(-0.8, 1.0) + sin(t * 0.21) * 0.12 + uPointer.x * 0.22 - uPointer.y * 0.12;
              vec2 axis = vec2(cos(axAng), sin(axAng));
              float s = dot(n.xy, axis) + 0.04 + flow * 0.32 + sin(t * 0.5) * 0.03;
              vec3 col = gradient(s);
              float ndv = clamp(n.z, 0.0, 1.0);
              col += mix(uStops[2], uStops[6], 0.5) * pow(ndv, 3.0) * 0.08 * (1.0 + uEnergy);
              col += uStops[1] * smoothstep(0.0, 0.4, f2 + f1 * 0.5) * 0.1 * ndv;
              vec3 hl = normalize(vec3(-0.45 + sin(t * 0.27) * 0.25 + uPointer.x * 0.35,
                                       0.5 + cos(t * 0.19) * 0.18 + uPointer.y * 0.25, 0.85));
              col += vec3(1.0, 0.86, 0.94) * pow(max(dot(n, hl), 0.0), 18.0) * 0.2;
              float r = clamp(length(n.xy), 0.0, 1.0);
              vec2 dir = n.xy / max(r, 1e-4);
              float ul = smoothstep(0.3, -0.5, dot(dir, axis));
              float rimUL = pow(clamp((r - 0.55) / 0.45, 0.0, 1.0), 1.85);
              float rimR = pow(clamp((r - 0.6) / 0.4, 0.0, 1.0), 3.0);
              float bottom = smoothstep(-0.2, -0.85, dir.y) * (1.0 - ul);
              float rimB = pow(clamp((r - 0.5) / 0.5, 0.0, 1.0), 2.4);
              float rim = mix(rimR, rimUL, ul);
              rim = mix(rim, max(rim, rimB), bottom);
              float ang = atan(dir.y, dir.x);
              float shimmer = 0.5 + 0.5 * sin(ang * 3.0 + t * 0.8) * sin(ang * 5.0 - t * 0.55);
              rim = clamp(rim * (0.8 + 0.45 * shimmer), 0.0, 1.0);
              vec3 rimCol = mix(uRimR, uRimUL, ul);
              rimCol = mix(rimCol, uRimB, bottom);
              col = mix(col, rimCol, rim);
              float edgeW = fwidth(r) * 1.5;
              col = mix(col, mix(rimCol, vec3(1.0, 0.95, 0.98), 0.5), smoothstep(1.0 - edgeW, 1.0, r));
              float breathe = 1.0 + 0.035 * sin(uTime * 1.3);
              col *= breathe * (1.0 + uEnergy * 0.18);
              if (uPass > 0.5) {
                gl_FragColor = vec4(col * (0.02 + uEnergy * 0.2) + rimCol * pow(rim, 3.0) * (0.6 + uEnergy * 0.4), 1.0);
                return;
              }
              gl_FragColor = vec4(col, 1.0);
            }
          `,
        });
        const orbMesh = new THREE.Mesh(
          new THREE.SphereGeometry(1, 128, 96),
          orbMat,
        );
        orbMesh.position.copy(ORB);
        orbMesh.layers.enable(LAYER_SOLID);
        scene.add(orbMesh);

        const HALO_HALF = 3.2;
        const halo = addGlow(
          {
            x: ORB.x,
            y: ORB.y,
            z: ORB.z,
            w: HALO_HALF * 2,
            h: HALO_HALF * 2,
            colA: "#4a2878",
            colB: "#2a1558",
            opacity: 1.0,
            softRange: 0.6,
          },
          `
            vec2 qq = q * ${HALO_HALF.toFixed(2)};
            float r = length(qq);
            float ul = smoothstep(0.3, -0.5, dot(qq / max(r, 1e-4), normalize(vec2(1.0, -0.8))));
            float d = max(r - 1.0, 0.0);
            a = exp(-d * mix(5.0, 2.8, ul)) * mix(0.6, 0.95, ul) + exp(-d * 1.1) * 0.32;
            a *= smoothstep(0.96, 1.0, r) * (0.9 + 0.1 * sin(uTime * 1.3));
            col = mix(uColB, uColA, ul);
          `,
        );

        const BASE_DIST = 20.5;
        const REF_R = 0.152;
        const REST = { az: 0, el: 0.087, dist: BASE_DIST };
        const rig = { ...REST };

        const comp = { u: REF_ORB.u, v: REF_ORB.v, r: REF_R };
        const compT = { u: REF_ORB.u, v: REF_ORB.v, r: REF_R };
        let compReady = false;
        const stackedMq = window.matchMedia("(max-aspect-ratio: 9/10)");

        function measureComposition() {
          const W = viewportWidth();
          const H = viewportHeight();
          if (sceneOnly) {
            compT.u = W / H < 0.9 ? 0.5 : 0.76;
            compT.v = W / H < 0.9 ? 0.28 : 0.46;
            compT.r = W / H < 0.9 ? 0.11 : 0.135;
            return;
          }
          const hero = document.querySelector(".hero")?.getBoundingClientRect();
          const header = document
            .querySelector(".header")
            ?.getBoundingClientRect();
          if (!hero || W < 2 || H < 2) return;
          if (!stackedMq.matches) {
            const left = hero.right + 24;
            const free = Math.max(W - left, W * 0.3);
            const rPx = Math.min(H * REF_R, free * 0.22);
            compT.u = (left + free * 0.42) / W;
            compT.v = 0.475;
            compT.r = rPx / H;
          } else {
            const top = (header?.bottom ?? 0) + 8;
            const freeH = Math.max(hero.top - 8 - top, H * 0.25);
            const rPx = Math.min(W * 0.2, freeH * 0.24);
            compT.u = 0.5;
            compT.v = (top + freeH * 0.42) / H;
            compT.r = rPx / H;
          }
          if (!compReady) {
            Object.assign(comp, compT);
            compReady = true;
          }
        }

        function easeComposition(dt) {
          if (!Number.isFinite(comp.r + comp.u + comp.v))
            Object.assign(comp, compT);
          const k = 1 - Math.exp(-dt * 5);
          comp.u += (compT.u - comp.u) * k;
          comp.v += (compT.v - comp.v) * k;
          comp.r += (compT.r - comp.r) * k;
          REST.dist = (BASE_DIST * REF_R) / comp.r;
        }

        function poseCamera(cam, { az, el, dist }, target) {
          cam.position.set(
            ORB.x + dist * Math.sin(az) * Math.cos(el),
            ORB.y + dist * Math.sin(el),
            ORB.z + dist * Math.cos(az) * Math.cos(el),
          );
          cam.up.set(0, 1, 0);
          cam.lookAt(ORB);
          const w = 1000 * cam.aspect;
          cam.setViewOffset(
            w,
            1000,
            w * (0.5 - target.u),
            1000 * (0.5 - target.v),
            w,
            1000,
          );
        }

        const smoothPointer = new THREE.Vector2();
        const PARALLAX = { az: 0.18, el: 0.09 };

        function placeCamera() {
          poseCamera(
            camera,
            {
              az: rig.az + smoothPointer.x * PARALLAX.az,
              el: rig.el + smoothPointer.y * PARALLAX.el,
              dist: REST.dist,
            },
            comp,
          );
        }

        const bloomComposer = new EffectComposer(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(
          new RenderPass(scene, camera, null, new THREE.Color(0x000000), 1),
        );
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(256, 256),
          0.7,
          0.45,
          0.0,
        );
        bloomComposer.addPass(bloomPass);

        const compositePass = new ShaderPass(
          new THREE.ShaderMaterial({
            uniforms: {
              tDiffuse: { value: null },
              tBloom: { value: bloomComposer.renderTarget2.texture },
              uStrength: { value: 0.45 },
              uTime: shared.uTime,
              uRes: { value: new THREE.Vector2(1, 1) },
              uScale: { value: 1 },
              uWash: { value: new THREE.Vector4() },
              uWashSrgb: { value: new THREE.Vector3(0.902, 0.89, 0.965) },
            },
            vertexShader: `
              varying vec2 vUv;
              void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
            `,
            fragmentShader: `
              uniform sampler2D tDiffuse;
              uniform sampler2D tBloom;
              uniform float uStrength;
              uniform float uTime;
              uniform vec2 uRes;
              uniform float uScale;
              uniform vec4 uWash;
              uniform vec3 uWashSrgb;
              varying vec2 vUv;
              float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
              void main() {
                vec4 baseSample = texture2D(tDiffuse, vUv);
                vec3 base = baseSample.rgb;
                float baseAlpha = baseSample.a;
                vec3 bloom = clamp(texture2D(tBloom, vUv).rgb * uStrength, 0.0, 1.0);
                vec3 col = 1.0 - (1.0 - base) * (1.0 - bloom);
                float alpha = clamp(baseAlpha + dot(bloom, vec3(0.333)), 0.0, 1.0);
                vec2 frag = vUv * uRes;
                vec3 cs = pow(max(col, 0.0), vec3(1.0 / 2.2));
                if (uWash.x > 0.0) cs = mix(cs, uWashSrgb, clamp(1.0 - frag.x / uWash.x, 0.0, 1.0));
                cs = mix(cs, uWashSrgb, uWash.y * 0.55 * (1.0 - smoothstep(0.0, 115.0 * uScale, uRes.y - frag.y)));
                if (uWash.z > 0.0) {
                  float t = clamp(1.0 - frag.y / uWash.z, 0.0, 1.0);
                  cs = mix(cs, uWashSrgb, t < 0.3 ? t / 0.3 * 0.82 : mix(0.82, 1.0, (t - 0.3) / 0.7));
                }
                col = pow(cs, vec3(2.2));
                if (alpha <= 0.002) {
                  gl_FragColor = vec4(0.0);
                  return;
                }
                col += ((hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.012) * smoothstep(0.0, 0.2, alpha);
                gl_FragColor = vec4(col * alpha, alpha);
              }
            `,
          }),
          "tDiffuse",
        );

        const uiScene = new THREE.Scene();
        const uiCam = new THREE.PerspectiveCamera(16, 1, 1, 20000);

        const uiShared = {
          tScene: { value: null },
          uRes: { value: new THREE.Vector2(1, 1) },
          uPR: { value: 1 },
          uOrbPos: { value: new THREE.Vector3() },
          uOrbUv: { value: new THREE.Vector2(0.66, 0.5) },
          uPointerPos: { value: new THREE.Vector3(-1e4, -1e4, 90) },
          uEnergy: shared.uEnergy,
          uPink: { value: C("#ff8fd0") },
          uViolet: { value: C("#9a74ff") },
        };

        const uiGlassVert = `
          varying vec3 vWorld;
          varying vec3 vN;
          varying vec4 vClip;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            vN = normalize(mat3(modelMatrix) * normal);
            vClip = projectionMatrix * viewMatrix * w;
            gl_Position = vClip;
          }
        `;

        const uiGlassFrag = `
          uniform sampler2D tScene;
          uniform vec2 uRes;
          uniform float uPR;
          uniform vec3 uOrbPos;
          uniform vec2 uOrbUv;
          uniform vec3 uPointerPos;
          uniform float uEnergy;
          uniform vec3 uPink;
          uniform vec3 uViolet;
          uniform float uHover;
          uniform float uVis;
          varying vec3 vWorld;
          varying vec3 vN;
          varying vec4 vClip;
          vec3 blurAt(vec2 uv, float radiusPx) {
            vec3 acc = vec3(0.0);
            for (int k = 0; k < 7; k++) {
              float a = float(k) * 2.39996;
              float r = sqrt((float(k) + 0.5) / 7.0) * radiusPx * uPR;
              acc += texture2D(tScene, uv + vec2(cos(a), sin(a)) * r / uRes).rgb;
            }
            return acc / 7.0;
          }
          float spec(vec3 n, vec3 l, vec3 v, float p) { return pow(max(dot(n, normalize(l + v)), 0.0), p); }
          void main() {
            vec3 n = normalize(vN);
            vec3 v = normalize(cameraPosition - vWorld);
            float ndv = clamp(dot(n, v), 0.0, 1.0);
            float fres = pow(1.0 - ndv, 3.0);
            vec2 suv = vClip.xy / vClip.w * 0.5 + 0.5;
            vec2 bend = -n.xy * (1.0 - ndv) * (22.0 + 10.0 * uHover) * uPR / uRes;
            vec3 refr = blurAt(suv + bend, 7.0);
            float bevelK = smoothstep(0.02, 0.35, 1.0 - n.z);
            vec3 disp = vec3(
              texture2D(tScene, suv + bend * 1.18).r,
              texture2D(tScene, suv + bend).g,
              texture2D(tScene, suv + bend * 0.82).b);
            refr = mix(refr, disp, bevelK * 0.55);
            vec3 col = mix(refr, vec3(0.95, 0.93, 1.0), 0.3) + 0.02;
            vec3 r = reflect(-v, n);
            vec3 env = blurAt(uOrbUv + r.xy * vec2(0.16, 0.26), 16.0);
            col = mix(col, env, 0.1 + 0.55 * fres);
            vec3 lo = normalize(uOrbPos - vWorld);
            vec3 orbCol = mix(uPink, uViolet, 0.4) * (1.0 + uEnergy * 0.6);
            col += orbCol * (spec(n, lo, v, 36.0) * 1.1 * (0.15 + 0.85 * bevelK) + max(dot(n, lo), 0.0) * fres * 0.7);
            col += vec3(1.0) * spec(n, normalize(vec3(-0.35, 1.0, 0.9)), v, 70.0) * 0.85 * bevelK;
            vec3 lp = normalize(uPointerPos - vWorld);
            col += vec3(1.0, 0.97, 1.0) * spec(n, lp, v, 110.0) * (0.15 + 1.1 * uHover) * mix(0.18, 1.0, bevelK);
            col += vec3(1.0) * fres * 0.12;
            vec3 behind = texture2D(tScene, suv).rgb;
            gl_FragColor = vec4(mix(behind, col, uVis), 1.0);
            #include <colorspace_fragment>
          }
        `;

        const uiShadowFrag = `
          uniform vec2 uHalf;
          uniform float uRadius;
          uniform float uVis;
          uniform float uLift;
          varying vec2 vUv;
          uniform vec2 uSize;
          float sdRound(vec2 p, vec2 b, float r) {
            vec2 q = abs(p) - b + r;
            return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
          }
          void main() {
            vec2 p = (vUv - 0.5) * uSize + vec2(0.0, 6.0 + uLift * 0.5);
            float d = sdRound(p, uHalf, uRadius);
            float a = (1.0 - smoothstep(-6.0, 20.0 + uLift, d)) * mix(0.16, 0.1, clamp(uLift / 14.0, 0.0, 1.0)) * uVis;
            gl_FragColor = vec4(0.17, 0.1, 0.37, a);
            #include <colorspace_fragment>
          }
        `;

        const SLAB = {
          radius: (h) => h * 0.26,
          bevel: (h) => Math.min(h * 0.14, 8),
          segments: 8,
          depth: (h) => h * 0.22,
        };

        function roundedRect(w, h, r) {
          r = Math.min(r, w / 2, h / 2);
          const x = -w / 2;
          const y = -h / 2;
          const s = new THREE.Shape();
          s.moveTo(x + r, y);
          s.lineTo(x + w - r, y);
          s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
          s.lineTo(x + w, y + h - r);
          s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
          s.lineTo(x + r, y + h);
          s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
          s.lineTo(x, y + r);
          s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
          const pts = [];
          for (const p of s.getPoints(24)) {
            if (!pts.length || p.distanceTo(pts[pts.length - 1]) > 1e-3)
              pts.push(p);
          }
          if (pts.length > 2 && pts[0].distanceTo(pts[pts.length - 1]) < 1e-3)
            pts.pop();
          return new THREE.Shape(pts);
        }

        function buttonGeometry(w, h, shape = SLAB) {
          const bevel = shape.bevel(h);
          const depth = shape.depth(h);
          const radius = shape.radius(h);
          const iw = Math.max(w - bevel * 2, 1);
          const ih = Math.max(h - bevel * 2, 1);
          const geo = new THREE.ExtrudeGeometry(
            roundedRect(iw, ih, Math.max(radius - bevel, 0.5)),
            {
              depth,
              bevelEnabled: true,
              bevelThickness: bevel,
              bevelSize: bevel,
              bevelSegments: shape.segments,
              curveSegments: 24,
            },
          );
          geo.translate(0, 0, -depth / 2);
          return {
            geo,
            front: depth / 2 + bevel,
            bevel,
            radius: Math.min(radius, h / 2),
          };
        }

        function labelParts(el, h) {
          const cs = getComputedStyle(el);
          const fs = parseFloat(cs.fontSize);
          const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          const spacing =
            cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
          const text = el.textContent.trim();
          const probe = document.createElement("canvas").getContext("2d");
          probe.font = font;
          if ("letterSpacing" in probe) probe.letterSpacing = spacing;
          const tw = probe.measureText(text).width;
          const cap =
            probe.measureText("H").actualBoundingBoxAscent || fs * 0.72;
          const pad = Math.ceil(fs * 0.6);
          const scale = Math.min(4, renderer.getPixelRatio() * 2);
          const baseline = pad + h / 2 + cap / 2;
          const paint = (w, draw, blur = 0) => {
            const cv = document.createElement("canvas");
            cv.width = Math.ceil((w + pad * 2) * scale);
            cv.height = Math.ceil((h + pad * 2) * scale);
            const g = cv.getContext("2d");
            g.scale(scale, scale);
            if (blur) g.filter = `blur(${blur}px)`;
            g.fillStyle = g.strokeStyle = "#fff";
            draw(g);
            const tex = new THREE.CanvasTexture(cv);
            tex.anisotropy = 8;
            return tex;
          };
          const drawText = (g) => {
            g.font = font;
            if ("letterSpacing" in g) g.letterSpacing = spacing;
            g.textBaseline = "alphabetic";
            g.fillText(text, pad, baseline);
          };
          const parts = {
            fs,
            pad,
            tw,
            gap: 0,
            aw: 0,
            text: paint(tw, drawText),
            shadow: paint(tw, drawText, fs * 0.22),
          };
          if (el.querySelector(".arrow")) {
            parts.aw = fs * 0.86;
            parts.gap = fs * 0.5;
            const a = parts.aw;
            parts.arrow = paint(a, (g) => {
              const y = pad + h / 2;
              g.lineWidth = fs * 0.085;
              g.lineCap = "round";
              g.lineJoin = "round";
              g.beginPath();
              g.moveTo(pad + a * 0.08, y);
              g.lineTo(pad + a * 0.92, y);
              g.moveTo(pad + a * 0.6, y - a * 0.32);
              g.lineTo(pad + a * 0.92, y);
              g.lineTo(pad + a * 0.6, y + a * 0.32);
              g.stroke();
            });
          }
          return parts;
        }

        const labelFrag = `
          uniform sampler2D map;
          uniform vec3 uInk;
          uniform vec3 uInkHover;
          uniform float uHover;
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            float a = texture2D(map, vUv).a;
            gl_FragColor = vec4(mix(uInk, uInkHover, uHover), a * uOpacity);
            #include <colorspace_fragment>
          }
        `;
        const labelVert =
          "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";
        function labelMaterial(map, ink, inkHover) {
          return new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            depthTest: false,
            uniforms: {
              map: { value: map },
              uInk: { value: C(ink) },
              uInkHover: { value: C(inkHover) },
              uHover: { value: 0 },
              uOpacity: { value: 1 },
            },
            vertexShader: labelVert,
            fragmentShader: labelFrag,
          });
        }

        const GRAIN = sceneOnly ? 0 : 0.055;
        const screenMat = new THREE.ShaderMaterial({
          uniforms: {
            tDiffuse: { value: null },
            uTime: shared.uTime,
            uScale: { value: 1 },
            uAmount: { value: GRAIN },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float uTime;
            uniform float uScale;
            uniform float uAmount;
            varying vec2 vUv;
            float hash(vec2 p) {
              vec3 q = fract(vec3(p.xyx) * 0.1031);
              q += dot(q, q.yzx + 33.33);
              return fract((q.x + q.y) * q.z);
            }
            void main() {
              vec4 sample = texture2D(tDiffuse, vUv);
              vec3 col = sample.rgb;
              float alpha = sample.a;
              if (alpha <= 0.002) { gl_FragColor = vec4(0.0); return; }
              vec3 cs = pow(max(col, 0.0), vec3(1.0 / 2.2));
              vec2 cell = floor(gl_FragCoord.xy / max(uScale, 1.0));
              float frame = floor(uTime * 24.0);
              float g = hash(cell + frame * 17.0) + hash(cell * 1.7 + frame * 31.0) - 1.0;
              float lum = dot(cs, vec3(0.299, 0.587, 0.114));
              cs += g * uAmount * mix(1.0, 0.45, smoothstep(0.55, 1.0, lum));
              gl_FragColor = vec4(cs * alpha, alpha);
            }
          `,
          depthTest: false,
          depthWrite: false,
          transparent: true,
        });
        const screenQuad = new FullScreenQuad(screenMat);

        const SCENE_SCALE = 0.8;
        const sceneComposer = new EffectComposer(
          renderer,
          new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, format: THREE.RGBAFormat }),
        );
        sceneComposer.renderToScreen = sceneOnly;
        sceneComposer.addPass(
          new RenderPass(scene, camera, null, new THREE.Color(0x000000), 0),
        );
        sceneComposer.addPass(compositePass);

        function drawScreen() {
          if (sceneOnly) return;
          const tex = sceneComposer.readBuffer.texture;
          uiShared.tScene.value = tex;
          screenMat.uniforms.tDiffuse.value = tex;
          renderer.setRenderTarget(null);
          renderer.clear();
          screenQuad.render(renderer);
          const auto = renderer.autoClear;
          renderer.autoClear = false;
          renderer.render(uiScene, uiCam);
          renderer.autoClear = auto;
        }

        let resizing = false;
        let resizeTimer = 0;
        const onResizeHooks = { light: [], heavy: [] };
        const pxScale = () => renderer.getPixelRatio();

        function resizeBuffers() {
          const w = Math.max(viewportWidth(), 1);
          const h = Math.max(viewportHeight(), 1);
          const pr = Math.min(window.devicePixelRatio, MAX_DPR);
          renderer.setPixelRatio(pr);
          renderer.setSize(w, h, false);
          depthRT.setSize(
            Math.ceil(w * pr * SCENE_SCALE),
            Math.ceil(h * pr * SCENE_SCALE),
          );
          shared.uDepthTexel.value.set(1 / depthRT.width, 1 / depthRT.height);
          sceneComposer.setPixelRatio(pr * SCENE_SCALE);
          sceneComposer.setSize(w, h);
          bloomComposer.setPixelRatio(1);
          bloomComposer.setSize(Math.ceil(w / 2), Math.ceil(h / 2));
        }

        function resizeLight() {
          if (viewportWidth() < 2 || viewportHeight() < 2) return;
          camera.aspect = viewportWidth() / viewportHeight();
          camera.updateProjectionMatrix();
          sizeBackdrop();
          measureComposition();
          for (const f of onResizeHooks.light) f();
        }

        function resizeHeavy() {
          resizing = false;
          for (const f of onResizeHooks.heavy) f();
        }

        let lastW = 0;
        let lastH = 0;
        function onResize() {
          if (viewportWidth() === lastW && viewportHeight() === lastH) return;
          lastW = viewportWidth();
          lastH = viewportHeight();
          resizing = true;
          resizeBuffers();
          resizeLight();
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resizeHeavy, 180);
        }
        window.addEventListener("resize", onResize, {
          signal: eventController.signal,
        });
        resizeObs = new ResizeObserver(onResize);
        resizeObs.observe(sceneOnly ? container : document.documentElement);
        lastW = viewportWidth();
        lastH = viewportHeight();
        resizeBuffers();
        resizeLight();
        placeCamera();
        camera.updateMatrixWorld();
        buildAtmosphere();

        const canvas = renderer.domElement;
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2(10, 10);
        let pointerInside = false;
        let overCanvas = false;
        let hover = 0;
        let flash = 0;
        let pulseT = -1;

        function setPointer(e) {
          const bounds = canvas.getBoundingClientRect();
          pointer.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
          pointer.y = -(((e.clientY - bounds.top) / bounds.height) * 2 - 1);
        }

        function hitOrb() {
          raycaster.setFromCamera(pointer, camera);
          return raycaster.intersectObject(orbMesh, false).length > 0;
        }

        const handlePointerMove = (e) => {
          setPointer(e);
          pointerInside = true;
          overCanvas = e.target === canvas;
        };
        const handlePointerLeave = () => {
          pointerInside = false;
          overCanvas = false;
        };
        const handleCanvasClick = () => {
          if (hitOrb()) {
            pulseT = 0;
            flash = 1;
          }
        };

        window.addEventListener("pointermove", handlePointerMove, {
          signal: eventController.signal,
        });
        document.documentElement.addEventListener(
          "pointerleave",
          handlePointerLeave,
          { signal: eventController.signal },
        );
        canvas.addEventListener("click", handleCanvasClick, {
          signal: eventController.signal,
        });

        const _orbNdc = new THREE.Vector3();

        let introStart = null;
        const startIntro = () => {
          if (introStart === null) introStart = performance.now();
        };
        if (reduceMotion) introStart = -1e9;
        if (document.fonts) {
          document.fonts.ready.then(startIntro);
        } else {
          startIntro();
        }
        setTimeout(startIntro, 1500);

        const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
        function intro(delay, dur) {
          if (introStart === null) return 0;
          return easeOutExpo(
            THREE.MathUtils.clamp(
              ((performance.now() - introStart) / 1000 - delay) / dur,
              0,
              1,
            ),
          );
        }

        function splitWords(root) {
          for (const node of [...root.childNodes]) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              splitWords(node);
              continue;
            }
            if (node.nodeType !== Node.TEXT_NODE) continue;
            const frag = document.createDocumentFragment();
            for (const part of node.textContent.split(/(\s+)/)) {
              if (!part) continue;
              if (/^\s+$/.test(part)) {
                frag.append(part);
                continue;
              }
              const span = document.createElement("span");
              span.className = "w3d";
              span.textContent = part;
              frag.append(span);
            }
            node.replaceWith(frag);
          }
        }

        function wordTexture(el, w, h) {
          const cs = getComputedStyle(el);
          const fs = parseFloat(cs.fontSize);
          const pad = Math.ceil(fs * 0.25);
          const scale = Math.min(4, renderer.getPixelRatio() * 1.5);
          const cv = document.createElement("canvas");
          cv.width = Math.ceil((w + pad * 2) * scale);
          cv.height = Math.ceil((h + pad * 2) * scale);
          const g = cv.getContext("2d");
          g.scale(scale, scale);
          g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          if ("letterSpacing" in g)
            g.letterSpacing =
              cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
          g.fillStyle = "#fff";
          g.textBaseline = "alphabetic";
          const m = g.measureText(el.textContent);
          const asc = m.fontBoundingBoxAscent ?? fs * 0.8;
          const desc = m.fontBoundingBoxDescent ?? fs * 0.2;
          g.fillText(el.textContent, pad, pad + (h - asc - desc) / 2 + asc);
          const tex = new THREE.CanvasTexture(cv);
          tex.anisotropy = 8;
          return { tex, pad };
        }

        const typeShared = {
          uSweepX: { value: -1e5 },
          uSweepA: { value: 0 },
          uSheen: { value: C("#a56bff") },
        };
        const wordFrag = `
          uniform sampler2D map;
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uSweepX;
          uniform float uSweepA;
          uniform vec3 uSheen;
          uniform float uSweepK;
          uniform float uPhraseX0;
          uniform float uPlaneW;
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            float a = texture2D(map, vUv).a;
            float phraseX = uPhraseX0 + vUv.x * uPlaneW;
            float sweep = exp(-pow((phraseX - uSweepX) / 80.0, 2.0)) * uSweepA * uSweepK;
            gl_FragColor = vec4(mix(uColor, uSheen, sweep * 0.9), a * uOpacity);
            #include <colorspace_fragment>
          }
        `;
        const wordVert = `
          varying vec2 vUv;
          varying vec3 vWorld;
          void main() {
            vUv = uv;
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `;

        const heroEl = sceneOnly ? null : document.querySelector(".hero");
        const typeRoles = sceneOnly
          ? []
          : [
              {
                sel: ".hero h1",
                color: "#010206",
                opacity: 1,
                delay: 0.18,
                step: 0.05,
              },
              {
                sel: ".hero .lead",
                color: "#010206",
                opacity: 0.5,
                delay: 0.62,
                step: 0.014,
              },
            ];
        const heroGroup = new THREE.Group();
        uiScene.add(heroGroup);
        const words = [];
        for (const role of typeRoles) {
          const el = container.querySelector(role.sel);
          if (!el) continue;
          splitWords(el);
          el.querySelectorAll(".w3d").forEach((span, i) => {
            const mat = new THREE.ShaderMaterial({
              transparent: true,
              depthWrite: false,
              uniforms: {
                ...typeShared,
                map: { value: null },
                uColor: { value: C(role.color) },
                uOpacity: { value: 0 },
                uSweepK: { value: span.closest(".hl") ? 1 : 0 },
                uPhraseX0: { value: 0 },
                uPlaneW: { value: 1 },
              },
              vertexShader: wordVert,
              fragmentShader: wordFrag,
            });
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
            heroGroup.add(mesh);
            words.push({
              el: span,
              mesh,
              mat,
              role,
              delay: role.delay + i * role.step,
              base: new THREE.Vector3(),
            });
          });
        }

        let typeDirty = true;
        let typeLayout = true;
        function layoutType() {
          const W = viewportWidth();
          const H = viewportHeight();
          const hr = heroEl?.getBoundingClientRect();
          if (!hr) return;
          const hx = hr.left + hr.width / 2;
          const hy = hr.top + hr.height / 2;
          let phrase = 0;
          for (const wd of words) {
            const r = wd.el.getBoundingClientRect();
            const k = r.height / wd.h0;
            wd.mesh.scale.set(wd.w0 * k, wd.hp0 * k, 1);
            wd.base.set(
              r.left + r.width / 2 - hx,
              hy - (r.top + r.height / 2),
              0,
            );
            const u = wd.mat.uniforms;
            u.uPlaneW.value = wd.mesh.scale.x;
            if (u.uSweepK.value) {
              u.uPhraseX0.value = phrase - (wd.mesh.scale.x - r.width) / 2;
              phrase +=
                r.width + parseFloat(getComputedStyle(wd.el).fontSize) * 0.28;
            }
          }
          heroGroup.userData.center = new THREE.Vector2(hx - W / 2, H / 2 - hy);
          heroGroup.userData.phrase = phrase;
          typeLayout = false;
        }
        function buildType() {
          for (const wd of words) {
            const r = wd.el.getBoundingClientRect();
            wd.mat.uniforms.map.value?.dispose();
            const { tex, pad } = wordTexture(wd.el, r.width, r.height);
            wd.mat.uniforms.map.value = tex;
            wd.h0 = r.height;
            wd.w0 = r.width + pad * 2;
            wd.hp0 = r.height + pad * 2;
          }
          typeDirty = false;
          layoutType();
        }

        let sweepT = -1;
        function updateType(dt) {
          if (!words.length) return;
          if (typeDirty) buildType();
          else if (typeLayout || resizing) layoutType();
          const c = heroGroup.userData.center;
          if (c) heroGroup.position.set(c.x, c.y, 0);

          for (const wd of words) {
            const e = intro(wd.delay, 1.1);
            wd.mesh.position.set(
              wd.base.x,
              wd.base.y - (1 - e) * 28,
              -(1 - e) * 90,
            );
            wd.mesh.rotation.x = (1 - e) * 1.1;
            wd.mat.uniforms.uOpacity.value =
              wd.role.opacity * Math.min(1, e * 1.4);
          }

          if (sweepT >= 0) {
            const dur = 1.2;
            sweepT += dt;
            const p = Math.min(sweepT / dur, 1);
            const ease = p * p * (3 - 2 * p);
            const len = heroGroup.userData.phrase ?? 0;
            typeShared.uSweepX.value = -120 + ease * (len + 240);
            typeShared.uSweepA.value =
              THREE.MathUtils.smoothstep(p, 0, 0.12) *
              (1 - THREE.MathUtils.smoothstep(p, 0.85, 1));
            if (p >= 1) {
              sweepT = -1;
              typeShared.uSweepA.value = 0;
            }
          }
        }

        const uiItems = [...container.querySelectorAll("[data-glass]")].map(
          (el) => {
            const item = {
              el,
              kind: el.dataset.glass,
              w: 0,
              h: 0,
              dirty: true,
              hover: 0,
              hoverT: 0,
              press: 0,
              pressT: 0,
              rx: 0,
              ry: 0,
              group: new THREE.Group(),
              mat: new THREE.ShaderMaterial({
                uniforms: {
                  ...uiShared,
                  uHover: { value: 0 },
                  uVis: { value: 1 },
                },
                vertexShader: uiGlassVert,
                fragmentShader: uiGlassFrag,
              }),
              shadowMat: new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                uniforms: {
                  uHalf: { value: new THREE.Vector2() },
                  uSize: { value: new THREE.Vector2() },
                  uRadius: { value: 0 },
                  uVis: { value: 1 },
                  uLift: { value: 0 },
                },
                vertexShader:
                  "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
                fragmentShader: uiShadowFrag,
              }),
            };
            uiScene.add(item.group);
            const enter = () => {
              item.hoverT = 1;
            };
            const leave = () => {
              item.hoverT = 0;
              item.pressT = 0;
            };
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointerleave", leave);
            el.addEventListener("focus", () => {
              if (el.matches(":focus-visible")) enter();
            });
            el.addEventListener("blur", leave);
            el.addEventListener("pointerdown", () => {
              item.pressT = 1;
            });
            el.addEventListener("pointerup", () => {
              item.pressT = 0;
            });
            if ("pulse" in el.dataset) {
              el.addEventListener("click", () => {
                pulseT = 0;
                flash = Math.max(flash, 0.7);
                sweepT = 0;
              });
            }
            return item;
          },
        );

        {
          const seen = {};
          for (const it of uiItems)
            it.order = seen[it.kind] = (seen[it.kind] ?? -1) + 1;
        }
        if (uiItems.length && !sceneOnly)
          document.documentElement.classList.add("ui3d");

        function buildItem(item) {
          item.group.clear();
          item.glass?.geometry.dispose();
          item.shadow?.geometry.dispose();
          const { w, h } = item;
          const { geo, front, bevel, radius } = buttonGeometry(w, h);
          item.el.style.borderRadius = `${radius}px`;
          item.radius = radius;
          item.glass = new THREE.Mesh(geo, item.mat);
          item.group.add(item.glass);

          const pad = 60;
          const shadow = new THREE.Mesh(
            new THREE.PlaneGeometry(w + pad * 2, h + pad * 2),
            item.shadowMat,
          );
          shadow.position.z = -front - 1;
          item.shadowMat.uniforms.uHalf.value.set(w / 2, h / 2);
          item.shadowMat.uniforms.uSize.value.set(w + pad * 2, h + pad * 2);
          item.shadowMat.uniforms.uRadius.value = radius;
          item.group.add(shadow);
          item.shadow = shadow;

          const inside = front - Math.min(bevel, 8);
          if (resizing && item.labelMeshes) {
            const k = h / item.labelH;
            for (const m of item.labelMeshes) {
              m.scale.setScalar(k);
              m.position.set(
                m.userData.x0 * k,
                m.userData.y0 * k,
                inside + m.userData.dz,
              );
              item.group.add(m);
            }
            if (item.arrow)
              item.arrow.userData.baseX = item.arrow.userData.x0 * k;
            item.dirty = false;
            return;
          }

          for (const m of item.labelMeshes ?? []) {
            m.material.uniforms.map.value.dispose();
            m.material.dispose();
            m.geometry.dispose();
          }
          const L = labelParts(item.el, h);
          const total = L.tw + (L.aw ? L.gap + L.aw : 0);
          const plane = (tw) =>
            new THREE.PlaneGeometry(tw + L.pad * 2, h + L.pad * 2);
          const ink = "#0e0a1f";
          const inkHover = "#3b1d8f";
          const place = (m, x, y, dz) => {
            m.userData.x0 = x;
            m.userData.y0 = y;
            m.userData.dz = dz;
            m.position.set(x, y, inside + dz);
          };

          const textShadow = new THREE.Mesh(
            plane(L.tw),
            labelMaterial(L.shadow, "#2a1660", "#4b2aa8"),
          );
          place(textShadow, -total / 2 + L.tw / 2, -1.2, -5);
          textShadow.material.uniforms.uOpacity.value = 0.12;
          textShadow.renderOrder = 1;
          const text = new THREE.Mesh(
            plane(L.tw),
            labelMaterial(L.text, ink, inkHover),
          );
          place(text, -total / 2 + L.tw / 2, 0, 0);
          text.renderOrder = 2;
          item.group.add(textShadow, text);
          item.labelMeshes = [textShadow, text];
          item.text = text;
          item.textShadow = textShadow;
          item.labelH = h;
          item.arrow = null;
          if (L.arrow) {
            const arrow = new THREE.Mesh(
              plane(L.aw),
              labelMaterial(L.arrow, ink, inkHover),
            );
            place(arrow, total / 2 - L.aw / 2, 0, 0);
            arrow.renderOrder = 2;
            arrow.userData.baseX = arrow.position.x;
            item.group.add(arrow);
            item.labelMeshes.push(arrow);
            item.arrow = arrow;
          }
          item.dirty = false;
        }

        function measureUiLight() {
          const W = viewportWidth();
          const H = viewportHeight();
          uiCam.aspect = W / H;
          const dist =
            H / 2 / Math.tan(THREE.MathUtils.degToRad(uiCam.fov / 2));
          uiCam.position.set(0, 0, dist);
          uiCam.near = dist * 0.3;
          uiCam.far = dist * 3;
          uiCam.updateProjectionMatrix();
          typeLayout = true;

          const ps = pxScale();
          renderer.getDrawingBufferSize(uiShared.uRes.value);
          uiShared.uPR.value = ps;
          screenMat.uniforms.uScale.value = ps;
          const cu = compositePass.uniforms;
          const srt = sceneComposer.renderTarget1;
          const sps = srt.width / Math.max(viewportWidth(), 1);
          cu.uRes.value.set(srt.width, srt.height);
          cu.uScale.value = sps;

          const wash = (sel) => {
            const el = container.querySelector(sel);
            return el && getComputedStyle(el).display !== "none"
              ? el.getBoundingClientRect()
              : null;
          };
          cu.uWash.value.set(
            (wash(".wash-left")?.right ?? 0) * sps,
            wash(".wash-top") ? 1 : 0,
            (wash(".wash-bottom")?.height ?? 0) * sps,
            0,
          );
        }

        function measureUiHeavy() {
          measureUiLight();
          for (const it of uiItems) it.dirty = true;
          typeDirty = true;
        }
        measureUiHeavy();
        onResizeHooks.light.push(measureUiLight);
        onResizeHooks.heavy.push(measureUiHeavy);
        if (document.fonts) {
          document.fonts.ready.then(() => {
            measureComposition();
            measureUiHeavy();
          });
        }

        const uiPointer = new THREE.Vector2(-1e4, -1e4);
        const handleUiPointerMove = (e) => uiPointer.set(e.clientX, e.clientY);
        window.addEventListener("pointermove", handleUiPointerMove, {
          signal: eventController.signal,
        });

        function updateUi(dt) {
          const W = viewportWidth();
          const H = viewportHeight();
          const spring = (v, t, rate) =>
            v + (t - v) * (1 - Math.exp(-dt * rate));

          _orbNdc.copy(ORB).project(camera);
          uiShared.uOrbUv.value.set((_orbNdc.x + 1) / 2, (_orbNdc.y + 1) / 2);
          uiShared.uOrbPos.value.set(
            (_orbNdc.x * W) / 2,
            (_orbNdc.y * H) / 2,
            160,
          );
          uiShared.uPointerPos.value.set(
            uiPointer.x - W / 2,
            H / 2 - uiPointer.y,
            90,
          );

          uiItems.forEach((it) => {
            const r = it.el.getBoundingClientRect();
            if (r.width < 1 || r.height < 1) {
              it.group.visible = false;
              return;
            }
            if (
              it.dirty ||
              Math.abs(r.width - it.w) > 0.5 ||
              Math.abs(r.height - it.h) > 0.5
            ) {
              it.w = r.width;
              it.h = r.height;
              buildItem(it);
            }
            it.hover = spring(it.hover, it.hoverT, 9);
            it.press = spring(it.press, it.pressT, 20);
            const cx = r.left + r.width / 2 - W / 2;
            const cy = H / 2 - (r.top + r.height / 2);

            const px = THREE.MathUtils.clamp(
              (uiPointer.x - W / 2 - cx) / (r.width / 2),
              -1,
              1,
            );
            const py = THREE.MathUtils.clamp(
              (H / 2 - uiPointer.y - cy) / (r.height / 2),
              -1,
              1,
            );
            const ryT = it.hoverT * px * 0.26;
            const rxT = -it.hoverT * py * 0.42;
            it.ry = spring(it.ry, ryT, 7);
            it.rx = spring(it.rx, rxT, 7);

            const pill = it.kind === "pill";
            const e = intro(
              pill ? 0.1 + it.order * 0.06 : 0.95 + it.order * 0.12,
              0.8,
            );
            const lift = it.hover * 14 - it.press * 9;
            it.group.position.set(
              cx,
              cy + (1 - e) * (pill ? 12 : -18),
              lift - (1 - e) * 40,
            );
            it.group.rotation.set(
              it.rx + (1 - e) * (pill ? -0.5 : 0.7),
              it.ry,
              0,
            );
            it.group.scale.setScalar(
              (1 + it.hover * 0.035 - it.press * 0.035) * (0.9 + 0.1 * e),
            );
            const vis = (pill ? it.hover : 1) * e;
            it.glass.visible = it.shadow.visible = vis > 0.01;
            for (const m of it.labelMeshes) {
              m.material.uniforms.uHover.value = it.hover;
              m.material.uniforms.uOpacity.value =
                e * (m === it.textShadow ? 0.12 : 1);
            }
            if (it.arrow)
              it.arrow.position.x =
                it.arrow.userData.baseX + it.hover * 5 - it.press * 2;
            it.group.visible = e > 0.001;
            it.mat.uniforms.uHover.value = it.hover;
            it.mat.uniforms.uVis.value = vis;
            it.shadowMat.uniforms.uVis.value = vis;
            it.shadowMat.uniforms.uLift.value = Math.max(lift, 0);
          });
        }

        const clock = new THREE.Clock();
        const _toCam = new THREE.Vector3();

        let lastBloomAt = 0;
        function renderFrame() {
          camera.layers.set(LAYER_SOLID);
          scene.overrideMaterial = depthOnlyMat;
          renderer.setRenderTarget(depthRT);
          renderer.clear();
          renderer.render(scene, camera);
          scene.overrideMaterial = null;
          camera.layers.set(0);
          renderer.setRenderTarget(null);

          const now = performance.now();
          if (now - lastBloomAt > 30) {
            lastBloomAt = now;
            shared.uPass.value = 1;
            camera.layers.set(LAYER_SOLID);
            bloomComposer.render();
            camera.layers.set(0);
          }

          shared.uPass.value = 0;
          sceneComposer.render();
          drawScreen();
        }

        function tick() {
          const dt = Math.min(clock.getDelta(), 0.05);
          onResize();
          shared.uTime.value += dt * TIME_SCALE;

          easeComposition(dt);
          const kp = 1 - Math.exp(-dt * 1.8);
          const px = pointerInside ? pointer.x : 0;
          const py = pointerInside ? pointer.y : 0;
          smoothPointer.x += (px - smoothPointer.x) * kp;
          smoothPointer.y += (py - smoothPointer.y) * kp;
          placeCamera();
          bgMat.uniforms.uShift.value.set(
            smoothPointer.x * 0.03,
            -smoothPointer.y * 0.02,
          );
          for (const b of billboards) b.quaternion.copy(camera.quaternion);
          halo.position
            .copy(ORB)
            .addScaledVector(
              _toCam.subVectors(camera.position, ORB).normalize(),
              -0.04,
            );
          halo.lookAt(camera.position);

          const isHover = overCanvas && hitOrb();
          canvas.style.cursor = isHover ? "pointer" : "default";
          hover += ((isHover ? 1 : 0) - hover) * (1 - Math.exp(-dt * 8));
          flash *= Math.exp(-dt * 2.5);

          const uiPull = uiItems.reduce(
            (m, it) => Math.max(m, it.kind === "button" ? it.hover : 0),
            0,
          );
          shared.uEnergy.value = hover * 0.6 + flash + uiPull * 0.35;
          orbMesh.scale.setScalar(1 + flash * 0.04);

          orbMat.uniforms.uOrbTime.value +=
            dt * TIME_SCALE * (1 + shared.uEnergy.value * 1.6);
          orbMat.uniforms.uPointer.value.copy(smoothPointer);

          if (pulseT >= 0) {
            pulseT += dt;
            shared.uPulseR.value = 0.9 + pulseT * 2.4;
            shared.uPulseA.value = Math.exp(-pulseT * 1.4);
            if (pulseT > 3) {
              pulseT = -1;
              shared.uPulseA.value = 0;
            }
          }

          updateUi(dt);
          updateType(dt);
          renderFrame();
        }

        let lastActivity = performance.now();
        const updateActivity = () => {
          lastActivity = performance.now();
        };
        for (const type of [
          "pointermove",
          "pointerdown",
          "keydown",
          "wheel",
          "touchmove",
        ]) {
          window.addEventListener(type, updateActivity, {
            passive: true,
            signal: eventController.signal,
          });
        }

        function animating() {
          return (
            resizing ||
            pulseT >= 0 ||
            sweepT >= 0 ||
            flash > 0.01 ||
            hover > 0.01 ||
            introStart === null ||
            performance.now() - introStart < 4000 ||
            uiItems.some(
              (it) => it.hoverT > 0 || it.hover > 0.01 || it.press > 0.01,
            )
          );
        }

        let lastFrameAt = 0;
        renderer.setAnimationLoop((now) => {
          const idle = now - lastActivity > 2500 && !animating();
          if (now - lastFrameAt < 1000 / (idle ? 30 : 60) - 2) return;
          lastFrameAt = now;
          tick();
        });
        animationLoopStarted = true;
      } catch (error) {
        console.error("Fintar 3D failed to load:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<div class="fallback text-black p-4 z-50 relative bg-white">The 3D scene could not load. Please reload to try again.</div>';
        }
      }
    };

    initHeroScene();

    return () => {
      disposed = true;
      eventController.abort();
      if (resizeObs) resizeObs.disconnect();
      if (rendererInstance && animationLoopStarted) {
        rendererInstance.setAnimationLoop(null);
        rendererInstance.dispose();
        rendererInstance.domElement.remove();
      }
      if (!sceneOnly) document.documentElement.classList.remove("ui3d");
    };
  }, [sceneOnly]);

  return (
    <>
      {!sceneOnly && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
        :root {
          --ink: #f0eeff;
          --sans: "Suisse Intl", "Suisse Int'l", "Inter", system-ui, sans-serif;
          --display: "Pragmatica", "Inter Tight", system-ui, sans-serif;
          --heading: "Suisse Intl", "Suisse Int'l", "Inter Tight", system-ui, sans-serif;
          --gutter: clamp(20px, 10.5vw, 150px);
          --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        html, body { margin: 0; height: 100%; overflow: hidden; }
        body {
          background: #07070e;
          color: var(--ink);
          font-family: var(--sans);
          -webkit-font-smoothing: antialiased;
          font-feature-settings: "liga" 0;
        }
        #app { position: fixed; inset: 0; }
        canvas { display: block; width: 100%; height: 100%; }
        .fallback {
          position: fixed; inset: 0; display: grid; place-items: center;
          color: #a89bcc; font: 14px/1.5 system-ui, sans-serif; text-align: center;
        }
        
        /* ---------- overlay: only real controls take the pointer ---------- */
        .ui { position: fixed; inset: 0; pointer-events: none; }
        .ui a, .ui button, .ui input, .ui label { pointer-events: auto; }
        
        .wash-top {
          position: absolute; left: 0; right: 0; top: -93px; height: 199px;
          background: linear-gradient(#07070e, rgba(7, 7, 14, 0));
          filter: blur(24px);
        }
        .wash-left {
          position: absolute; left: 0; top: -18px; bottom: -36px; width: 50%;
          background: linear-gradient(to left, rgba(7, 7, 14, 0), #07070e);
        }
        
        /* ---------- buttons ---------- */
        .btn {
          position: relative; border: 0; cursor: pointer; white-space: nowrap;
          display: inline-flex; align-items: center; justify-content: center; gap: 0.6em;
          font-family: var(--sans); font-weight: 500; text-decoration: none;
          border-radius: 999px;
          transition: transform 0.5s var(--ease-out), color 0.3s;
        }
        .btn:hover, .btn:focus-visible { transform: translateY(-2px) scale(1.035); }
        .btn:active { transform: translateY(0) scale(0.98); transition-duration: 0.12s; }
        .btn:focus-visible { outline: 2px solid rgba(143, 107, 255, 0.7); outline-offset: 3px; }
        .btn-glass { color: var(--ink); background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); }
        html.ui3d .btn { color: transparent; background: transparent; backdrop-filter: none; transform: none; }
        html.ui3d .btn .arrow { visibility: hidden; }
        html.ui3d .nav a:hover { transform: none; }
        html.ui3d .hero h1, html.ui3d .lead, html.ui3d .nav a { color: transparent; }
        html.ui3d ::selection { background: rgba(143, 107, 255, 0.25); }
        .w3d { display: inline; }
        html.ui3d .wash-top, html.ui3d .wash-left, html.ui3d .wash-bottom { visibility: hidden; }
        .btn .arrow {
          display: inline-block; width: 1.05em; height: 1.05em;
          transition: transform 0.5s var(--ease-out);
        }
        .btn:hover .arrow, .btn:focus-visible .arrow { transform: translateX(4px); }
        
        /* ---------- header ---------- */
        .header {
          position: absolute; top: clamp(18px, 2vw, 28px);
          left: clamp(24px, 2.55vw, 36px); right: clamp(18px, 2vw, 28px);
          height: clamp(40px, 3vw, 44px);
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo {
          display: flex; align-items: center; gap: 0.3em;
          color: var(--ink); text-decoration: none;
          font: 700 clamp(18px, 1.45vw, 20px) / 1 var(--display);
        }
        .logo img { width: 1.2em; height: 1.2em; display: block; }
        .nav {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; gap: 2px;
        }
        .nav a {
          padding: 0.6em 1.05em; border-radius: 999px;
          color: var(--ink); text-decoration: none;
          font: 400 clamp(13px, 1.06vw, 15px) / 1.2 var(--sans);
          letter-spacing: 0.01em;
          transition: transform 0.5s var(--ease-out);
        }
        .nav a:hover { transform: translateY(-1px); }
        .btn-header {
          height: 100%; padding: 0 1.35em;
          font-size: clamp(13px, 1.02vw, 14px); letter-spacing: 0.01em;
        }
        
        /* ---------- hero copy ---------- */
        .hero {
          position: absolute; left: var(--gutter);
          top: 58%; transform: translateY(-54%);
        }
        .hero h1 {
          margin: 0;
          font: 600 clamp(40px, 4.5vw, 64px) / 0.98 var(--heading);
          letter-spacing: -0.032em;
        }
        .lead {
          margin: clamp(18px, 1.7vw, 24px) 0 0 0.12em; max-width: 22em;
          font: 400 clamp(16px, 1.32vw, 18px) / 1.5 var(--sans);
          letter-spacing: 0.005em; color: rgba(1, 2, 6, 0.78);
        }
        .btn-cta {
          margin-top: clamp(26px, 2.6vw, 36px);
          height: clamp(50px, 4vw, 56px); padding: 0 clamp(26px, 2.3vw, 32px);
          font-size: clamp(15px, 1.2vw, 17px); letter-spacing: 0.01em;
        }
        
        /* ---------- credit ---------- */
        .credit {
          position: absolute; right: clamp(18px, 2vw, 28px); bottom: clamp(12px, 1.6vw, 24px);
          font: 400 13px / 1.2 var(--sans); letter-spacing: 0.01em;
          color: rgba(240, 238, 255, 0.5); text-decoration: none;
          text-underline-offset: 3px;
          transition: color 0.25s;
        }
        .credit:hover, .credit:focus-visible { color: var(--ink); text-decoration: underline; }
        
        @media (max-width: 760px) {
          .credit { display: none; }
        }
        @media (max-aspect-ratio: 9/10) {
          .wash-left { display: none; }
          .wash-bottom {
            position: absolute; left: 0; right: 0; bottom: 0; height: 60%;
            background: linear-gradient(rgba(7, 7, 14, 0), rgba(7, 7, 14, 0.82) 30%, #07070e);
          }
          .hero { left: clamp(20px, 6vw, 64px); right: clamp(20px, 6vw, 64px); top: auto; bottom: clamp(32px, 5vh, 64px); transform: none; }
          .hero h1 { font-size: clamp(36px, 8.6vw, 56px); }
          .lead { font-size: clamp(16px, 2.6vw, 18px); }
        }
        @media (max-aspect-ratio: 9/10) and (max-width: 760px) {
          .header { left: 20px; right: 16px; top: 16px; height: 40px; }
          .nav { display: none; }
        }
        
        @media (max-aspect-ratio: 9/10) and (max-width: 560px) {
          .btn-cta { width: 100%; }
        }
      `,
          }}
        />
      )}

      <div
        id={sceneOnly ? undefined : "app"}
        ref={containerRef}
        className={sceneOnly ? className : undefined}
        aria-hidden={sceneOnly || undefined}
      />

      {!sceneOnly && (
        <div className="ui">
          <div className="wash-top"></div>
          <div className="wash-left"></div>
          <div className="wash-bottom"></div>

          <main className="hero" id="access">
            <h1>
              See the{" "}
              <span className="hl">
                full financial <br />
                picture
              </span>{" "}
              before your <br />
              next move.
            </h1>
            <p className="lead">
              AI connects your portfolio, cash flow, risk profile, and goals
              before you make a move.
            </p>

            <button
              className="btn btn-glass btn-cta"
              type="button"
              data-glass="button"
              data-pulse="true"
            >
              Get early access
              <svg
                className="arrow"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </main>
        </div>
      )}
    </>
  );
}
