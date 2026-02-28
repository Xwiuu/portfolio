'use client';

import { useEffect } from 'react'; // <--- IMPORTAMOS O USEEFFECT
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Symbiont from '../components/Symbiont';
import Cursor from '../components/ui/Cursor'; // <--- IMPORTA O CURSOR

// Secções
import Hero from '../components/sections/Hero';
import Manifesto from '../components/sections/Manifesto';
import Services from '../components/sections/Services';
import Lab from '../components/sections/Lab';
import Portfolio from '../components/sections/Portfolio';
import Footer from '../components/sections/Footer';

export default function Home() {

  // --- EFEITO DO TÍTULO DA ABA INTERATIVO ---
  useEffect(() => {
    // Podes alterar estes textos para o que achares mais fixe!
    const originalTitle = "William Reis | The Alchemist"; 
    const awayTitle = "⚠️ Signal Lost...";

    // Garante que o título inicial está correto quando a página carrega
    document.title = originalTitle;

    // Função que verifica se a aba está visível ou escondida
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle; // Mudou de aba
      } else {
        document.title = originalTitle; // Voltou para a aba
      }
    };

    // Adiciona o "espião" (listener) ao browser
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Função de limpeza (boa prática em React para não causar bugs de memória)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#050505]">
      
      {/* UX: Cursor Personalizado */}
      <Cursor /> 

      {/* --- CAMADA 3D --- */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]} 
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <Symbiont />
          </Suspense>
        </Canvas>
      </div>

      {/* --- CAMADA DE CONTEÚDO --- */}
      <div className="relative z-10 w-full">
        <Hero /> {/* O Novo Hero v2 */}
        <Manifesto />
        <Services />
        <Lab />
        <Portfolio />
        <Footer />
      </div>
    </main>
  );
}