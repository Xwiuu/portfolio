'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesOriginal = [
  { id: "01", code: "STR-X", title: "Estratégia", desc: "Mapeamento de terreno e planeamento de conquista digital.", color: "#fbbf24", icon: "◉" },
  { id: "02", code: "MKT-OS", title: "Marketing Digital", desc: "Amplificação de sinal. Atingir o alvo no meio do ruído.", color: "#f472b6", icon: "◎" },
  { id: "03", code: "DAT-A", title: "Análise de Dados", desc: "A verdade matemática. Visão estratégica clara.", color: "#38bdf8", icon: "∰" },
  { id: "04", code: "ARC-V", title: "Web Architecture", desc: "Catedrais digitais. Estruturas robustas para suportar impérios.", color: "#a78bfa", icon: "◈" },
  { id: "05", code: "AUT-0", title: "Automação", desc: "Eficiência silenciosa e escala infinita.", color: "#34d399", icon: "⋈" },
  { id: "06", code: "SEC-9", title: "Cybersecurity", desc: "O escudo invisível contra ameaças hostis.", color: "#ef4444", icon: "Shield" }
];

// Triplicar lista para efeito infinito
const services = [...servicesOriginal, ...servicesOriginal, ...servicesOriginal];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // --- Lógica de Scroll (Botões) ---
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 500;
      
      const newPos = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      container.scrollTo({ left: newPos, behavior: 'smooth' });
    }
  };

  // --- Lógica da Barra Cyber-Slider ---
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollProgress = scrollLeft / (scrollWidth - clientWidth);
      setProgress(scrollProgress);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Inicia no meio para dar a ilusão de infinito
      el.scrollLeft = el.scrollWidth / 3;
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Efeito 3D Holográfico ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    // Seletores seguros usando classes
    const content = card.querySelector('.holo-content') as HTMLElement;
    const glow = card.querySelector('.holo-glow') as HTMLElement;
    const border = card.querySelector('.holo-border') as HTMLElement;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, { rotateX, rotateY, scale: 1.05, duration: 0.5, ease: "power2.out" });
    
    if(content) gsap.to(content, { x: (x - centerX) / 25, y: (y - centerY) / 25, z: 60, duration: 0.5 });
    if(glow) gsap.to(glow, { x: (x - centerX) / 10, y: (y - centerY) / 10, duration: 0.5 });
    if(border) gsap.to(border, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const content = card.querySelector('.holo-content');
    const glow = card.querySelector('.holo-glow');
    const border = card.querySelector('.holo-border');

    gsap.to([card, content, glow], { rotateX: 0, rotateY: 0, scale: 1, x: 0, y: 0, z: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    if (border) gsap.to(border, { opacity: 0, duration: 0.5 });
  };

  // --- Animação de Entrada (Bug Fix: Contexto Seguro) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.selector(containerRef)('.glass-card');
      
      gsap.fromTo(cards, 
        { y: 200, opacity: 0, rotateX: -20 },
        { 
          y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 1.5, ease: "power4.out",
          scrollTrigger: { 
            trigger: scrollContainerRef.current, 
            start: "top 80%" 
          }
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Limpa animações ao desmontar (Evita o erro removeChild)
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col justify-center py-20 relative z-10 overflow-hidden perspective-3000"
    >
      
      {/* Background Grid (Tailwind v4 friendly) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] pointer-events-none"></div>

      {/* Header */}
      <div className="px-6 md:px-20 mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase block mb-2">
            {'// 02. Capabilities'}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mix-blend-difference tracking-tighter">
            THE VAULT
          </h2>
        </div>
        
        {/* Navegação */}
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 hover:border-emerald-500 hover:scale-110 transition-all duration-300 group cursor-pointer">
            <span className="text-2xl text-white group-hover:text-emerald-500 transition-colors">&larr;</span>
          </button>
          <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 hover:border-emerald-500 hover:scale-110 transition-all duration-300 group cursor-pointer">
            <span className="text-2xl text-white group-hover:text-emerald-500 transition-colors">&rarr;</span>
          </button>
        </div>
      </div>

      {/* CARROSSEL (Com classe no-scrollbar) */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 px-6 md:px-20 overflow-x-auto snap-x snap-mandatory pb-32 pt-10 w-full no-scrollbar scroll-smooth"
        style={{ perspective: '3000px' }}
      >
        {services.map((service, index) => (
          <div 
            key={`${service.id}-${index}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Atualizado: shrink-0 e tamanhos fixos
            className="glass-card relative shrink-0 w-[90vw] md:w-[500px] h-[600px] snap-center rounded-[2rem] p-1 group cursor-pointer transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Vidro */}
            <div className="absolute inset-0 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden" style={{ transform: 'translateZ(0px)' }}>
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>
            
            {/* Borda Neon */}
            <div className="holo-border absolute inset-0 rounded-[2rem] border-2 opacity-0 pointer-events-none transition-opacity duration-300" style={{ borderColor: service.color }}></div>

            {/* Conteúdo 3D */}
            <div className="holo-content relative h-full flex flex-col justify-between p-10 md:p-12 rounded-[1.8rem]" style={{ transform: 'translateZ(60px)' }}>
              
              <div 
                className="holo-glow absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ background: service.color, transform: 'translateZ(-40px)' }}
              ></div>

              <div className="flex justify-between items-start">
                <span className="text-7xl md:text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors select-none">{service.id}</span>
                <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono text-gray-300 uppercase tracking-widest backdrop-blur-md shadow-lg">{service.code}</div>
              </div>

              <div className="mt-auto mb-10">
                <div className="text-5xl mb-6 text-white/20 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{service.icon}</div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-[0.9]" style={{ textShadow: `0 0 30px ${service.color}50` }}>{service.title.toUpperCase()}</h3>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed group-hover:text-white transition-colors">
                  {service.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity pt-6 border-t border-white/10">
                 <div className="w-2 h-2 rounded-full" style={{ background: service.color }}></div>
                 <span className="text-[9px] uppercase tracking-[0.2em] text-white whitespace-nowrap">Initialize Protocol</span>
                 <div className="h-px w-full bg-white/20"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-10 shrink-0"></div>
      </div>
      
      {/* Cyber-Slider (ÚNICA barra visível) */}
      <div className="absolute bottom-10 left-0 w-full px-6 md:px-20 pointer-events-none">
        <div className="w-full h-0.5 bg-white/5 relative flex items-center overflow-hidden rounded-full">
          <div 
            className="absolute left-0 top-0 h-full bg-emerald-500 transition-all duration-100 ease-out shadow-[0_0_20px_#10b981]"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[9px] font-mono text-gray-600 mt-2 uppercase tracking-widest">
           <span>System Load</span>
           <span>Infinite Loop Active</span>
        </div>
      </div>

    </section>
  );
}