'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';

function AnimatedCore() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
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

      // Animação de Entrada
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
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center px-6 md:px-20 pt-20"
    >
      
      {/* BACKGROUND 3D */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60 pointer-events-none md:pointer-events-auto">
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
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      ></div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pointer-events-none">
        
        {/* Header Data */}
        <div className="hero-data flex justify-between items-end border-b border-white/10 pb-4 mb-10 mix-blend-difference">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              System Status: Online
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Lat: 38.7223° N / Lon: 9.1393° W
            </span>
          </div>
          <div className="hidden md:block text-right">
             <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
               Codebase: V.2.4
             </span>
          </div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <h1 
          ref={titleRef}
          className="text-[13vw] md:text-[10vw] font-black text-white leading-[0.85] tracking-tighter mix-blend-exclusion"
          style={{ transformStyle: 'preserve-3d' }}
        >
          WILLIAM<br />
          {/* Correção: bg-linear-to-r */}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 via-white to-gray-500 animate-gradient-x">
            REIS
          </span>
        </h1>

        {/* Footer Data / Subtitle */}
        <div 
          ref={subtitleRef}
          className="hero-data mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="max-w-md">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              A magia que voce esta procurando esta no trabalho duro que voce esta evitando.
            </p>
          </div>

          <button className="pointer-events-auto group flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur border border-white/10 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-300">
            <span className="text-xs font-mono text-white uppercase tracking-widest group-hover:text-emerald-500">
              Initialize Protocol
            </span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
          </button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-data">
        {/* Correção: w-px e bg-linear-to-b */}
        <div className="w-px h-20 bg-linear-to-b from-transparent via-emerald-500 to-transparent opacity-50"></div>
      </div>

    </section>
  );
}