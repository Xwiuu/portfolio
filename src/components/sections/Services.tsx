"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesOriginal = [
  { id: "01", code: "STR-X", title: "Estratégia", desc: "Mapeamento de terreno e planeamento de conquista digital.", color: "#fbbf24", icon: "◉" },
  { id: "02", code: "MKT-OS", title: "Marketing Digital", desc: "Amplificação de sinal. Atingir o alvo no meio do ruído.", color: "#f472b6", icon: "◎" },
  { id: "03", code: "DAT-A", title: "Análise de Dados", desc: "A verdade matemática. Visão estratégica clara.", color: "#38bdf8", icon: "∰" },
  { id: "04", code: "ARC-V", title: "Web Architecture", desc: "Catedrais digitais. Estruturas robustas para suportar impérios.", color: "#a78bfa", icon: "◈" },
  { id: "05", code: "AUT-0", title: "Automação", desc: "Eficiência silenciosa e escala infinita.", color: "#34d399", icon: "⋈" },
  { id: "06", code: "SEC-9", title: "Cybersecurity", desc: "O escudo invisível contra ameaças hostis.", color: "#ef4444", icon: "Shield" },
];

const services = [...servicesOriginal, ...servicesOriginal, ...servicesOriginal];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 500;
      const newPos = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newPos, behavior: "smooth" });
    }
  };

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
      el.addEventListener("scroll", handleScroll);
      el.scrollLeft = el.scrollWidth / 3;
    }
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Desativa 3D pesado no mobile/tablet para performance
    const card = e.currentTarget;
    const content = card.querySelector(".holo-content") as HTMLElement;
    const glow = card.querySelector(".holo-glow") as HTMLElement;
    const border = card.querySelector(".holo-border") as HTMLElement;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, { rotateX, rotateY, scale: 1.05, duration: 0.5, ease: "power2.out" });
    if (content) gsap.to(content, { x: (x - centerX) / 25, y: (y - centerY) / 25, z: 60, duration: 0.5 });
    if (glow) gsap.to(glow, { x: (x - centerX) / 10, y: (y - centerY) / 10, duration: 0.5 });
    if (border) gsap.to(border, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const content = card.querySelector(".holo-content");
    const glow = card.querySelector(".holo-glow");
    const border = card.querySelector(".holo-border");

    gsap.to([card, content, glow], { rotateX: 0, rotateY: 0, scale: 1, x: 0, y: 0, z: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    if (border) gsap.to(border, { opacity: 0, duration: 0.5 });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.selector(containerRef)(".glass-card");
      gsap.fromTo(cards,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: scrollContainerRef.current, start: "top 85%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="min-h-screen w-full flex flex-col justify-center py-16 md:py-20 relative z-10 overflow-hidden perspective-3000">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] md:bg-[length:60px_60px] mask-[radial-gradient(ellipse_at_center,black_50%,transparent_90%)] pointer-events-none"></div>

      {/* Header */}
      <div className="px-6 md:px-20 mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[9px] md:text-[10px] font-mono text-emerald-500 tracking-widest uppercase block mb-2">{"// 02. Capabilities"}</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">THE VAULT</h2>
        </div>

        {/* Navegação - Escondida em mobile muito pequeno para limpar UI, mas mantida aqui */}
        <div className="hidden sm:flex gap-4">
          <button onClick={() => scroll("left")} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-emerald-500 transition-all group">
            <span className="text-xl md:text-2xl text-white group-hover:text-emerald-500">&larr;</span>
          </button>
          <button onClick={() => scroll("right")} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-emerald-500 transition-all group">
            <span className="text-xl md:text-2xl text-white group-hover:text-emerald-500">&rarr;</span>
          </button>
        </div>
      </div>

      {/* CARROSSEL */}
      <div ref={scrollContainerRef} className="flex gap-6 md:gap-8 px-6 md:px-20 overflow-x-auto snap-x snap-mandatory pb-24 pt-10 w-full no-scrollbar scroll-smooth">
        {services.map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card relative shrink-0 w-[85vw] sm:w-[400px] md:w-125 h-[450px] md:h-96 snap-center rounded-3xl md:rounded-4xl p-1 transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 rounded-3xl md:rounded-4xl bg-[#0a0a0a]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"></div>
            <div className="holo-border absolute inset-0 rounded-3xl md:rounded-4xl border-2 opacity-0 pointer-events-none transition-opacity duration-300" style={{ borderColor: service.color }}></div>

            <div className="holo-content relative h-full flex flex-col justify-between p-8 md:p-12" style={{ transform: "translateZ(60px)" }}>
              <div className="flex justify-between items-start">
                <span className="text-6xl md:text-8xl font-black text-white/5 select-none">{service.id}</span>
                <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-mono text-gray-300 uppercase tracking-widest">{service.code}</div>
              </div>

              <div className="mt-auto mb-6 md:mb-10">
                <div className="text-4xl md:text-5xl mb-4 text-white/20 group-hover:text-white transition-colors">{service.icon}</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 leading-none" style={{ textShadow: `0 0 20px ${service.color}30` }}>
                  {service.title.toUpperCase()}
                </h3>
                <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed">{service.desc}</p>
              </div>

              <div className="flex items-center gap-3 opacity-30 pt-6 border-t border-white/10">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }}></div>
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-white">Initialize Protocol</span>
                <div className="h-px flex-1 bg-white/20"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-10 shrink-0"></div>
      </div>

      {/* Cyber-Slider */}
      <div className="absolute bottom-8 md:bottom-10 left-0 w-full px-6 md:px-20 pointer-events-none">
        <div className="w-full h-0.5 bg-white/5 relative rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: `${progress * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-[8px] md:text-[9px] font-mono text-gray-600 mt-2 uppercase tracking-widest">
          <span>System Load</span>
          <span>Infinite Loop Active</span>
        </div>
      </div>
    </section>
  );
}