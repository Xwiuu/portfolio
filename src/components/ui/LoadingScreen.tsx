'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HackerText from './HackerText';

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de assets
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onFinished, 500); // Avisa o Page.tsx que acabou
      }, 800);
    }
  }, [progress, onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center px-6"
        >
          {/* Background Grid sutil no loading */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative w-full max-w-md">
            {/* Título com HackerText */}
            <div className="mb-8 text-center">
              <HackerText 
                text="INITIALIZING_PROTOCOL" 
                className="text-emerald-500 font-mono text-xs tracking-[0.3em]" 
                speed={40} 
              />
            </div>

            {/* Barra de Progresso */}
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Contador e Status */}
            <div className="mt-4 flex justify-between font-mono text-[10px] text-gray-500 tracking-widest uppercase">
              <span>System_Boot: {progress}%</span>
              <span>v2.4.0_Stable</span>
            </div>
          </div>

          {/* Rodapé do Loading */}
          <div className="absolute bottom-10 text-[9px] font-mono text-gray-700 tracking-[0.2em] uppercase">
            © 2026 William Reis — Neural Network Interface
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}