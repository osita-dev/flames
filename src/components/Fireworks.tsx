import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Spark {
  id: number;
  angle: number;
  distance: number;
  color: string;
  delay: number;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  sparks: Spark[];
}

interface FireworksProps {
  isActive: boolean;
}

const COLORS = [
  "hsl(350, 80%, 60%)",
  "hsl(40, 90%, 65%)",
  "hsl(280, 60%, 80%)",
  "hsl(160, 50%, 75%)",
];

export const Fireworks = ({ isActive }: FireworksProps) => {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);

  useEffect(() => {
    if (isActive) {
      const createBurst = (id: number, delay: number) => {
        setTimeout(() => {
          const sparks: Spark[] = [];
          const sparkCount = 12;
          for (let i = 0; i < sparkCount; i++) {
            sparks.push({
              id: i,
              angle: (360 / sparkCount) * i,
              distance: 60 + Math.random() * 40,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              delay: Math.random() * 0.1,
            });
          }
          setBursts(prev => [...prev, {
            id,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 40,
            sparks,
          }]);
        }, delay);
      };

      createBurst(1, 0);
      createBurst(2, 400);
      createBurst(3, 800);

      const timer = setTimeout(() => setBursts([]), 2500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive && bursts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          {burst.sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0.5],
                x: Math.cos((spark.angle * Math.PI) / 180) * spark.distance,
                y: Math.sin((spark.angle * Math.PI) / 180) * spark.distance,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: spark.delay,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: spark.color }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute w-4 h-4 rounded-full bg-primary/50 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ))}
    </div>
  );
};
