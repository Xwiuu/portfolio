"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tipagem correta para evitar erros de TS
type Project = {
  id: string;
  title: string;
  category: string;
  img: string;
  color: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "NEON NEXUS",
    category: "Web Arch",
    img: "https://images.unsplash.com/photo-1481487484168-9b995ecc1679?q=80&w=2000",
    color: "#10b981",
  },
  {
    id: "02",
    title: "VOID WALKER",
    category: "3D Exp",
    img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2000",
    color: "#8b5cf6",
  },
  {
    id: "03",
    title: "CYBER CORE",
    category: "Security",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000",
    color: "#ef4444",
  },
  {
    id: "04",
    title: "AERO GRID",
    category: "SaaS",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
    color: "#3b82f6",
  },
  {
    id: "05",
    title: "DATA HIVE",
    category: "Big Data",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000",
    color: "#f59e0b",
  },
  {
    id: "06",
    title: "QUANTUM",
    category: "Fintech",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
    color: "#ec4899",
  },
  {
    id: "07",
    title: "BIO SYNTH",
    category: "Health",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000",
    color: "#06b6d4",
  },
  {
    id: "08",
    title: "ECHO",
    category: "Social",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2000",
    color: "#ffffff",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const symbiontRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (!track || !section) return;

      // --- MÁGICA DE CÁLCULO DE SCROLL ---
      // Calculamos: Largura Total da Pista - Largura da Tela
      // O resultado é exatamente quanto precisamos "puxar" para a esquerda.
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // 1. SCROLL HORIZONTAL
      const tween = gsap.to(track, {
        x: getScrollAmount, // Usa função para recalcular se a tela mudar
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true, // Trava a secção verticalmente
          scrub: 1, // Suavidade (1s delay) para não "bater" seco
          start: "top top",
          // A Duração do scroll vertical é igual à distância horizontal + uma margem
          // Isso garante uma velocidade de scroll 1:1 natural
          end: () => `+=${Math.abs(getScrollAmount()) + 1000}`,
          invalidateOnRefresh: true, // Importante: Recalcula se redimensionares
          anticipatePin: 1, // Previne o "pulo" visual ao travar
        },
      });

      // 2. CÉLULA SYMBIONT (Rotação contínua)
      gsap.to(symbiontRef.current, {
        rotation: 360 * 3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + 1000}`,
          scrub: 1,
        },
      });

      // 3. ANIMAÇÃO DOS CARDS (Parallax Individual)
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        const img = card.querySelector("img");
        const line = card.querySelector(".connect-line");

        // Linha cresce
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween, // Liga ao scroll horizontal
                start: "left center",
                end: "right center",
                scrub: true,
              },
            },
          );
        }

        // Imagem mexe (Parallax)
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      // 'h-screen' garante altura cheia para o pin
      // 'overflow-hidden' é CRUCIAL para não quebrar o layout
      className="h-screen w-full bg-black relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background Grid - Sintaxe V4 Corrigida */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      ></div>

      {/* Header Fixo */}
      <div className="absolute top-10 left-6 md:left-20 z-20 mix-blend-difference pointer-events-none">
        {/* Comentário JSX Corrigido */}
        <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase block mb-2">
          {"{ 04. Neural Network }"}
        </span>
        <h2 className="text-5xl font-black text-white tracking-tighter">
          CASE STUDIES
        </h2>
      </div>

      {/* TRACKER (A Pista) */}
      {/* w-max: A pista tem o tamanho exato do conteúdo (nem mais, nem menos) */}
      <div
        ref={trackRef}
        className="flex items-center h-full w-max px-10 md:px-20 will-change-transform"
      >
        {/* Linha Central */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 w-full pointer-events-none"></div>

        {/* Célula Symbiont (Fixa no Centro da Tela) */}
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div
            ref={symbiontRef}
            className="w-24 h-24 rounded-full border border-white/20 bg-emerald-500/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] relative"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_#10b981]"></div>
            <div
              className="absolute inset-0 border border-emerald-500/30 rounded-full animate-spin-slow"
              style={{ animationDuration: "10s" }}
            ></div>
          </div>
        </div>

        {/* LOOP DOS CARDS */}
        {projects.map((project, index) => {
          const isTop = index % 2 === 0;

          return (
            <div
              key={project.id}
              // Classes V4 corrigidas: shrink-0, w-screen (mobile)
              className="project-card relative w-screen md:w-150 shrink-0 flex flex-col justify-center items-center h-full mx-4 md:mx-20"
            >
              <div
                className={`relative w-[80vw] md:w-125 flex flex-col ${isTop ? "mb-40" : "mt-40"}`}
              >
                {/* Linha de Conexão - Sintaxe de Gradiente Segura */}
                <div
                  className={`connect-line absolute left-1/2 w-px z-0 ${isTop ? "-bottom-20 h-40 origin-top" : "-top-20 h-40 origin-bottom"}`}
                  style={{
                    background: `linear-gradient(to ${isTop ? "bottom" : "top"}, ${project.color}, transparent)`,
                  }}
                ></div>
                <div
                  className={`absolute left-1/2 w-2 h-2 rounded-full z-0 ${isTop ? "bottom-20" : "top-20"}`}
                  style={{ background: project.color }}
                ></div>

                {/* Card */}
                <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 overflow-hidden hover:border-white/30 transition-colors duration-500 shadow-2xl">
                  {/* Imagem Container - Classes V4 (h-75/h-100) */}
                  <div className="relative h-75 md:h-100 w-full rounded-xl overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="eager" // Força carregamento rápido para cálculo correto
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <span>ID: {project.id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        <span>SECURE</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white text-xs group-hover:bg-white group-hover:text-black transition-colors">
                      &nearr;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
