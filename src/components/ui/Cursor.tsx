'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: clientX, y: clientY, duration: 0.5, ease: "power3.out" });
    };

    const onMouseDown = () => gsap.to([cursor, follower], { scale: 0.7, duration: 0.3 });
    const onMouseUp = () => gsap.to([cursor, follower], { scale: 1, duration: 0.3 });

    // Funções de Hover
    const onMouseEnterLink = () => gsap.to(follower, { scale: 2.5, backgroundColor: "rgba(16, 185, 129, 0.2)", duration: 0.3 });
    const onMouseLeaveLink = () => gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });

    // Correção Mágica: Delegação de eventos
    // Verifica se onde o rato passou é um link ou está dentro de um link
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .cursor-pointer')) {
        onMouseEnterLink();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .cursor-pointer')) {
        onMouseLeaveLink();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-emerald-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors duration-300"
      />
    </>
  );
}