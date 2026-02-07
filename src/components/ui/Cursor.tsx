'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Esconde o cursor padrão do sistema
    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move o cursor com suavidade (Lerp)
    const onMouseMove = (e: MouseEvent) => {
      // O GSAP trata da interpolação suave automaticamente com duration
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Atraso pequeno para suavidade
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto'; // Restaura se o componente desmontar
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 bg-white/5 backdrop-blur-sm pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  );
}