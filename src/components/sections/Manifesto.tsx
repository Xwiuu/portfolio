'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from '../ui/HackerText'; // Reutilizamos o teu componente favorito

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. A Linha de Conexão (Fio condutor da narrativa)
      // Cresce verticalmente conforme o scroll
      gsap.fromTo(lineRef.current,
        { height: 0 },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );

      // 2. Parallax nos Textos (Sensação de flutuar no vácuo)
      // Movemos os blocos de texto a velocidades diferentes
      gsap.to(".manifesto-block-left", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(".manifesto-block-right", {
        y: 50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="manifesto" 
      ref={containerRef}
      className="min-h-[150vh] w-full relative z-10 px-6 md:px-20 py-40 overflow-hidden"
    >
      
      {/* LINHA CENTRAL (A "Coluna Vertebral" do site) */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
        <div ref={lineRef} className="w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
      </div>

      {/* --- BLOCO 1: A DEFINIÇÃO (Esquerda) --- */}
      <div className="manifesto-block-left relative md:w-1/2 md:pr-20 mb-32 md:mb-0 md:text-right">
        <span className="text-[10px] font-mono text-emerald-500 tracking-widest block mb-4">
          // 01. GENESIS
        </span>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          O código não é uma ferramenta.<br/>
          É uma <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">extensão da consciência.</span>
        </h2>
        <p className="mt-8 text-gray-400 text-sm md:text-base leading-relaxed max-w-md ml-auto">
          A maioria constrói paredes estáticas. Eu cultivo ecossistemas que respiram dados, aprendem com o uso e reagem à presença humana.
        </p>
      </div>

      {/* --- BLOCO 2: O CAOS (Direita - Mais abaixo) --- */}
      <div className="manifesto-block-right relative md:w-1/2 md:ml-auto md:pl-20 mt-20 md:mt-40">
        <span className="text-[10px] font-mono text-red-500 tracking-widest block mb-4">
          // 02. ENTROPY
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter mix-blend-difference">
          CHAOS IS<br/>
          <HackerText text="ARCHITECTED" className="text-red-500" speed={50} />
        </h2>
        <p className="mt-8 text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
          Segurança não é uma barreira, é o sistema imunitário do projeto. Eu injeto resiliência em cada pixel, criando beleza que sobrevive ao ataque.
        </p>
        
        {/* Decorative Code Snippet */}
        <div className="mt-8 p-4 bg-black/40 border border-white/5 font-mono text-[10px] text-gray-500 rounded backdrop-blur-sm">
          <span className="text-purple-400">function</span> <span className="text-blue-400">transcend</span>() {'{'} <br/>
          &nbsp;&nbsp;<span className="text-white">reality.break();</span> <br/>
          &nbsp;&nbsp;<span className="text-emerald-500">return new_future;</span> <br/>
          {'}'}
        </div>
      </div>

      {/* --- BLOCO 3: A CONCLUSÃO (Centro - Fim) --- */}
      <div className="relative w-full text-center mt-40 md:mt-60">
        <h3 className="text-xl md:text-3xl font-light text-white mb-6">
          Não procures um programador.
        </h3>
        <div className="inline-block relative group cursor-none">
          <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-white opacity-20 group-hover:opacity-100 transition-opacity duration-700 select-none">
            THE ALCHEMIST
          </h2>
          
          {/* Texto sobreposto com efeito glitch no hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay">
             <HackerText text="WILLIAM REIS" className="text-5xl md:text-8xl font-black text-white" speed={30} />
          </div>
        </div>
      </div>

    </section>
  );
}