'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HackerText from '../ui/HackerText';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  
  // Estado para a posição do mouse (Spotlight Effect)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. O Título Gigante entra com peso
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0, filter: "blur(20px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }
    )
    // 2. A Frase entra logo a seguir
    .fromTo(quoteContainerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=1.0"
    );

    // Lógica do Spotlight (Luz que segue o mouse)
    const handleMouseMove = (e: MouseEvent) => {
      if (quoteContainerRef.current) {
        const rect = quoteContainerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center relative z-10 overflow-hidden select-none px-4"
    >
      
      {/* --- LAYER 1: O NOME GIGANTE (Imponente) --- */}
      <div 
        ref={titleRef}
        className="relative z-20 flex flex-col items-center justify-center mix-blend-difference leading-[0.85]"
      >
        <h1 className="text-[15vw] md:text-[13vw] font-black tracking-tighter text-white m-0 p-0 hover:text-white/90 transition-colors duration-500 cursor-default">
          WILLIAM
        </h1>
        <h1 className="text-[15vw] md:text-[13vw] font-black tracking-tighter text-white m-0 p-0 hover:text-white/90 transition-colors duration-500 cursor-default">
          REIS
        </h1>
      </div>

      {/* --- LAYER 2: A FRASE SURREAL (Spotlight Interactive) --- */}
      <div 
        ref={quoteContainerRef}
        className="mt-16 relative z-30 max-w-2xl group rounded-xl p-1"
      >
        {/* O "Fundo" do Spotlight. 
            É um gradiente radial que muda de posição baseado no mousePosition (x, y).
            Cria o efeito de "lanterna" atrás do texto.
        */}
        <div 
          className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        ></div>
        
        {/* O Conteúdo da Frase */}
        <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10 transition-all duration-300 hover:border-emerald-500/30">
          
          {/* Decoração Tech */}
          <div className="flex justify-between items-center mb-6 opacity-50 text-[10px] tracking-widest font-mono uppercase">
             <span>// Protocol: Wisdom</span>
             <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
               Live
             </span>
          </div>

          <h2 className="text-lg md:text-2xl font-light leading-relaxed text-gray-300 font-mono tracking-wide text-center">
            &quot;A magia que você procura,<br className="hidden md:block" />
            está no <HackerText 
                      text="TRABALHO" 
                      className="text-white font-bold inline-block px-1 decoration-emerald-500 underline decoration-2 underline-offset-4 hover:bg-emerald-500/10 transition-colors" 
                      speed={50} 
                    /> <br className="hidden md:block" />
            que você <HackerText 
                      text="IGNORA" 
                      className="text-white font-bold inline-block px-1 decoration-red-500 underline decoration-2 underline-offset-4 hover:bg-red-500/10 transition-colors" 
                      speed={70} 
                    />.&quot;
          </h2>

          {/* Prompt de ação no rodapé do card */}
          <div className="mt-6 text-center opacity-0 group-hover:opacity-60 transition-opacity duration-500">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
              Hover to Decrypt
            </span>
          </div>
        </div>
      </div>

      {/* --- LAYER 3: HUD CORNERS --- */}
      <div className="absolute bottom-8 left-8 hidden md:block text-[10px] font-mono text-gray-500 tracking-widest uppercase">
         <span className="text-white">System:</span> Online
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block text-[10px] font-mono text-gray-500 tracking-widest uppercase text-right">
         V2.4 [Stable]
      </div>

    </section>
  );
}