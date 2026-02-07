'use client';

import { useState, useEffect, useRef } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function HackerText({ text, className = "", speed = 30 }: HackerTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  const animate = () => {
    let iteration = 0;

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3; // Velocidade da resolução
    }, speed);
  };

  // Anima ao montar o componente
  useEffect(() => {
    animate();
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span 
      className={`cursor-pointer ${className}`} 
      onMouseEnter={animate} // Re-anima quando o mouse passa
    >
      {displayedText}
    </span>
  );
}