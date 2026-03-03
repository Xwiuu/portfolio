"use client";

import { useState, useEffect, Suspense } from "react"; // <--- Adiciona useState
import { Canvas } from "@react-three/fiber";
import Symbiont from "../components/Symbiont";
import WhatsAppButton from "../components/ui/WhatsAppButton"; // <--- IMPORTA O BOTÃO
import Cursor from "../components/ui/Cursor";
import LoadingScreen from "../components/ui/LoadingScreen";
import Navbar from "../components/ui/Navbar"; // <--- IMPORTA A NAVBAR // <--- Importa o Loading

// Secções
import Hero from "../components/sections/Hero";
import Manifesto from "../components/sections/Manifesto";
import Services from "../components/sections/Services";
import Lab from "../components/sections/Lab";
import Portfolio from "../components/sections/Portfolio";
import Footer from "../components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Efeito do Título da Aba (que já tínhamos)
  useEffect(() => {
    const originalTitle = "William Reis | The Alchemist";
    const awayTitle = "⚠️ Signal Lost...";
    document.title = originalTitle;
    const handleVisibilityChange = () => {
      document.title = document.hidden ? awayTitle : originalTitle;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <main className="relative w-full bg-[#050505]">
      {/* 1. Loading Screen */}
      <LoadingScreen onFinished={() => setIsLoading(false)} />

      {/* 2. Conteúdo só aparece após o loading (ou fica escondido para otimizar) */}
      {!isLoading && (
        <>
          <Navbar />{" "}
          {/* <--- ADICIONA A NAVBAR AQUI, PARA FICAR POR CIMA DE TUDO */}
          <Cursor />
          <WhatsAppButton />{" "}
          {/* <--- ADICIONA O BOTÃO AQUI, PARA FICAR POR CIMA DE TUDO */}
          {/* --- CAMADA 3D --- */}
          <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={1} />
                <pointLight
                  position={[10, 10, 10]}
                  intensity={2}
                  color="#ffffff"
                />
                <Symbiont />
              </Suspense>
            </Canvas>
          </div>
          {/* --- CAMADA DE CONTEÚDO --- */}
          <div className="relative z-10 w-full">
            <Hero />
            <Manifesto />
            <Services />
            <Lab />
            <Portfolio />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
