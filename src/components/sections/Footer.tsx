'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");

  // 1. Relógio em Tempo Real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Animações GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // SCANNER LINE
      if (scanLineRef.current) {
        gsap.to(scanLineRef.current, {
          top: "100%",
          duration: 4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // INFINITE TICKER
      if (tickerRef.current) {
        const content = tickerRef.current.innerHTML;
        tickerRef.current.innerHTML = content + content + content;

        gsap.to(tickerRef.current, {
          xPercent: -33.33,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // 3. Efeito Magnético (Apenas Desktop)
  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768) return; 
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, { x: x * 0.5, y: y * 0.5, duration: 0.3, ease: "power2.out" });
    gsap.to(btn.children, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768) return; 
    const btn = e.currentTarget;
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    gsap.to(btn.children, { x: 0, y: 0, duration: 0.5 });
  };

  // 4. Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-black pt-16 md:pt-32 pb-0 overflow-hidden border-t border-white/10"
    >
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* SCANNER LINE */}
      <div 
        ref={scanLineRef}
        className="absolute left-0 w-full h-px bg-emerald-500/50 shadow-[0_0_20px_#10b981] z-0 pointer-events-none top-0"
      ></div>

      <div className="px-6 md:px-20 relative z-10 w-full">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20">
            <div className="w-full md:w-auto">
                <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase block mb-3 md:mb-4">
                    {'{ 05. Signal Lost }'}
                </span>
                {/* Título com tipografia fluida (vw) para caber sempre no mobile */}
                <h2 className="text-[14vw] md:text-9xl font-black text-white leading-none tracking-tighter mix-blend-difference whitespace-nowrap">
                    LET&apos;S TALK
                </h2>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end w-full md:w-auto">
                <p className="text-base sm:text-xl md:text-2xl text-white font-bold max-w-md text-left md:text-right leading-relaxed">
                    Start a project? <br/>
                    <span className="text-gray-500 font-normal text-xs md:text-base">
                        Available for freelance projects and high-end technical partnerships.
                    </span>
                </p>
            </div>
        </div>

        {/* SOCIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-32">
            {[
                { name: "WHATSAPP", url: "https://wa.me/54984475368" },
                { name: "GITHUB", url: "https://github.com/Xwiuu" },
                { name: "INSTAGRAM", url: "https://www.instagram.com/_wiiuu__/" }
            ].map((social) => (
                <a 
                    key={social.name}
                    href={social.url}
                    onMouseMove={handleMagnetic}
                    onMouseLeave={resetMagnetic}
                    // Altura fixada para mobile (70px) para não parecer um tijolo gigante
                    className="group relative h-[70px] md:h-32 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden hover:bg-white/5 transition-colors md:cursor-none"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-sm md:text-lg font-bold text-white md:group-hover:text-emerald-500 transition-colors z-10">
                            {social.name}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-mono text-gray-600 uppercase mt-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            Connect &nearr;
                        </span>
                    </div>
                </a>
            ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 md:py-8 border-t border-white/10 gap-4 sm:gap-0 w-full">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span suppressHydrationWarning className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest text-center sm:text-left">
                    System Online • {time}
                </span>
            </div>

            <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-[9px] md:text-[10px] font-mono text-white hover:text-emerald-500 transition-colors uppercase tracking-widest"
            >
                Return to Surface
                <span className="transform md:group-hover:-translate-y-1 transition-transform duration-300">&uarr;</span>
            </button>
        </div>

      </div>

      {/* INFINITE TICKER */}
      <div className="w-full bg-emerald-500/10 border-t border-emerald-500/20 py-2 overflow-hidden">
        <div ref={tickerRef} className="whitespace-nowrap flex gap-10 w-max">
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em]">
                {'/// END OF TRANSMISSION /// STANDBY FOR REBOOT /// INITIALIZING NEXT PROTOCOL /// WILLIAM REIS DEV ///'}
            </span>
        </div>
      </div>

    </footer>
  );
}