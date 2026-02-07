'use client';

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