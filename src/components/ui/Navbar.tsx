'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HackerText from './HackerText';

const navLinks = [
  { name: "HOME", href: "#" },
  { name: "MANIFESTO", href: "#manifesto" },
  { name: "SERVICES", href: "#services" },
  { name: "LAB", href: "#lab" },
  { name: "PORTFOLIO", href: "#portfolio" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Estado para saber qual link está a receber hover neste exato momento
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-8 right-8 z-[110]"> 
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full hover:border-emerald-500 transition-all duration-300"
        >
          <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">
            {isOpen ? 'Close_System' : 'Menu_Access'}
          </span>
          <div className="flex flex-col gap-1 w-4">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-full h-px bg-emerald-500 block"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-px bg-emerald-500 block"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-full h-px bg-emerald-500 block"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505] flex items-center justify-center"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

            <div className="relative flex flex-col items-center gap-6 md:gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  // Registamos o hover através do React
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="group relative flex items-center gap-4 md:gap-6 cursor-pointer"
                >
                  <span className="text-emerald-500 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                  
                  <div className="text-5xl md:text-8xl font-black text-white/20 group-hover:text-white transition-all duration-300 tracking-tighter uppercase min-w-[200px] text-center">
                    {/* Renderização Condicional Limpa */}
                    {hoveredLink === link.name ? (
                      <HackerText text={link.name} speed={30} />
                    ) : (
                      link.name
                    )}
                  </div>
                </motion.a>
              ))}
              
              <div className="mt-10 md:mt-20 border-t border-white/10 pt-10 w-full text-center px-6">
                 <HackerText 
                    text="TERMINAL_READY_FOR_INPUT" 
                    className="text-gray-600 font-mono text-[10px] tracking-widest"
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}