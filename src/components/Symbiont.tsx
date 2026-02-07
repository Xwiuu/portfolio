'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Symbiont() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  
  // Referência para controlar o nível de CAOS (0 = calmo, 1 = terremoto)
  const chaosRef = useRef({ value: 0 }); 

  useLayoutEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // PALETA SURREAL
    const colors = {
      idle: new THREE.Color("#ffffff"),
      loading: new THREE.Color("#00ff88"), // Verde Matrix
      danger: new THREE.Color("#ff3300"),  // Laranja Explosão
      void: new THREE.Color("#000000")
    };

    // 1. HERO -> MANIFESTO (Ativação)
    tl.to(meshRef.current.position, {
      x: 2, y: -1, z: 2, duration: 2
    }, "manifesto")
    .to(materialRef.current, {
      distort: 0.5, opacity: 0.5
    }, "manifesto")
    .to(materialRef.current.color, {
      r: colors.loading.r, g: colors.loading.g, b: colors.loading.b, duration: 2
    }, "manifesto") // <--- Cor separada!
    .to(chaosRef.current, { value: 0.1, duration: 2 }, "manifesto");


    // 2. MANIFESTO -> SERVICES (Velocidade)
    tl.to(meshRef.current.position, {
      x: -2, y: 0, z: 0, duration: 2
    }, "services")
    .to(materialRef.current, {
      distort: 0.8, scale: 2, opacity: 0.3
    }, "services")
    .to(materialRef.current.color, {
      r: colors.idle.r, g: colors.idle.g, b: colors.idle.b, duration: 2
    }, "services");


    // 3. THE LAB (A EXPLOSÃO) ⚠️
    tl.to(meshRef.current.position, {
      x: 0, y: 0, z: 2.5, duration: 1 // Traz MUITO perto (imersivo)
    }, "lab")
    .to(materialRef.current, {
      distort: 3.0,      // Deformação Extrema
      speed: 20,         // Velocidade Máxima
      opacity: 0.9,
      wireframe: true,   // Vê a estrutura a rasgar
    }, "lab")
    .to(materialRef.current.color, {
      r: colors.danger.r, g: colors.danger.g, b: colors.danger.b, duration: 0.5
    }, "lab")
    .to(chaosRef.current, { value: 1.0, duration: 1 }, "lab"); // Ativa o terremoto


    // 4. PORTFOLIO (O Colapso)
    tl.to(meshRef.current.position, {
      x: 0, y: -1, z: 0, duration: 2
    }, "portfolio")
    .to(materialRef.current, {
      distort: 0, scale: 1.5, opacity: 0.1, speed: 1
    }, "portfolio")
    .to(materialRef.current.color, {
      r: colors.idle.r, g: colors.idle.g, b: colors.idle.b, duration: 2
    }, "portfolio")
    .to(chaosRef.current, { value: 0, duration: 2 }, "portfolio");

  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const chaos = chaosRef.current.value; // 0 a 1

    // Rotação normal
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;

    // LÓGICA DO CAOS (Só ativa se chaos > 0)
    if (chaos > 0) {
      // 1. Vibração na rotação
      meshRef.current.rotation.z += (Math.random() - 0.5) * chaos * 0.5;
      
      // 2. Glitch na Posição (Treme o objeto no espaço)
      meshRef.current.position.x += (Math.random() - 0.5) * chaos * 0.05;
      meshRef.current.position.y += (Math.random() - 0.5) * chaos * 0.05;

      // 3. Glitch na Escala (Explode e contrai aleatoriamente)
      // A escala base é controlada pelo GSAP (aprox 2), nós somamos o ruído
      const baseScale = meshRef.current.scale.x; // Pega a escala atual do GSAP
      const noise = (Math.random() - 0.5) * chaos * 0.5;
      
      // Aplica o glitch visual sem estragar a animação do scroll
      // Nota: setScalar afeta x, y e z ao mesmo tempo
      // Para não "brigar" com o GSAP, fazemos um efeito visual momentâneo
      // Mas como o GSAP reescreve a escala a cada frame no scroll, 
      // precisamos de uma abordagem aditiva ou aceitar que o GSAP vence.
      // TRUQUE: Alteramos apenas visualmente para este frame
      meshRef.current.scale.setScalar(baseScale + noise); 
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#ffffff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.8}
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </Sphere>
  );
}