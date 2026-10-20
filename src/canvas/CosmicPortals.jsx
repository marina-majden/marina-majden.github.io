import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";

export default function CosmicPortals() {
  const mountRef = useRef(null);
  const labelsRef = useRef([]);
  const [activePortal, setActivePortal] = useState(null);

  // Koristimo Ref da pratimo aktivni portal unutar Three.js animacijske petlje
  // bez da nepotrebno okidamo Reactove re-rendere (optimizacija performansi)
  const activePortalRef = useRef(activePortal);

  useEffect(() => {
    activePortalRef.current = activePortal;
  }, [activePortal]);

  useEffect(() => {
    // 1. Postavljanje scene, kamere i renderera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030308");
    scene.fog = new THREE.Fog("#030308", 5, 20);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. Osvjetljenje
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 3. Kozmička prašina / Zvijezde s custom bojama (Cyan/Magenta)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 40;
      posArray[i + 2] = (Math.random() - 0.5) * 40 - 5;

      // Miks boja tvog brenda za zvijezde
      const r = Math.random();
      if (r < 0.3) {
        colorArray[i] = 0;
        colorArray[i + 1] = 1;
        colorArray[i + 2] = 1;
      } // Cyan
      else if (r < 0.6) {
        colorArray[i] = 1;
        colorArray[i + 1] = 0;
        colorArray[i + 2] = 1;
      } // Magenta
      else {
        colorArray[i] = 1;
        colorArray[i + 1] = 1;
        colorArray[i + 2] = 1;
      } // Bijela
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // 4. Konstrukcija 3D Portala
    const portalsData = [
      {
        id: "tarot",
        title: "TAROT",
        color: "#ff00ff",
        pos: [-3, 0, 1],
        rot: [0, 0.3, 0],
      },
      {
        id: "webshop",
        title: "NEON E-COMMERCE",
        color: "#00ffff",
        pos: [0, 0, 0],
        rot: [0, 0, 0],
      },
      {
        id: "arcade",
        title: "RETRO ARCADE UI",
        color: "#4b0082",
        pos: [3, 0, 1],
        rot: [0, -0.3, 0],
      },
    ];

    const portals = [];

    portalsData.forEach((data) => {
      const group = new THREE.Group();
      group.position.set(...data.pos);
      group.rotation.set(...data.rot);
      group.userData = { id: data.id, color: data.color, isHovered: false };

      // Vanjski neonski okvir
      const frameGeo = new THREE.BoxGeometry(2.7, 3.8, 0.05);
      const frameMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        wireframe: true,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      group.add(frame);

      // Unutarnji Glassmorphism stakleni panel
      const glassGeo = new THREE.BoxGeometry(2.5, 3.5, 0.1);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
        transmission: 0.5,
        side: THREE.DoubleSide,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.userData.isGlass = true;
      group.add(glass);

      // Unutarnji svjetovi (Iza stakla)
      const contentGroup = new THREE.Group();
      contentGroup.position.z = -0.5; // Smješteno blago iza stakla

      if (data.id === "tarot") {
        const torusGeo = new THREE.TorusGeometry(0.8, 0.2, 16, 64);
        const torusMat = new THREE.MeshPhysicalMaterial({
          color: 0xff00ff,
          roughness: 0.1,
          transmission: 1,
          thickness: 0.5,
        });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        contentGroup.add(torus);
        group.userData.contentMesh = torus;
      } else if (data.id === "webshop") {
        const octGeo = new THREE.OctahedronGeometry(0.9, 0);
        const octMat = new THREE.MeshStandardMaterial({
          color: 0x00ffff,
          wireframe: true,
          emissive: 0x00ffff,
          emissiveIntensity: 0.8,
        });
        const octahedron = new THREE.Mesh(octGeo, octMat);
        contentGroup.add(octahedron);
        group.userData.contentMesh = octahedron;
      } else if (data.id === "arcade") {
        const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0x8a2be2,
          wireframe: true,
          emissive: 0x4b0082,
          emissiveIntensity: 1,
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        contentGroup.add(box);
        group.userData.contentMesh = box;
      }

      group.add(contentGroup);
      scene.add(group);
      portals.push(group);
    });

    // 5. Sustav Interakcije (Raycaster)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredPortal = null;

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      // Gađamo isključivo staklene panele radi boljih performansi
      const glassMeshes = portals.map((p) => p.children[1]);
      const intersects = raycaster.intersectObjects(glassMeshes);

      if (intersects.length > 0) {
        document.body.style.cursor = "pointer";
        const hitGroup = intersects[0].object.parent;
        if (hoveredPortal !== hitGroup) {
          hoveredPortal = hitGroup;
        }
      } else {
        document.body.style.cursor = "auto";
        hoveredPortal = null;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onDoubleClick = () => {
      if (hoveredPortal) {
        const id = hoveredPortal.userData.id;
        setActivePortal((prev) => (prev === id ? null : id));
      } else {
        setActivePortal(null); // Reset
      }
    };
    window.addEventListener("dblclick", onDoubleClick);

    // 6. Animacijska Loop Petlja
    const clock = new THREE.Clock();
    let targetCameraPos = new THREE.Vector3(0, 0, 8);
    let targetCameraLook = new THREE.Vector3(0, 0, 0);
    const currentCameraLook = new THREE.Vector3(0, 0, 0);
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotacija svemirske maglice/prašine
      starsMesh.rotation.y = time * 0.02;

      const currentActiveId = activePortalRef.current;

      portals.forEach((p, index) => {
        const isActive = currentActiveId === p.userData.id;
        const isHovered = hoveredPortal === p;

        // Suptilno lebdenje portala kad smo iznad njega
        const targetY = isHovered && !isActive ? 0.2 : 0;
        p.position.y += (targetY - p.position.y) * delta * 5;

        // Unutarnji objekti se rotiraju (ubrzavaju na hover/active)
        if (p.userData.contentMesh) {
          const speedMult = isActive || isHovered ? 3 : 1;
          p.userData.contentMesh.rotation.x += delta * speedMult;
          p.userData.contentMesh.rotation.y += delta * 0.5 * speedMult;
        }

        // Staklo postaje "prozirni portal" kad smo iznad
        const targetOpacity = isActive || isHovered ? 0.05 : 0.85;
        const glassMat = p.children[1].material;
        glassMat.opacity += (targetOpacity - glassMat.opacity) * delta * 5;

        // Računanje ciljne pozicije kamere ovisno o aktivnom portalu
        if (isActive) {
          targetCameraPos.copy(p.position).add(new THREE.Vector3(0, 0, 3));
          targetCameraLook.copy(p.position);
        }

        // Matematika za preslikavanje 3D pozicija u 2D HTML
        if (labelsRef.current[index]) {
          const vector = p.position.clone();
          vector.y += 2.4; // Offset iznad portala
          vector.project(camera); // Projekcija u 2D prostor ekrana

          const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
          const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

          labelsRef.current[index].style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px)`;

          // Dinamična promjena boja CSS teksta
          if (isActive || isHovered) {
            labelsRef.current[index].style.color = p.userData.color;
            labelsRef.current[index].style.textShadow =
              `0 0 10px ${p.userData.color}`;
          } else {
            labelsRef.current[index].style.color = "white";
            labelsRef.current[index].style.textShadow = "none";
          }

          // Sakrij tekst ako je kamera prošla kroz njega (zumiranje)
          labelsRef.current[index].style.opacity = vector.z > 1 ? 0 : 1;
        }
      });

      if (!currentActiveId) {
        targetCameraPos.set(0, 0, 8);
        targetCameraLook.set(0, 0, 0);
      }

      // Glatka (Lerp) kretnja kamere
      camera.position.lerp(targetCameraPos, delta * 3);
      currentCameraLook.lerp(targetCameraLook, delta * 3);
      camera.lookAt(currentCameraLook);

      renderer.render(scene, camera);
    };
    animate();

    // 7. Responzivnost i Cleanup proces
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Kada se komponenta ugasi (uništi), počisti event listenere i WebGL memoriju
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Pazimo da se inicijalizira samo jednom!

  return (
    <div className="w-full h-screen bg-[#030308] text-white overflow-hidden relative font-sans">
      {/* Kontejner za sirovo (Vanilla) Three.js iscrtavanje */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-auto"
      />

      {/* Lebdeći 3D Text labeli kontrolirani direktno iz animacijske petlje u useRef */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {["TAROT", "NEON E-COMMERCE", "RETRO ARCADE UI"].map((title, i) => (
          <div
            key={i}
            ref={(el) => (labelsRef.current[i] = el)}
            className="absolute top-0 left-0 text-center font-bold uppercase tracking-[0.2em] transition-colors duration-300 w-[300px]"
            style={{ fontSize: "1.2rem", color: "white" }}
          >
            {title}
          </div>
        ))}
      </div>

      {/* HTML Glassmorphism UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8">
        {/* Header */}
        <header className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
          <div
            className="text-2xl font-bold tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            CREATIVE<span className="text-[#00ffff]">DEV</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-[#ff00ff] transition-colors">
              Usluge
            </a>
            <a href="#" className="hover:text-[#00ffff] transition-colors">
              Projekti
            </a>
            <a href="#" className="hover:text-[#4b0082] transition-colors">
              Kontakt
            </a>
          </nav>
        </header>

        {/* Dinamični UI sloj */}
        <div className="flex justify-center mb-10 pointer-events-auto">
          {activePortal ? (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl text-center max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
              <h2 className="text-3xl font-bold mb-2 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                {activePortal.toUpperCase()} OTVOREN
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Nalaziš se unutar izoliranog prostora ovog projekta. Ovdje
                korisnik može istražiti case-study, interaktivni demo ili
                direktno kupiti template.
              </p>
              <button
                onClick={() => setActivePortal(null)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all uppercase text-xs font-bold tracking-wider"
              >
                ← Natrag u Multiverzum
              </button>
            </div>
          ) : (
            <div className="text-center animate-in fade-in duration-1000">
              <h1
                className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ZAKORAČI U{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#4b0082] to-[#00ffff]">
                  KOD
                </span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest max-w-xl mx-auto drop-shadow-md">
                Pređi mišem preko portala za pregled. Dvostruki klik za
                uranjanje u projekt.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
