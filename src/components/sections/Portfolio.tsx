"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: string;
  img: string;
  color: string;
  url: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "AURA STUDIO",
    category: "Web Arch",
    img: "https://i.ibb.co/r23cGPr8/Captura-de-tela-2026-02-24-222136.png",
    color: "#10b981",
    url: "https://aura-studio-iota-two.vercel.app",
  },
  {
    id: "02",
    title: "JN PRODUTORA",
    category: "Production",
    img: "https://i.ibb.co/DH8GPq3f/Captura-de-tela-2026-02-24-222209.png",
    color: "#8b5cf6",
    url: "https://www.jnprodutora.com.br",
  },
  {
    id: "03",
    title: "CINE AETHER",
    category: "Entertainment",
    img: "https://i.ibb.co/Tq4Jf9nx/Captura-de-tela-2026-02-24-222224.png",
    color: "#ef4444",
    url: "https://cine-aether.vercel.app",
  },
  {
    id: "04",
    title: "NEXUS CONSULTING",
    category: "Business",
    img: "https://i.ibb.co/chnyK8TY/Captura-de-tela-2026-02-24-222235.png",
    color: "#3b82f6",
    url: "https://nexus-consulting-one.vercel.app",
  },
  {
    id: "05",
    title: "ART SCROLL",
    category: "Creative",
    img: "https://i.ibb.co/pv57vTxK/Captura-de-tela-2026-02-24-222253.png",
    color: "#f59e0b",
    url: "https://art-scroll.vercel.app",
  },
  {
    id: "06",
    title: "LYNE EXPERIENCE",
    category: "Experience",
    img: "https://i.ibb.co/HLRCFjgm/Captura-de-tela-2026-02-24-222306.png",
    color: "#ec4899",
    url: "https://lyne-experience.vercel.app",
  },
  {
    id: "07",
    title: "GENGAR OS",
    category: "Performance",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000",
    color: "#a855f7",
    url: "https://github.com/Xwiuu/gengar-os",
  },
  {
    id: "08",
    title: "PERFSCAN",
    category: "Web Perf",
    img: "https://i.ibb.co/bVFQpXn/Gemini-Generated-Image-hze64lhze64lhze6.png",
    color: "#ffffff",
    url: "https://github.com/Xwiuu/perfscan",
  },
  {
    id: "09",
    title: "ORDER FLOW",
    category: "Application",
    img: "https://i.ibb.co/v9DvQ2n/Gemini-Generated-Image-exj20aexj20aexj2.png",
    color: "#10b981",
    url: "https://github.com/Xwiuu/OrderFlow",
  },
  {
    id: "10",
    title: "SECUREBOX LAB",
    category: "Cybersecurity",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000",
    color: "#ef4444",
    url: "https://github.com/Xwiuu/securebox_lab",
  },
  {
    id: "11",
    title: "GHOST MIRROR",
    category: "Future Cyber",
    img: "https://images.unsplash.com/photo-1614064641935-4475e8329227?q=80&w=2000",
    color: "#6b7280",
    url: "#",
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

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth}`, // Distância vertical baseada no conteúdo real
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to(symbiontRef.current, {
        rotation: 360 * 3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
        },
      });

      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        const img = card.querySelector("img");
        const line = card.querySelector(".connect-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left center",
                end: "right center",
                scrub: true,
              },
            },
          );
        }
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

      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="h-screen w-full bg-black relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      ></div>

      {/* Header Responsivo */}
      <div className="absolute top-6 md:top-10 left-6 md:left-20 z-20 mix-blend-difference pointer-events-none">
        <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase block mb-1 md:mb-2">
          {"{ 04. Neural Network }"}
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          CASE STUDIES
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full w-max px-10 md:px-20 will-change-transform"
      >
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 w-full pointer-events-none"></div>

        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div
            ref={symbiontRef}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 bg-emerald-500/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] relative"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_#10b981]"></div>
          </div>
        </div>

        {projects.map((project, index) => {
          const isTop = index % 2 === 0;
          return (
            <div
              key={project.id}
              className="project-card relative w-[100vw] md:w-150 shrink-0 flex flex-col justify-center items-center h-full mx-4 md:mx-20"
            >
              <div
                // Ajuste crítico: redução da margem alternada no mobile para caber no ecrã
                className={`relative w-[85vw] md:w-125 flex flex-col ${isTop ? "mb-16 md:mb-40" : "mt-16 md:mt-40"}`}
              >
                <div
                  // Ajuste crítico: tamanho da linha adaptada para mobile
                  className={`connect-line absolute left-1/2 w-px z-0 ${isTop ? "-bottom-10 md:-bottom-20 h-20 md:h-40 origin-top" : "-top-10 md:-top-20 h-20 md:h-40 origin-bottom"}`}
                  style={{
                    background: `linear-gradient(to ${isTop ? "bottom" : "top"}, ${project.color}, transparent)`,
                  }}
                ></div>

                <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 overflow-hidden hover:border-white/30 transition-colors duration-500 shadow-2xl">
                  {/* Ajuste crítico: Altura do card menor no mobile (h-64) e fixa no desktop (h-[400px]) */}
                  <div className="relative h-64 md:h-[400px] w-full rounded-xl overflow-hidden bg-gray-900">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      // Ajuste crítico: Sempre visível no mobile, requer hover apenas no md:
                      className="absolute bottom-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-mono uppercase hover:bg-emerald-500 hover:text-white"
                    >
                      View Project
                    </a>
                    <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex justify-between items-end">
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <span>ID: {project.id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        <span>SECURE</span>
                      </div>
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