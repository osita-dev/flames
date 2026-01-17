import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface SparkleEffectProps {
  isActive: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}

export const SparkleEffect = ({ isActive }: SparkleEffectProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 8 + Math.random() * 12,
          delay: Math.random() * 0.5,
        });
      }
      setSparkles(newSparkles);

      const timer = setTimeout(() => setSparkles([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive && sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 0.8, 
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ 
            left: `${sparkle.x}%`, 
            top: `${sparkle.y}%`,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="hsl(40, 90%, 65%)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
