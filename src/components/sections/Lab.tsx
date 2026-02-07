'use client';

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, OrbitControls, Environment } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three'; // Animação suave 3D
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

// --- COMPONENTE 3D INTERATIVO (O Bicho na Jaula) ---
function Specimen({ config }: { config: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  
  // Física de "Puxar" com o mouse (Spring Physics)
  const [{ position, scale }, api] = useSpring(() => ({
    position: [0, 0, 0],
    scale: 1,
    config: { mass: 1, tension: 350, friction: 40 }
  }));

  const bind = useDrag(({ active, movement: [x, y], timeStamp, cancel }) => {
    if (active) {
      // Puxa o objeto (limitado para não sair da tela)
      api.start({ 
        position: [x / 100, -y / 100, 0], 
        scale: 1.2 
      });
      setActive(true);
    } else {
      // Solta e volta para o centro (Bounce back)
      api.start({ position: [0, 0, 0], scale: 1 });
      setActive(false);
    }
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotação constante baseada na velocidade configurada
    meshRef.current.rotation.x += 0.005 * config.speed;
    meshRef.current.rotation.y += 0.01 * config.speed;
  });

  // Cor reativa (Muda se estiver a ser arrastado)
  const currentColor = active ? "#ff0055" : config.color;

  return (
    // @ts-ignore
    <a.mesh {...bind()} ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={currentColor}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.5} // Mais metal para parecer mercúrio
        roughness={0.1}
        distort={active ? 1.0 : config.distortion} // Se arrastar, distorce muito
        speed={active ? 10 : config.speed}
        wireframe={config.wireframe}
      />
    </a.mesh>
  );
}

// --- O COMPONENTE PRINCIPAL DA SECÇÃO ---
export default function Lab() {
  // Estado do Painel de Controlo
  const [config, setConfig] = useState({
    distortion: 0.4,
    speed: 2,
    color: "#ffffff",
    wireframe: false
  });

  // Handlers dos Sliders
  const handleDistortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, distortion: parseFloat(e.target.value) });
  };
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, speed: parseFloat(e.target.value) });
  };
  const toggleWireframe = () => {
    setConfig({ ...config, wireframe: !config.wireframe });
  };
  const changeColor = (newColor: string) => {
    setConfig({ ...config, color: newColor });
  };

  return (
    <section id="lab" className="min-h-screen w-full flex flex-col md:flex-row bg-black relative z-20 overflow-hidden">
      
      {/* --- COLUNA ESQUERDA: O PAINEL DE CONTROLO (HUD) --- */}
      <div className="w-full md:w-1/3 p-10 md:p-20 flex flex-col justify-center relative z-20 bg-black/80 backdrop-blur-md border-r border-white/10">
        
        <div className="mb-12">
          <span className="text-[10px] font-mono text-purple-500 tracking-widest uppercase block mb-4">
            // 03. Simulation
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2">
            THE LAB
          </h2>
          <p className="text-gray-500 text-sm font-mono">
            Controlo de parâmetros em tempo real.<br/>
            Manipule o núcleo do sistema.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col gap-10">
          
          {/* Slider 1: ENTROPY (Distorção) */}
          <div className="group">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-2 text-gray-400 group-hover:text-white transition-colors">
              <span>Entropy (Distortion)</span>
              <span>{config.distortion.toFixed(1)}</span>
            </div>
            <input 
              type="range" min="0" max="3" step="0.1" 
              value={config.distortion} onChange={handleDistortChange}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
            />
          </div>

          {/* Slider 2: VELOCITY (Velocidade) */}
          <div className="group">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-2 text-gray-400 group-hover:text-white transition-colors">
              <span>Velocity</span>
              <span>{config.speed.toFixed(1)}x</span>
            </div>
            <input 
              type="range" min="0" max="10" step="0.5" 
              value={config.speed} onChange={handleSpeedChange}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
            />
          </div>

          {/* Color Picker (Botões) */}
          <div>
             <div className="text-[10px] font-mono uppercase tracking-widest mb-4 text-gray-400">
              Core Fusion
            </div>
            <div className="flex gap-4">
              {['#ffffff', '#10b981', '#ef4444', '#a855f7', '#3b82f6'].map((c) => (
                <button
                  key={c}
                  onClick={() => changeColor(c)}
                  className={`w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform duration-300 relative`}
                  style={{ background: c }}
                >
                  {config.color === c && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-50"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Wireframe */}
          <button 
            onClick={toggleWireframe}
            className={`mt-4 border border-white/20 py-3 px-6 rounded text-xs font-mono uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black
              ${config.wireframe ? 'bg-white text-black' : 'text-white'}
            `}
          >
            {config.wireframe ? 'Disable X-Ray' : 'Enable X-Ray'}
          </button>

        </div>
      </div>

      {/* --- COLUNA DIREITA: A JAULA 3D --- */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-screen relative cursor-grab active:cursor-grabbing bg-grid-pattern">
        
        {/* Aviso de Simulação */}
        <div className="absolute top-10 right-10 z-10 text-right pointer-events-none">
          <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest animate-pulse">
            ● Live Simulation
          </div>
          <div className="text-4xl font-bold text-white/5">TEST_01</div>
        </div>

        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} intensity={0.5} color="purple" />
          
          {/* O Nosso Amigo Interativo */}
          <Specimen config={config} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            // Limita a rotação para focar na interação de arrasto
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
          <Environment preset="city" />
        </Canvas>

        {/* Instrução de UX */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] pointer-events-none">
          Drag to Mutate
        </div>

      </div>

    </section>
  );
}