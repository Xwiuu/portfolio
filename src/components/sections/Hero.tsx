'use client';

import { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';

function AnimatedCore() {
  // Hook para ajustar a escala do objeto 3D baseado no tamanho da janela
  const [scale, setScale] = useState(2.5);

  useEffect(() => {
    const handleResize = () => {
      // Reduz a escala em telemóveis para não poluir o fundo do texto
      setScale(window.innerWidth < 768 ? 1.8 : 2.5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sphere visible args={[1, 100, 200]} scale={scale}>
      <MeshDistortMaterial
        color="#10b981"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.9}
      />
    </Sphere>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );

      tl.fromTo(".hero-data",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out" },
        "-=1"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center px-4 sm:px-10 md:px-20 pt-10 md:pt-20"
    >
      
      {/* BACKGROUND 3D - Opacidade ajustada para melhor legibilidade no mobile */}
      <div className="absolute inset-0 z-0 opacity-30 sm:opacity-40 md:opacity-60 pointer-events-none md:pointer-events-auto">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#10b981" intensity={2} />
            <AnimatedCore />
          </Suspense>
        </Canvas>
      </div>

      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px', // Grid ligeiramente menor para mobile
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      ></div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pointer-events-none">
        
        {/* Header Data - Ajuste de gap e visibilidade */}
        <div className="hero-data flex justify-between items-end border-b border-white/10 pb-4 mb-6 md:mb-10 mix-blend-difference">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              System Status: Online
            </span>
            <span className="text-[8px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Lat: 38.7223° N / Lon: 9.1393° W
            </span>
          </div>
          <div className="text-right">
             <span className="text-[8px] md:text-[10px] font-mono text-white/50 uppercase tracking-widest block">
               Codebase: V.2.4
             </span>
          </div>
        </div>

        {/* TÍTULO PRINCIPAL - Ajustado para não quebrar em ecrãs pequenos */}
        <h1 
          ref={titleRef}
          className="text-[16vw] sm:text-[13vw] md:text-[10vw] font-black text-white leading-[0.8] md:leading-[0.85] tracking-tighter mix-blend-exclusion"
          style={{ transformStyle: 'preserve-3d' }}
        >
          WILLIAM<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 via-white to-gray-500 animate-gradient-x">
            REIS
          </span>
        </h1>

        {/* Footer Data / Subtitle - Stack vertical no mobile */}
        <div 
          ref={subtitleRef}
          className="hero-data mt-8 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-6"
        >
          <div className="max-w-[280px] sm:max-w-md">
            <p className="text-xs md:text-base text-gray-400 font-light leading-relaxed">
              A magia que voce esta procurando esta no trabalho duro que voce esta evitando.
            </p>
          </div>

          <button className="pointer-events-auto group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur border border-white/10 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-300">
            <span className="text-[10px] md:text-xs font-mono text-white uppercase tracking-widest group-hover:text-emerald-500">
              Initialize Protocol
            </span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
          </button>
        </div>

      </div>

      {/* Scroll Indicator - Reduzido no mobile */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hero-data">
        <div className="w-px h-12 md:h-20 bg-linear-to-b from-transparent via-emerald-500 to-transparent opacity-50"></div>
      </div>

    </section>
  );
}